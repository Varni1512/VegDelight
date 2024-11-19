export interface Recipe {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  cuisine: string;
  image: string;
  instructions: string[];
  ingredients: string[];
  rating: number;
  reviews: number;
}

export interface RecipeCardProps {
  recipe: Recipe;
  onOpenDetails: (recipe: Recipe) => void;
}

export interface CuisineSectionProps {
  title: string;
  recipes: Recipe[];
  onOpenDetails: (recipe: Recipe) => void;
  onSeeAll: (cuisine: string) => void;
}