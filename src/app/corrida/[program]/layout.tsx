export function generateStaticParams() {
  return [{ program: "5k" }, { program: "10k" }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
