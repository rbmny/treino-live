import type { LiveSession, Workout } from "@/types";

export const TRAINER = {
  name: "Ricky Bomeny",
  handle: "@rbmny",
  bio: "Personal trainer · Treinos ao vivo e sob demanda",
};

export const freeLive: LiveSession = {
  id: "live-free-1",
  title: "Treino Full Body ao Vivo",
  description:
    "Sessão gratuita aberta a todos. Aquecimento, força e finalização. Sem login, sem cartão.",
  trainer: TRAINER.name,
  startsAt: "Agora",
  isFree: true,
  viewerCount: 1284,
  status: "ao-vivo",
  gradient: "from-rose-500 via-orange-400 to-amber-300",
};

export const premiumLive: LiveSession = {
  id: "live-premium-1",
  title: "Premium Live: Hipertrofia Avançada",
  description:
    "Sessão exclusiva para assinantes. Técnica detalhada, tempo sob tensão e Q&A ao vivo.",
  trainer: TRAINER.name,
  startsAt: "Hoje · 19:30",
  isFree: false,
  viewerCount: 312,
  status: "ao-vivo",
  gradient: "from-violet-600 via-fuchsia-500 to-pink-400",
};

export const workouts: Workout[] = [
  {
    id: "vod-1",
    title: "Força Total — Upper",
    description:
      "Empurrar e puxar com foco em peito, costas e ombros. Ideal para 3x por semana.",
    durationMin: 42,
    level: "Intermediário",
    category: "Força",
    priceBRL: 29.9,
    trainer: TRAINER.name,
    gradient: "from-sky-500 to-indigo-600",
    accent: "#0ea5e9",
    icon: "dumbbell",
  },
  {
    id: "vod-2",
    title: "HIIT Queima 20'",
    description:
      "Intervalos de alta intensidade em 20 minutos. Eleva o metabolismo e condiciona.",
    durationMin: 20,
    level: "Avançado",
    category: "HIIT",
    priceBRL: 19.9,
    trainer: TRAINER.name,
    gradient: "from-orange-500 to-red-600",
    accent: "#f97316",
    icon: "flame",
  },
  {
    id: "vod-3",
    title: "Yoga Flow Matinal",
    description:
      "Sequência suave para despertar o corpo. Respiração, equilíbrio e alongamento.",
    durationMin: 30,
    level: "Iniciante",
    category: "Yoga",
    priceBRL: 24.9,
    trainer: TRAINER.name,
    gradient: "from-emerald-400 to-teal-600",
    accent: "#10b981",
    icon: "lotus",
  },
  {
    id: "vod-4",
    title: "Mobilidade de Ombros",
    description:
      "Rotinas para saúde articular. Perfeito pré-treino ou dia de recuperação.",
    durationMin: 18,
    level: "Iniciante",
    category: "Mobilidade",
    priceBRL: 14.9,
    trainer: TRAINER.name,
    gradient: "from-cyan-400 to-blue-600",
    accent: "#22d3ee",
    icon: "stretch",
  },
  {
    id: "vod-5",
    title: "Cardio Steady State",
    description:
      "Corrida / bike em zona 2. Construção de base aeróbica sem impacto excessivo.",
    durationMin: 35,
    level: "Intermediário",
    category: "Cardio",
    priceBRL: 22.9,
    trainer: TRAINER.name,
    gradient: "from-lime-400 to-green-600",
    accent: "#84cc16",
    icon: "run",
  },
  {
    id: "vod-6",
    title: "Core & Estabilidade",
    description:
      "Anti-rotação, prancha e controle. Base sólida para qualquer modalidade.",
    durationMin: 25,
    level: "Intermediário",
    category: "Core",
    priceBRL: 18.9,
    trainer: TRAINER.name,
    gradient: "from-fuchsia-500 to-purple-700",
    accent: "#d946ef",
    icon: "abs",
  },
];

export const PREMIUM_PRICE_BRL = 49.9;
export const PREMIUM_PERIOD = "mês";

export function getWorkout(id: string): Workout | undefined {
  return workouts.find((w) => w.id === id);
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
