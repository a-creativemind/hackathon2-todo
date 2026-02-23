"use client";

import { useState } from "react";

interface TodoFormProps {
  onSubmit: (title: string, description: string | null) => Promise<void>;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Title is required");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(trimmedTitle, description.trim() || null);
      setTitle("");
      setDescription("");
    } catch {
      setError("Failed to create todo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
    >
      <h3 className="text-sm font-semibold text-gray-700 mb-4">New Task</h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="title" className="block text-xs font-medium text-gray-500 mb-1.5">
            Title <span className="text-blue-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            placeholder="What needs to be done?"
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all duration-200"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-medium text-gray-500 mb-1.5">
            Description <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            rows={2}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 transition-all duration-200 resize-none"
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-all duration-200 shadow-sm shadow-blue-200 hover:shadow-md hover:shadow-blue-200"
        >
          {isSubmitting ? "Adding..." : "+ Add Task"}
        </button>
      </div>
    </form>
  );
}
