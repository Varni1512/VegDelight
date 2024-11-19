import React from 'react';
import { Plus } from 'lucide-react';

interface AddRecipeButtonProps {
  onClick: () => void;
}

export default function AddRecipeButton({ onClick }: AddRecipeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg transform transition-transform hover:scale-110 z-50"
      aria-label="Add Recipe"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}