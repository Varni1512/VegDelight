import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Recipe } from '../types';

interface AddRecipeModalProps {
  onClose: () => void;
  onAdd: (recipe: Omit<Recipe, 'id' | 'rating' | 'reviews'>) => void;
}

export default function AddRecipeModal({ onClose, onAdd }: AddRecipeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'breakfast',
    cuisine: 'West Indian',
    image: '',
    ingredients: [''],
    instructions: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.ingredients[0] === '' || formData.instructions[0] === '') {
      toast.error('Please add at least one ingredient and instruction');
      return;
    }
    onAdd(formData);
    toast.success('Recipe added successfully!');
    onClose();
  };

  const addField = (field: 'ingredients' | 'instructions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateField = (field: 'ingredients' | 'instructions', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add New Recipe</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Recipe Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="snacks">Snacks</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cuisine</label>
              <select
                value={formData.cuisine}
                onChange={e => setFormData(prev => ({ ...prev, cuisine: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              >
                <option value="South Indian">South Indian</option>
                <option value="North Indian">North Indian</option>
                <option value="West Indian">West Indian</option>
                <option value="East Indian">East Indian</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Ingredients</label>
              <button
                type="button"
                onClick={() => addField('ingredients')}
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                + Add Ingredient
              </button>
            </div>
            {formData.ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                required
                value={ingredient}
                onChange={e => updateField('ingredients', index, e.target.value)}
                className="w-full p-2 border rounded-lg mb-2"
                placeholder={`Ingredient ${index + 1}`}
              />
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Instructions</label>
              <button
                type="button"
                onClick={() => addField('instructions')}
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                + Add Step
              </button>
            </div>
            {formData.instructions.map((instruction, index) => (
              <input
                key={index}
                type="text"
                required
                value={instruction}
                onChange={e => updateField('instructions', index, e.target.value)}
                className="w-full p-2 border rounded-lg mb-2"
                placeholder={`Step ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
}