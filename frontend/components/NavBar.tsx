"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-indigo-500 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold gradient-text">TaskFlow</span>
          <span className="hidden sm:inline text-xs text-gray-400 font-medium">Plan Smarter, Do More</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-700 hover:to-indigo-700 text-sm font-medium transition-all duration-200 shadow-sm shadow-violet-200">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
