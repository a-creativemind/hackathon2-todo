import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow — Plan Smarter, Do More",
  description: "A modern, minimalistic todo app with AI assistant integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-50 min-h-screen">
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
