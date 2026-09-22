import type { AdaptId, BodyPartId } from "@/types";

export const BODY_ORDER: BodyPartId[] = [
  "peito",
  "costas",
  "biceps",
  "triceps",
  "ombros",
  "gluteo",
  "pernas",
  "full",
  "core",
];

export const BODY_META: Record<
  BodyPartId,
  { label: string; view: "front" | "back"; highlight: string; tone: string }
> = {
  peito: { label: "Peito", view: "front", highlight: "peito", tone: "a" },
  costas: { label: "Costas", view: "back", highlight: "costas", tone: "b" },
  biceps: { label: "Bíceps", view: "front", highlight: "biceps", tone: "c" },
  triceps: { label: "Tríceps", view: "back", highlight: "triceps", tone: "d" },
  ombros: { label: "Ombros", view: "front", highlight: "ombros", tone: "e" },
  gluteo: { label: "Glúteo", view: "back", highlight: "gluteo", tone: "f" },
  pernas: { label: "Pernas", view: "front", highlight: "pernas", tone: "g" },
  full: { label: "Full body", view: "front", highlight: "full", tone: "h" },
  core: { label: "Core", view: "front", highlight: "core", tone: "i" },
};

export const BODY_WORKOUTS: Record<
  BodyPartId,
  Array<{ t: string; m: string }>
> = {
  peito: [
    { t: "Supino e crucifixo", m: "28 min · Intermediário" },
    { t: "Peito com halteres", m: "22 min · Iniciante" },
    { t: "Upper push", m: "35 min · Avançado" },
    { t: "Peito express", m: "15 min · Todos" },
  ],
  costas: [
    { t: "Puxada e remada", m: "30 min · Intermediário" },
    { t: "Costas com bandas", m: "20 min · Iniciante" },
    { t: "Pull strength", m: "40 min · Avançado" },
    { t: "Posterior de ombro", m: "18 min · Todos" },
  ],
  biceps: [
    { t: "Rosca progressiva", m: "18 min · Intermediário" },
    { t: "Bíceps e antebraço", m: "22 min · Intermediário" },
    { t: "Arms pump", m: "25 min · Avançado" },
    { t: "Bíceps express", m: "12 min · Todos" },
  ],
  triceps: [
    { t: "Tríceps corda e banco", m: "20 min · Intermediário" },
    { t: "Extensão overhead", m: "16 min · Iniciante" },
    { t: "Push finishers", m: "24 min · Avançado" },
    { t: "Tríceps express", m: "12 min · Todos" },
  ],
  ombros: [
    { t: "Desenvolvimento e elevações", m: "26 min · Intermediário" },
    { t: "Ombros com bandas", m: "18 min · Iniciante" },
    { t: "Shoulder stability", m: "30 min · Avançado" },
    { t: "Ombros express", m: "14 min · Todos" },
  ],
  gluteo: [
    { t: "Ativação de glúteo", m: "18 min · Iniciante" },
    { t: "Hip thrust progressivo", m: "25 min · Intermediário" },
    { t: "Posterior + glúteo", m: "32 min · Avançado" },
    { t: "Glúteo express", m: "15 min · Todos" },
  ],
  pernas: [
    { t: "Agachamento e stiff", m: "35 min · Intermediário" },
    { t: "Pernas com bandas", m: "22 min · Iniciante" },
    { t: "Quad dominant", m: "40 min · Avançado" },
    { t: "Pernas express", m: "18 min · Todos" },
  ],
  full: [
    { t: "Full body A", m: "40 min · Intermediário" },
    { t: "Full body B", m: "35 min · Intermediário" },
    { t: "Full body express", m: "22 min · Todos" },
    { t: "Full body strength", m: "45 min · Avançado" },
  ],
  core: [
    { t: "Core anti-extensão", m: "16 min · Intermediário" },
    { t: "Prancha e dead bug", m: "14 min · Iniciante" },
    { t: "Core rotacional", m: "20 min · Avançado" },
    { t: "Core express", m: "10 min · Todos" },
  ],
};

