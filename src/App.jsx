import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Header />
      <div className="pt-4">
         <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Product listing routes */}
          <Route path="/products" element={<Product />} />
          <Route path="/products/:categoryRoute" element={<Product />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
