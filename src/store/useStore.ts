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
  
  // Async states
  isLoading: boolean;
  error: string | null;

  // Actions
  setActiveMenu: (menu: string) => void;
  selectProject: (projectId: number) => void;
  toggleSidebar: () => void;
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
  
  isLoading: false,
  error: null,

  setActiveMenu: (menu) => set({ activeMenu: menu, isSidebarOpen: false }),
  
  selectProject: (projectId) => {
    set({ selectedProjectId: projectId });
    get().fetchNotesForProject(projectId);
  },

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  fetchInitialData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [projects, user, leaderboard] = await Promise.all([
        api.getProjects(),
        api.getUser(),
        api.getLeaderboard(),
      ]);
      set({ projects, user, leaderboard, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch data', isLoading: false });
    }
  },

  fetchNotesForProject: async (projectId: number) => {
    try {
      const notes = await api.getNotesByProject(projectId);
      set({ notes });
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  },

  addNote: async (content: string) => {
    const { selectedProjectId, notes } = get();
    if (!selectedProjectId) return;
    
    try {
      const newNote = await api.addNote(selectedProjectId, content);
      set({ notes: [...notes, newNote] });
    } catch (err: any) {
      set({ error: err.message || 'Failed to add note' });
      throw err; // Re-throw to handle in component (e.g. for success message)
    }
  }
}));