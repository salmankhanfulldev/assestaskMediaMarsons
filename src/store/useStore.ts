import { create } from 'zustand';
import type { Project, User, LeaderboardEntry, Note } from '../types';
import { api } from '../services/api';

interface DashboardState {
  // Data
  projects: Project[];
  user: User | null;
  leaderboard: LeaderboardEntry[];
  notes: Note[];
  
  // UI State
  activeMenu: string;
  selectedProjectId: number | null;
  isSidebarOpen: boolean;
  darkMode: boolean;
  
  // Async states
  isLoading: boolean;
  error: string | null;

  // Actions
  setActiveMenu: (menu: string) => void;
  selectProject: (projectId: number) => void;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  fetchInitialData: () => Promise<void>;
  addNote: (content: string) => Promise<void>;
  fetchNotesForProject: (projectId: number) => Promise<void>;
}

export const useStore = create<DashboardState>((set, get) => ({
  projects: [],
  user: null,
  leaderboard: [],
  notes: [],
  
  activeMenu: 'dashboard',
  selectedProjectId: null,
  isSidebarOpen: false,
  darkMode: typeof window !== 'undefined' && window.localStorage.getItem('logica-theme') === 'dark',
  
  isLoading: true,
  error: null,

  setActiveMenu: (menu) => set({ activeMenu: menu, isSidebarOpen: false }),
  
  selectProject: (projectId) => {
    set({ selectedProjectId: projectId, notes: [] });
  },

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  fetchInitialData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [projects, user, leaderboard] = await Promise.all([
        api.getProjects(),
        api.getUser(),
        api.getLeaderboard(),
      ]);
      set({ projects, user, leaderboard, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch data';
      set({ error: message, isLoading: false });
    }
  },

  fetchNotesForProject: async (projectId: number) => {
    const notes = await api.getNotesByProject(projectId);
    if (get().selectedProjectId === projectId) set({ notes });
  },

  addNote: async (content: string) => {
    const { selectedProjectId } = get();
    if (!selectedProjectId) return;
    
    const newNote = await api.addNote(selectedProjectId, content);
    if (get().selectedProjectId === selectedProjectId) {
      set((state) => ({ notes: [...state.notes, newNote] }));
    }
  }
}));