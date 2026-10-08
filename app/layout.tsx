import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buildbox | Vibe Code Web & Mobile Apps with Autonomous AI Agents",
  description: "Transform ideas into production-ready web and mobile applications with autonomous AI agents. Real-time preview, code editor, and instant deploy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text min-h-screen antialiased flex flex-col selection:bg-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
