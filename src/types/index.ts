export interface Project {
  id: number;
  title: string;
  description: string;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  xp: number;
}

export interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  rank: number;
}

export interface Note {
  id: number;
  projectId: number;
  content: string;
  createdAt: string;
}