import React from 'react';
import { X } from 'lucide-react';
import RecipeCard from './RecipeCard';
import type { Recipe } from '../types';

interface SeeAllModalProps {
  title: string;
  recipes: Recipe[];
  onClose: () => void;
  onOpenDetails: (recipe: Recipe) => void;
}

export default function SeeAllModal({ title, recipes, onClose, onOpenDetails }: SeeAllModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
}