import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import CuisineSection from './components/CuisineSection';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeButton from './components/AddRecipeButton';
import AddRecipeModal from './components/AddRecipeModal';
import SeeAllModal from './components/SeeAllModal';
import Footer from './components/Footer';
import { recipes as initialRecipes } from './data/recipes';
import type { Recipe } from './types';

export function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [selectedCategory, setSelectedCategory] = useState('breakfast');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [seeAllData, setSeeAllData] = useState<{ title: string; recipes: Recipe[] } | null>(null);

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.category === selectedCategory
  );

  const cuisines = ['West Indian', 'South Indian', 'North Indian',  'East Indian', 'Chinese'];
  
  const handleAddRecipe = (newRecipe: Omit<Recipe, 'id' | 'rating' | 'reviews'>) => {
    const recipe: Recipe = {
      ...newRecipe,
      id: (recipes.length + 1).toString(),
      rating: 0,
      reviews: 0
    };
    setRecipes([...recipes, recipe]);
  };

  const handleSeeAll = (cuisine: string) => {
    const cuisineRecipes = filteredRecipes.filter(recipe => recipe.cuisine === cuisine);
    setSeeAllData({
      title: `${cuisine} ${selectedCategory}`,
      recipes: cuisineRecipes
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to VegDelight
          </h2>
          <p className="text-gray-600">
            Discover delicious vegetarian recipes from across India and beyond.
            Browse our collection of breakfast, lunch, snacks, and dinner recipes.
          </p>
        </div>

        {cuisines.map((cuisine) => (
          <CuisineSection
            key={cuisine}
            title={`${cuisine} ${selectedCategory}`}
            recipes={filteredRecipes.filter(recipe => recipe.cuisine === cuisine)}
            onOpenDetails={setSelectedRecipe}
            onSeeAll={() => handleSeeAll(cuisine)}
          />
        ))}
      </main>

      <Footer />

      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {showAddRecipe && (
        <AddRecipeModal
          onClose={() => setShowAddRecipe(false)}
          onAdd={handleAddRecipe}
        />
      )}

      {seeAllData && (
        <SeeAllModal
          title={seeAllData.title}
          recipes={seeAllData.recipes}
          onClose={() => setSeeAllData(null)}
          onOpenDetails={setSelectedRecipe}
        />
      )}

      <AddRecipeButton onClick={() => setShowAddRecipe(true)} />
    </div>
  );
}