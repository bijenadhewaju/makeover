import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Header />
      <div className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Product listing routes */}
          <Route path="/products" element={<Product />} />
          <Route path="/products/:categoryRoute" element={<Product />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
