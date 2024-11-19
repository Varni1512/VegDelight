import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Header from './components/Header';
import CuisineSection from './components/CuisineSection';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeButton from './components/AddRecipeButton';
import AddRecipeModal from './components/AddRecipeModal';
import SeeAllModal from './components/SeeAllModal';
import Footer from './components/Footer';
import { recipes as defaultRecipes } from './data/recipes';

const STORAGE_KEY = 'vegdelight_recipes';

export function App() {
  // Initialize recipes from localStorage or use default data
  const [recipes, setRecipes] = useState(() => {
    try {
      const savedRecipes = localStorage.getItem(STORAGE_KEY);
      return savedRecipes ? JSON.parse(savedRecipes) : defaultRecipes;
    } catch (error) {
      console.error('Error loading recipes:', error);
      return defaultRecipes;
    }
  });
  
  const [selectedCategory, setSelectedCategory] = useState('breakfast');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [seeAllData, setSeeAllData] = useState(null);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch (error) {
      console.error('Error saving recipes:', error);
      toast.error('Failed to save recipe. Please try again.');
    }
  }, [recipes]);

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.category === selectedCategory
  );

  const cuisines = ['West Indian', 'South Indian', 'North Indian', 'East Indian', 'Chinese'];
  
  const handleAddRecipe = (newRecipe) => {
    try {
      // Check if recipe with same name and cuisine already exists
      const isDuplicate = recipes.some(
        recipe => 
          recipe.name.toLowerCase() === newRecipe.name.toLowerCase() && 
          recipe.cuisine === newRecipe.cuisine
      );

      if (isDuplicate) {
        toast.error('A recipe with this name and cuisine already exists!');
        return;
      }

      const recipe = {
        ...newRecipe,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
        rating: 0,
        reviews: 0,
        dateAdded: new Date().toISOString()
      };

      setRecipes(prevRecipes => {
        const updatedRecipes = [...prevRecipes, recipe];
        return updatedRecipes;
      });
      
      toast.success('Recipe added successfully!');
    } catch (error) {
      console.error('Error adding recipe:', error);
      toast.error('Failed to add recipe. Please try again.');
    }
  };

  const handleSeeAll = (cuisine) => {
    const cuisineRecipes = filteredRecipes.filter(recipe => recipe.cuisine === cuisine);
    setSeeAllData({
      title: `${cuisine} ${selectedCategory}`,
      recipes: cuisineRecipes
    });
  };

  const handleRateRecipe = (recipeId, newRating) => {
    try {
      setRecipes(prevRecipes => {
        return prevRecipes.map(recipe => {
          if (recipe.id === recipeId) {
            const newReviews = recipe.reviews + 1;
            const currentTotalRating = recipe.rating * recipe.reviews;
            const newAverageRating = (currentTotalRating + newRating) / newReviews;
            
            return {
              ...recipe,
              rating: Number(newAverageRating.toFixed(1)),
              reviews: newReviews
            };
          }
          return recipe;
        });
      });
      toast.success('Rating submitted successfully!');
    } catch (error) {
      console.error('Error rating recipe:', error);
      toast.error('Failed to submit rating. Please try again.');
    }
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
          onRate={handleRateRecipe}
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