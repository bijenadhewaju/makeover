import React from "react";
import SearchBar from "../components/SearchBar";
import ProductCategories from "../components/ProductCategories";
import SideScroll from "../components/SideScroll";

const Home = () => {
  return (
    <main className="pt-56 px-4">
      <SearchBar />
      <ProductCategories />
      <SideScroll />
    </main>
  );
};

export default Home;