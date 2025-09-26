import React from "react";
import SearchBar from "../components/SearchBar";
import ProductCategories from "../components/ProductCategories";
import SideScroll from "../components/SideScroll";
import FlashSale from "../components/FlashSale";
import CouponSection from "../components/CouponSection";
import ProductDay from "../components/ProductDay";
import BrandSection from "../components/BrandSection";

const Home = () => {
  return (
    <main className="pt-56 px-4">
      <SearchBar />
      <ProductCategories />
      <SideScroll />
      <FlashSale />
      <CouponSection />
      <ProductDay />
      <BrandSection />
    </main>
  );
};

export default Home;