"use client";

import { useState, useEffect } from "react";
import { useAuth, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Todo } from "@/types/todo";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  setAuthToken,
} from "@/lib/api";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";

const CHATBOT_URL = process.env.NEXT_PUBLIC_CHATBOT_URL || "http://localhost:3001";

export default function Home() {
  const { isSignedIn, getToken } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      if (token) setAuthToken(token);
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      loadTodos();
    } else {
      setLoading(false);
    }
  }, [isSignedIn]);

  const handleCreate = async (title: string, description: string | null) => {
    try {
      setError(null);
      const token = await getToken();
      if (token) setAuthToken(token);
      const newTodo = await createTodo({ title, description: description || undefined });
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      setError(null);
      const token = await getToken();
      if (token) setAuthToken(token);
      const updated = await toggleTodo(id);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updated : todo))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle todo");
    }
  };

  const handleUpdate = async (
    id: string,
    title: string,
    description: string | null
  ) => {
    try {
      setError(null);
      const token = await getToken();
      if (token) setAuthToken(token);
      const updated = await updateTodo(id, { title, description: description || undefined });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updated : todo))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      const token = await getToken();
      if (token) setAuthToken(token);
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;

  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <SignedOut>
          <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 text-violet-600 text-xs font-semibold rounded-full border border-violet-100 mb-6">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              AI-powered task management
            </div>

            {/* Main heading */}
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
              Plan smarter,<br />
              <span className="gradient-text">do more.</span>
            </h1>

            {/* Subheading / description */}
            <p className="text-lg text-gray-500 mb-2 max-w-sm leading-relaxed">
              A clean, minimal todo app with built-in AI assistant.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Stay organized, stay focused — one task at a time.
            </p>

            <SignInButton mode="modal">
              <button className="cta-btn px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 text-base font-semibold shadow-lg shadow-violet-200 transition-all duration-200 hover:-translate-y-0.5">
                Get Started Free
              </button>
            </SignInButton>

            {/* Feature hints */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center max-w-md">
              <div>
                <div className="feature-icon w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center mx-auto mb-2 cursor-default">
                  <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 font-medium">Smart Tasks</p>
              </div>
              <div>
                <div className="feature-icon w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-2 cursor-default">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 font-medium">AI Chat</p>
              </div>
              <div>
                <div className="feature-icon w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center mx-auto mb-2 cursor-default">
                  <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 font-medium">Real-time</p>
              </div>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          {/* Page header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">
              Your <span className="gradient-text">Tasks</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Stay on top of your day — organized and focused.
            </p>
            {/* Stats row */}
            <div className="flex gap-3 mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 text-xs font-semibold rounded-full border border-violet-100">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                {pendingCount} pending
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                {completedCount} completed
              </span>
            </div>
          </header>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <TodoForm onSubmit={handleCreate} />

          <div className="mt-8">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              All Tasks · {todos.length}
            </h2>
            <TodoList
              todos={todos}
              loading={loading}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        </SignedIn>
      </main>

      {/* Floating AI Chat Button */}
      <a
        href={CHATBOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        title="Open AI Assistant"
      >
        <div className="fab-btn relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-500 text-white rounded-full shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            AI Assistant
            <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </span>
        </div>
      </a>
    </>
  );
}
