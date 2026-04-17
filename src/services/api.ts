import type { Project, User, LeaderboardEntry, Note } from '../types';

// Mock Data (matches db.json)
let projects: Project[] = [
  { id: 1, title: "React Dashboard", description: "Build UI dashboard" },
  { id: 2, title: "API Integration", description: "Connect backend APIs" },
  { id: 3, title: "State Management", description: "Implement Zustand for global state" },
  { id: 4, title: "UI Animations", description: "Add Framer Motion effects" },
];

let user: User = {
  id: 1,
  name: "Salman",
  avatar: "https://i.pravatar.cc/150?img=11",
  xp: 70
};

let leaderboard: LeaderboardEntry[] = [
  { id: 1, name: "Ali", score: 1200, rank: 1 },
  { id: 2, name: "Ahmed", score: 900, rank: 2 },
  { id: 3, name: "Sara", score: 700, rank: 3 },
  { id: 4, name: "Zainab", score: 650, rank: 4 },
  { id: 5, name: "Omar", score: 500, rank: 5 }
];

let notes: Note[] = [];

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getProjects: async (): Promise<Project[]> => {
    await delay(600);
    return [...projects];
  },
  getUser: async (): Promise<User> => {
    await delay(400);
    return { ...user };
  },
  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    await delay(700);
    return [...leaderboard];
  },
  addNote: async (projectId: number, content: string): Promise<Note> => {
    await delay(500);
    const newNote: Note = {
      id: Date.now(),
      projectId,
      content,
      createdAt: new Date().toISOString()
    };
    notes.push(newNote);
    return newNote;
  },
  getNotesByProject: async (projectId: number): Promise<Note[]> => {
    await delay(300);
    return notes.filter(n => n.projectId === projectId);
  }
};