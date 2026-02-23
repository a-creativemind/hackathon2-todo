"use client";

import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string, description: string | null) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  todos,
  loading,
  onToggle,
  onUpdate,
  onDelete,
}: TodoListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 gap-3">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-200 border-t-blue-600" />
        <span className="text-sm text-gray-400 font-medium">Loading tasks...</span>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-600 font-medium mb-1">No tasks yet</p>
        <p className="text-sm text-gray-400">Add your first task using the form above</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
