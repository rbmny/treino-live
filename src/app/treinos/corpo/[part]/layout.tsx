import { BODY_ORDER } from "@/lib/content";

export function generateStaticParams() {
  return BODY_ORDER.map((part) => ({ part }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
