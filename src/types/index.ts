export type WorkoutCategory =
  | "Força"
  | "HIIT"
  | "Yoga"
  | "Mobilidade"
  | "Cardio"
  | "Core";

export interface Workout {
  id: string;
  title: string;
  description: string;
  durationMin: number;
  level: "Iniciante" | "Intermediário" | "Avançado";
  category: WorkoutCategory;
  priceBRL: number;
  trainer: string;
  gradient: string;
  accent: string;
  icon: "dumbbell" | "flame" | "lotus" | "stretch" | "run" | "abs";
}

export interface LiveSession {
  id: string;
  title: string;
  description: string;
  trainer: string;
  startsAt: string; // ISO or relative label
  isFree: boolean;
  viewerCount: number;
  status: "ao-vivo" | "em-breve" | "encerrado";
  gradient: string;
}

export interface User {
  email: string;
  name: string;
  createdAt: string;
}

export interface DemoStore {
  user: User | null;
  ownedWorkoutIds: string[];
  premiumSubscribed: boolean;
  premiumRenewsAt: string | null;
}
