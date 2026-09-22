import { workouts } from "@/lib/data";

export function generateStaticParams() {
  return workouts.map((w) => ({ id: w.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
