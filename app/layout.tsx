import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VendeFácil - Perfumes",
  description: "Sua loja de perfumes online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
