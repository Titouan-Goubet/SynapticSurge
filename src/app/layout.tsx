import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SynapticSurge",
  description: "Plateforme de Quiz en temps réel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
