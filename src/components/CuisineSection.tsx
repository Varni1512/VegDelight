import React from 'react';
import { ChevronRight } from 'lucide-react';
import RecipeCard from './RecipeCard';
import type { CuisineSectionProps } from '../types';

export default function CuisineSection({ title, recipes, onOpenDetails, onSeeAll }: CuisineSectionProps) {
  if (recipes.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {recipes.length > 4 && (
          <button
            onClick={() => onSeeAll(title)}
            className="flex items-center text-emerald-600 hover:text-emerald-700"
          >
            See all
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.slice(0, 4).map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    </section>
  );
}