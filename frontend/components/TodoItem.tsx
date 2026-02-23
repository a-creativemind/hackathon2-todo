"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";

const PRIORITY_STYLES: Record<string, string> = {
  low: "bg-gray-100 text-gray-500",
  medium: "bg-blue-50 text-blue-600 border border-blue-100",
  high: "bg-orange-50 text-orange-600 border border-orange-100",
  urgent: "bg-red-50 text-red-600 border border-red-100",
};

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string, description: string | null) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle.trim(), editDescription.trim() || null);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(false);
  };

  const formattedDate = new Date(todo.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (isEditing) {
    return (
      <li className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
            placeholder="Description (optional)"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm font-medium transition-all"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`bg-white border rounded-2xl p-4 shadow-sm flex items-start gap-3 transition-all duration-200 hover:shadow-md ${
        todo.completed ? "border-green-100 opacity-75" : "border-gray-100 hover:border-blue-100"
      }`}
    >
      {/* Custom checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? "bg-green-500 border-green-500"
            : "border-gray-300 hover:border-green-400"
        }`}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <h3
          className={`text-sm font-semibold leading-snug ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </h3>

        {todo.priority && (
          <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${PRIORITY_STYLES[todo.priority]}`}>
            {todo.priority}
          </span>
        )}

        {todo.description && (
          <p
            className={`mt-1 text-xs leading-relaxed ${
              todo.completed ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {todo.description}
          </p>
        )}

        {todo.tags && todo.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {todo.tags.map((tag) => (
              <span key={tag} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-500 text-xs rounded-full border border-blue-100">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {todo.due_date && (
          <p className={`mt-1.5 text-xs font-medium ${
            !todo.completed && new Date(todo.due_date) < new Date()
              ? "text-red-500"
              : "text-gray-400"
          }`}>
            Due {new Date(todo.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        )}

        <p className="mt-1.5 text-xs text-gray-300">{formattedDate}</p>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => setIsEditing(true)}
          className="text-xs text-gray-400 hover:text-blue-600 font-medium transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (confirm("Delete this task?")) {
              onDelete(todo.id);
            }
          }}
          className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
