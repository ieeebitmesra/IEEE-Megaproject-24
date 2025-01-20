// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientComponent from "./c"; // Import the client component
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BitOverflow",
  description: "Bit community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Analytics/>
      <body className={cn(inter.className, "dark:bg-black dark:text-white")}>
        <ClientComponent>{children}</ClientComponent> {/* Use the client component */}
      </body>
    </html>
  );
}

