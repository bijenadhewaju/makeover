import React, { useState, useEffect } from "react";
import TopNavbar from "./TopNavbar";
import MidNavbar from "./MidNavbar";
import BottomNavbar from "./BottomNavbar";

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-50 border-b border-gray-100 shadow-sm pb-20">
      <TopNavbar />
      <MidNavbar currentIndex={currentIndex} />
      <BottomNavbar />
    </header>
  );
};

export default Header;
