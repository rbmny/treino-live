export function generateStaticParams() {
  return [{ level: "inter" }, { level: "avancado" }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
