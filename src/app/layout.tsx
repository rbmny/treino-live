import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/Shell";

export const metadata: Metadata = {
  title: "Treino Live — Live, treinos e loja",
  description:
    "Live gratuita, protocolos, Fast Trainer, corrida, ebook, loja e Premium. Demo mobile-first.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f5f5f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
