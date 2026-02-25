import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { productAPI } from '../utils/api';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getBestSellers({
        page_size: 5,
        page_number: 1
      });
      setProducts(response.results || []);
    } catch (err) {
      console.error('Error fetching best sellers:', err);
      setError('Failed to load best sellers.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-8">
        <div className="max-w-[90%] mx-auto">
          <div className="flex h-16 justify-between items-center mb-8">
            <h2 className="font-plus-jakarta-sans font-semibold text-2xl text-gray-700">
              Best Sellers
            </h2>
            <div className="flex items-center gap-2 text-pink-500 font-medium">
              Explore All
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="w-full py-8">
        <div className="max-w-[90%] mx-auto">
          <div className="flex h-16 justify-between items-center mb-8">
            <h2 className="font-plus-jakarta-sans font-semibold text-2xl text-gray-700">
              Best Sellers
            </h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            {error}
            <button 
              onClick={fetchBestSellers}
              className="ml-4 text-pink-500 hover:text-pink-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <div className="max-w-[90%] mx-auto">
        <div className="flex h-16 justify-between items-center mb-8">
          <h2 className="font-plus-jakarta-sans font-semibold text-2xl text-gray-700">
            Best Sellers
          </h2>
          <a 
            href="/products?best_seller=true"
            className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition duration-200 font-medium"
          >
            Explore All
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No best seller products available.
          </div>
        )}

        {products.length > 0 && (
          <>
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="md:hidden">
              <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {products.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-64">
                    <ProductCard product={product} isMobile={true} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BestSellers;