export const PROTO_INTER_SESSIONS = [
  {
    part: "peito" as BodyPartId,
    title: "Peito, ombro e tríceps",
    caption: "8 exercícios · 45–60 min",
    tag: "Hoje",
  },
  {
    part: "costas" as BodyPartId,
    title: "Costas e bíceps",
    caption: "7 exercícios · 45–60 min",
    tag: "",
  },
  {
    part: "pernas" as BodyPartId,
    title: "Pernas e glúteo",
    caption: "8 exercícios · 45–60 min",
    tag: "",
  },
];

export const PROTO_ADV_BLOCKS = [
  {
    part: "full" as BodyPartId,
    title: "Semanas 1–4 · Volume",
    caption: "Séries totais e densidade",
    tag: "Base",
  },
  {
    part: "peito" as BodyPartId,
    title: "Semanas 5–8 · Intensidade",
    caption: "Cargas maiores · RPE alto",
    tag: "",
  },
  {
    part: "core" as BodyPartId,
    title: "Semanas 9–12 · Pico e deload",
    caption: "Testes e recuperação",
    tag: "",
  },
];

export const FAST_EXERCISES = [
  { part: "pernas" as BodyPartId, t: "Agachamento", m: "40s · 20s descanso", workSec: 40, restSec: 20 },
  { part: "peito" as BodyPartId, t: "Flexão (joelhos ok)", m: "40s · 20s descanso", workSec: 40, restSec: 20 },
  { part: "gluteo" as BodyPartId, t: "Afundo alternado", m: "40s · 20s descanso", workSec: 40, restSec: 20 },
  { part: "core" as BodyPartId, t: "Prancha", m: "40s · 20s descanso", workSec: 40, restSec: 20 },
  { part: "full" as BodyPartId, t: "Burpee modificado", m: "40s · 60s entre rounds", workSec: 40, restSec: 60 },
];

export const RUN_5K_DAYS = [
  { id: "d1", num: "1", label: "Dia", title: "Caminhada 5 min", sub: "Aquecimento leve", tone: "run5" },
  { id: "d2", num: "2", label: "Bloco", title: "Corrida 1 min + caminhada 2 min", sub: "Repetir 6 vezes", tone: "a" },
  { id: "d3", num: "3", label: "Fim", title: "Caminhada 5 min", sub: "Volta à calma", tone: "g" },
];

export const RUN_10K_PHASES = [
  { id: "p1", num: "1", label: "Fase", title: "Semanas 1–4 · Base aeróbica", sub: "Intervalos curtos", tone: "run10" },
  { id: "p2", num: "2", label: "Fase", title: "Semanas 5–8 · Construção", sub: "Corridas de 5–7 km", tone: "d" },
  { id: "p3", num: "3", label: "Fase", title: "Semanas 9–12 · Específico 10 km", sub: "Longões e ritmo de prova", tone: "h" },
];

