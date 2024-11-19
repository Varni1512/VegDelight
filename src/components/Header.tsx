import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const categories = ['breakfast', 'lunch', 'snacks', 'dinner'];

interface HeaderProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function Header({ selectedCategory, onSelectCategory }: HeaderProps) {
  return (
    <header className="bg-emerald-600 text-white sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <UtensilsCrossed size={24} />
            <h1 className="text-2xl font-bold">VegDelight</h1>
          </div>
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
        </div>
      </div>
    </header>
  );
}