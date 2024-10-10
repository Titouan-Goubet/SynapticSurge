import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SynapticSurge",
  description: "Plateforme de Quiz en temps réel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