export const ADAPTATIONS: Array<{
  id: AdaptId;
  label: string;
  sub: string;
  heroSub: string;
  prose: string;
  tone: string;
  items: Array<{ part: BodyPartId; t: string; m: string }>;
}> = [
  {
    id: "lipedema",
    label: "Lipedema",
    sub: "Baixo impacto e circulação",
    heroSub: "6 semanas · baixo impacto",
    prose:
      "Exercícios que respeitam o tecido adiposo doloroso, priorizando circulação e força leve.",
    tone: "run5",
    items: [
      { part: "pernas", t: "Caminhada aquática / elíptico", m: "Cardio sem compressão" },
      { part: "gluteo", t: "Força com bandas", m: "Glúteos e pernas" },
      { part: "core", t: "Mobilidade e respiração", m: "Alívio e consciência" },
    ],
  },
  {
    id: "gravida",
    label: "Grávidas",
    sub: "Por trimestre · core",
    heroSub: "1º · 2º · 3º trimestre",
    prose:
      "Movimento seguro com foco em postura e assoalho pélvico. Sempre com liberação médica.",
    tone: "f",
    items: [
      { part: "full", t: "1º trimestre", m: "Manutenção · volume leve" },
      { part: "core", t: "2º trimestre", m: "Força adaptada" },
      { part: "gluteo", t: "3º trimestre", m: "Mobilidade e caminhada" },
    ],
  },
  {
    id: "joelho",
    label: "Joelho",
    sub: "Estabilidade sem impacto",
    heroSub: "Estabilidade sem impacto",
    prose: "Fortalecimento de quadril e posteriores, com amplitude controlada.",
    tone: "i",
    items: [
      { part: "gluteo", t: "Ativação de glúteo médio", m: "Alinhamento do joelho" },
      { part: "pernas", t: "Agachamento em caixa", m: "Amplitude controlada" },
      { part: "full", t: "Bike / elíptico", m: "Cardio sem impacto" },
    ],
  },
  {
    id: "coluna",
    label: "Coluna",
    sub: "Mobilidade e postura",
    heroSub: "Core, mobilidade e postura",
    prose: "Estabilidade do tronco sem flexões agressivas.",
    tone: "d",
    items: [
      { part: "core", t: "Bird-dog · dead bug", m: "Core anti-extensão" },
      { part: "costas", t: "Mobilidade torácica", m: "Alongamentos diários" },
      { part: "full", t: "Caminhada postural", m: "Volume leve" },
    ],
  },
];

export const EBOOK_CHAPTERS = [
  { id: "01", n: "01", t: "Fundamentos", m: "Energia, macros e timing" },
  { id: "02", n: "02", t: "Proteína no dia a dia", m: "Metas práticas · 6 pág." },
  { id: "03", n: "03", t: "Carboidratos e treino", m: "Pré e pós-treino" },
  { id: "04", n: "04", t: "Gorduras e hormônios", m: "Qualidade e quantidades" },
  { id: "05", n: "05", t: "Hidratação", m: "Eletrólitos e volume" },
  { id: "06", n: "06", t: "Refeições modelo", m: "Cardápios da semana" },
  { id: "07", n: "07", t: "Suplementos", m: "O que vale a pena" },
];

export type ShopArt = "dumbbell" | "bookmark" | "bands" | "lock" | "gluteo" | "full";

export const SHOP_PRODUCTS: Array<{
  id: string;
  t: string;
  sub: string;
  priceBRL: number;
  art: ShopArt;
  tone: string;
  style?: string;
  href?: string;
}> = [
  { id: "shop-kit", t: "Kit Home Gym", sub: "Halteres e acessórios", priceBRL: 189, art: "dumbbell", tone: "a" },
  {
    id: "shop-ebook",
    t: "Ebook Nutrição",
    sub: "48 páginas",
    priceBRL: 47,
    art: "bookmark",
    tone: "",
    style: "background:linear-gradient(165deg,#1A3A2A,#52B788)",
    href: "/ebook",
  },
  { id: "shop-bands", t: "Faixas elásticas", sub: "3 densidades", priceBRL: 79, art: "bands", tone: "f" },
  { id: "shop-annual", t: "Plano Anual", sub: "Acesso completo", priceBRL: 397, art: "lock", tone: "h" },
  {
    id: "shop-gluteo",
    t: "Método Glúteo",
    sub: "12 treinos digitais",
    priceBRL: 97,
    art: "gluteo",
    tone: "f",
    href: "/treinos/corpo/gluteo",
  },
  {
    id: "shop-proto-adv",
    t: "Protocolo Adv.",
    sub: "12 semanas PPL",
    priceBRL: 147,
    art: "full",
    tone: "d",
    href: "/treinos/protocolo/avancado",
  },
];

export function toneClass(tone: string): string {
  return `tone-${tone}`;
}
