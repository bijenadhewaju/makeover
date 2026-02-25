import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Star, Zap, Home, Gamepad2, Shirt, BookOpen } from "lucide-react";
import { categoryAPI } from '../utils/api';

// Category icon mapping based on your categories
const categoryIcons = {
  "Beauty": <Sparkles className="w-6 h-6" />,
  "Books": <BookOpen className="w-6 h-6" />,
  "Electronics": <Zap className="w-6 h-6" />,
  "Fashion": <Shirt className="w-6 h-6" />,
  "Home & Kitchen": <Home className="w-6 h-6" />,
  "Sports": <Gamepad2 className="w-6 h-6" />,
  "Toys": <Star className="w-6 h-6" />
};

// Category colors
const categoryColors = {
  "Beauty": "from-pink-400 to-rose-500",
  "Books": "from-blue-400 to-indigo-500",
  "Electronics": "from-purple-400 to-violet-500",
  "Fashion": "from-red-400 to-pink-500",
  "Home & Kitchen": "from-green-400 to-emerald-500",
  "Sports": "from-orange-400 to-amber-500",
  "Toys": "from-yellow-400 to-orange-500"
};

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryAPI.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback categories
      setCategories([
        { id: 1, name: "Beauty", slug: "beauty" },
        { id: 2, name: "Books", slug: "books" },
        { id: 3, name: "Electronics", slug: "electronics" },
        { id: 4, name: "Fashion", slug: "fashion" },
        { id: 5, name: "Home & Kitchen", slug: "home-kitchen" },
        { id: 6, name: "Sports", slug: "sports" },
        { id: 7, name: "Toys", slug: "toys" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Browse by Category
              </h2>
              
            </div>
            <div className="mt-4 md:mt-0">
              <div className="animate-pulse h-10 w-32 rounded-lg"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-32 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 md:py-16 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Browse by Category
            </h2>
            <p className="text-gray-600 text-lg">Discover products from our curated collections</p>
          </div>
          
        </div>

        {/* Categories Grid */}
        {categories.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-6">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[cat.name] || 'from-gray-400 to-gray-500'} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-4 flex justify-center">
                    <div className={`p-4 rounded-xl ${categoryColors[cat.name]?.replace('from-', 'bg-').replace(' to-', ' bg-gradient-to-br ') || 'bg-gradient-to-br from-gray-400 to-gray-500'} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                      <div className="text-gray-700 group-hover:text-gray-900 transition-colors">
                        {categoryIcons[cat.name] || <Star className="w-6 h-6" />}
                      </div>
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-center font-semibold text-gray-800 group-hover:text-gray-900 text-lg mb-2 transition-colors">
                    {cat.name}
                  </h3>

                  {/* Product Count Badge (optional) */}
                  <div className="text-center">
                    <span className="inline-block text-xs text-gray-500 group-hover:text-gray-600 px-3 py-1 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                      Shop Now
                    </span>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {categories.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Sparkles className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories available</h3>
            <p className="text-gray-500">Categories will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategories;