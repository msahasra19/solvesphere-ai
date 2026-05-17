import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SolveSphere AI - Discover Solutions, Build the Future",
  description: "AI-powered platform to search real-world problems, discover verified solutions, and convert unsolved challenges into innovative projects and startups.",
  keywords: "AI solutions, problem solving, startup ideas, developer tools, project ideas, tech solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

// Made with Bob
