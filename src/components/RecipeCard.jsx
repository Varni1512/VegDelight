import React from 'react';
import { Star } from 'lucide-react';

export default function RecipeCard({ recipe, onOpenDetails }) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={() => onOpenDetails(recipe)}
    >
      <div className="relative h-48">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg text-sm font-medium text-emerald-600">
          {recipe.cuisine}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="font-medium">{recipe.rating}</span>
          <span className="text-gray-500">({recipe.reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
}