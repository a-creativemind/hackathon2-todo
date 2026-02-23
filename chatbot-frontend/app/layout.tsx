import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { NavAuth } from "@/components/NavAuth";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "TaskFlow AI — Chat Your Way to Done",
  description: "AI-powered chat assistant to manage your todos naturally",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-50 antialiased">
          <nav className="bg-white border-b border-gray-100 shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold gradient-text">TaskFlow AI</span>
                <span className="hidden sm:inline text-xs text-gray-400 font-medium">Smart Chat Assistant</span>
              </div>
            </div>
            <NavAuth />
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
