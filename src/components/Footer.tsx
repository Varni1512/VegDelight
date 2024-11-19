import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-600 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About VegDelight</h3>
            <p className="text-emerald-100">
              Discover the best vegetarian recipes from across India and beyond.
              Share your recipes and explore diverse culinary traditions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-emerald-100 hover:text-white">Popular Recipes</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white">Latest Additions</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white">Submit Recipe</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="text-emerald-100 mb-4">
              Follow us on social media for daily recipe updates and cooking tips.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-emerald-100 hover:text-white">Facebook</a>
              <a href="#" className="text-emerald-100 hover:text-white">Instagram</a>
              <a href="#" className="text-emerald-100 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-emerald-500 text-center">
          <p className="flex items-center justify-center text-emerald-100">
            Made with <Heart className="w-4 h-4 mx-1 fill-current" /> by VegDelight Team
          </p>
        </div>
      </div>
    </footer>
  );
}