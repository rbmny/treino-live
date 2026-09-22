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
  startsAt: string;
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

export type BodyPartId =
  | "peito"
  | "costas"
  | "biceps"
  | "triceps"
  | "ombros"
  | "gluteo"
  | "pernas"
  | "full"
  | "core";

export type ProtocolLevel = "inter" | "avancado";
export type RunProgramId = "5k" | "10k";
export type AdaptId = "lipedema" | "gravida" | "joelho" | "coluna";

export interface DemoStore {
  user: User | null;
  ownedWorkoutIds: string[];
  ownedShopIds: string[];
  premiumSubscribed: boolean;
  premiumRenewsAt: string | null;
  /** 0–100 */
  protocolProgress: Record<ProtocolLevel, number>;
  protocolStarted: Record<ProtocolLevel, boolean>;
  /** day keys like "5k:w1:d1" */
  corridaDone: string[];
  corridaActive: RunProgramId | null;
  ebookChaptersRead: string[];
  streak: number;
  lastWorkoutAt: string | null;
  adaptationsSaved: AdaptId[];
}

export interface ChatMessage {
  user: string;
  text: string;
}
