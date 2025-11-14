import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, productsData } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const Product = () => {
  const { categoryRoute } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  // Update category state when URL param changes
  useEffect(() => {
    if (categoryRoute) {
      setCategory(categoryRoute.toLowerCase());
    } else {
      setCategory("");
    }
  }, [categoryRoute]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    let list = productsData || [];

    // category
    if (category) {
      list = list.filter((p) => {
        if (Array.isArray(p.category)) {
          return p.category
            .map((c) => String(c).toLowerCase())
            .includes(category.toLowerCase());
        }
        return String(p.category).toLowerCase() === category.toLowerCase();
      });
    }

    // price
    if (priceRange) {
      const [minRaw, maxRaw] = priceRange.split("-");
      const min = Number(minRaw || 0);
      const max = Number(maxRaw || Infinity);

      list = list.filter((p) => {
        const price = Number(p.price ?? p.priceInRs ?? 0);
        return price >= min && price <= max;
      });
    }

    // sorting
    if (sortOrder === "low-to-high") {
      list = [...list].sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));
    } else if (sortOrder === "high-to-low") {
      list = [...list].sort((a, b) => Number(b.price ?? 0) - Number(a.price ?? 0));
    }

    return list;
  }, [category, priceRange, sortOrder]);

  // Handle category change from dropdown

  const handleCategoryChange = (value) => {
    setCategory(value);

    if (value) navigate(`/products/${value}`);
    else navigate(`/products`);
  };



  return (
    <div className="max-w-[90%] mx-auto pt-56 px-4 w-full">
      {/* Banner */}
      <div className="mb-12">
        <img
          src={assets.banner}
          alt="Banner"
          className="max-w-[90%] mx-auto w-full h-70 shadow-md bg-pink-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1 p-4">
          <h2 className="text-2xl font-semibold mb-6 text-gray-600">Sort by:</h2>

          <div className="space-y-4">
            {/* Category */}
            <div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">Category</h3>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-[80%] border-b-2 border-gray-500 p-2 focus:outline-none focus:border-pink-500 bg-transparent"
              >
                <option value="">All Categories</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kids">Kids</option>
                <option value="beauty">Beauty</option>
                <option value="makeup">Makeup</option>
                <option value="skincare">Skincare</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">Price Range</h3>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-[80%] border-b-2 border-gray-500 p-2 focus:outline-none focus:border-pink-500 bg-transparent"
              >
                <option value="">All Prices</option>
                <option value="0-1500">Rs. 0 - Rs. 1500</option>
                <option value="1500-3000">Rs. 1500 - Rs. 3000</option>
                <option value="3000-5000">Rs. 3000 - Rs. 5000</option>
                <option value="5000-999999">Rs. 5000+</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setCategory("");
                  setPriceRange("");
                  setSortOrder("default");
                  navigate("/products");
                }}
                className="text-sm text-pink-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-2 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <h2 className="text-2xl font-semibold text-gray-500">Products</h2>

            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">Sort</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="mb-0 border-b-2 border-gray-400 p-2 focus:outline-none focus:border-pink-500 bg-transparent"
              >
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                No products match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
