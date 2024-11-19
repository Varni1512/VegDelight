import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

export default function RecipeDetails({ recipe, onClose, onRate }) {
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleRate = () => {
    if (userRating === 0) {
      return;
    }
    onRate(recipe.id, userRating);
    setHasRated(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-64">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{recipe.name}</h2>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{recipe.rating}</span>
              <span className="text-gray-500">({recipe.reviews} reviews)</span>
            </div>
          </div>

          {!hasRated && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Rate this recipe</h3>
              <div className="flex items-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setUserRating(rating)}
                    className={`p-1 rounded-full transition-colors ${
                      rating <= userRating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
              <button
                onClick={handleRate}
                disabled={userRating === 0}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                Submit Rating
              </button>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="text-gray-700">{step}</li>
              ))}
            </ol>
          </div>

          {recipe.dateAdded && (
            <div className="mt-6 text-sm text-gray-500">
              Added on: {new Date(recipe.dateAdded).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}