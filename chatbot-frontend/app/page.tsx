"use client";

import { useAuth, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ChatInterface } from "@/components/ChatInterface";

const TODO_APP_URL = process.env.NEXT_PUBLIC_TODO_APP_URL || "http://localhost:3000";

export default function Home() {
  const { userId } = useAuth();

  return (
    <>
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <SignedOut>
            <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 text-violet-600 text-xs font-semibold rounded-full border border-violet-100 mb-6">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                Powered by AI · Real-time task management
              </div>

              {/* Main heading */}
              <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
                Chat your way<br />
                <span className="gradient-text">to done.</span>
              </h1>

              {/* Subheading / description */}
              <p className="text-lg text-gray-500 mb-2 max-w-sm leading-relaxed">
                Chat naturally to create, update, and organize your tasks.
              </p>
              <p className="text-sm text-gray-400 mb-8">
                Just say what you need — your AI handles the rest.
              </p>

              <SignInButton mode="modal">
                <button className="cta-btn px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 text-base font-semibold shadow-lg shadow-violet-200 transition-all duration-200 hover:-translate-y-0.5">
                  Start Chatting
                </button>
              </SignInButton>

              {/* Example prompts */}
              <div className="mt-12 flex flex-wrap gap-2 justify-center max-w-lg">
                {[
                  "Add a task to buy groceries",
                  "Show my pending tasks",
                  "Mark the meeting task done",
                  "Delete completed tasks",
                ].map((prompt) => (
                  <span
                    key={prompt}
                    className="px-3 py-1.5 bg-white border border-violet-100 text-gray-500 text-xs rounded-full shadow-sm hover:border-violet-300 hover:text-violet-600 transition-colors duration-200"
                  >
                    &quot;{prompt}&quot;
                  </span>
                ))}
              </div>
            </div>
          </SignedOut>

          <SignedIn>
            {/* Page header */}
            <header className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">
                AI <span className="gradient-text">Chat Assistant</span>
              </h1>
              <p className="text-gray-500 text-sm">
                Chat naturally to manage your tasks — just say what you need.
              </p>
            </header>

            <ChatInterface userId={userId || ""} />

            <footer className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Try: &quot;Add a task to buy groceries&quot; · &quot;Show my pending tasks&quot; · &quot;Mark task 1 complete&quot;
              </p>
            </footer>
          </SignedIn>
        </div>
      </main>

      {/* Floating Back-to-Tasks Button */}
      <a
        href={TODO_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        title="Open Task Manager"
      >
        <div className="fab-btn relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-full shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Task Manager
            <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </span>
        </div>
      </a>
    </>
  );
}
