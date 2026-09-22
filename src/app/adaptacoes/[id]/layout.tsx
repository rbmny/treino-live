import { ADAPTATIONS } from "@/lib/content";

export function generateStaticParams() {
  return ADAPTATIONS.map((a) => ({ id: a.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
