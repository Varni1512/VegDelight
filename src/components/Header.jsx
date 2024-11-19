import React from 'react';
import { UtensilsCrossed, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = ['breakfast', 'lunch', 'snacks', 'dinner'];

export default function Header({ selectedCategory, onSelectCategory }) {
  const handleReset = () => {
    localStorage.removeItem('vegdelight_recipes');
    toast.success('Recipes reset to default! Refresh the page to see changes.');
    window.location.reload();
  };

  return (
    <header className="bg-emerald-600 text-white sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <UtensilsCrossed size={24} />
            <h1 className="text-2xl font-bold">VegDelight</h1>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onSelectCategory(category)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    selectedCategory === category
                      ? 'bg-white text-emerald-600'
                      : 'hover:bg-emerald-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
            <button
              onClick={handleReset}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-emerald-700"
              title="Reset to default recipes"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}