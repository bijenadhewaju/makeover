import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import {
  Smartphone,
  BadgeIndianRupee,
  ShoppingCart,
  Gift,
  Truck,
  Zap,
} from "lucide-react";

const Navbar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Reset to 0 after reaching 2
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-50 border-b border-gray-100 shadow-sm pb-20">
      
        {/* ----Top Header---- */}

        <div className="flex flex-col md:flex-row items-center justify-around border-b border-gray-200 bg-white">
          {/* Grouped: Logo, Tagline, Divider, Express Delivery */}
          <div className="flex flex-row items-center ml-8 mb-4 md:mb-0">
            {/* Logo & Tagline */}
            <div className="flex items-center">
              <img
                className="w-[140px] h-[165px] md:w-20 md:h-20 mr-3"
                src={assets.icon}
                alt="Makeover Me Logo"
              />
              <div className="flex flex-col justify-end">
                <p className="w-[147px] h-[18px] font-plus-jakarta-sans font-normal italic text-[14px] md:text-sm leading-[100%] tracking-normal text-pink-500">
                  The Key to a New Me
                </p>
                <p className="w-[159px] h-[30px] font-plus-jakarta-sans font-semibold text-[24px] md:text-2xl leading-[100%] tracking-normal text-pink-500">
                  Makeover Me
                </p>
              </div>
            </div>
            {/* ---- Vertical Divider ---- */}
            <div className="w-px h-12 bg-gray-500 mx-6"></div>
            {/* ---- Express Delivery & City ---- */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center mb-1">
                <Zap className="text-amber-300 fill-amber-300 mr-2" />
                <span className="font-plus-jakarta-sans font-light text-[15px] leading-[100%] tracking-normal text-gray-500">
                  Express delivery to
                </span>
              </div>
              <select className="w-28 py-1 font-plus-jakarta-sans font-semibold text-[15px] leading-[100%] text-gray-800">
                <option>Select City</option>
                <option>Pokhara</option>
                <option>Kathmandu</option>
                <option>Biratnagar</option>
                <option>Butwal</option>
              </select>
            </div>
          </div>
          {/* ---- Download App ---- */}
          <div className="w-[196px] h-[40px] top-[16px] left-[713px] flex items-center ml-6">
            <span className="flex flex-row items-center bg-pink-100 rounded-2xl p-4 m-4"><Smartphone className="text-gray-500 mr-2" />
            <button className="font-plus-jakarta-sans text-[12px] w-[90px] h-[22px] top-[24px] left-[755px] px-4 py-1 text-sm font-medium hover:bg-pink-50 leading-[100%] tracking-normal">
              Download App
            </button>
            </span>
          </div>
          {/* ---- Offers & Cart ---- */}
          <div className="flex w-[89px] h-[23px] top-[25px] left-[972px] items-center ml-6 px-4">
              <BadgeIndianRupee className="text-gray-500 mr-1 " />
              <a href="/" className="font-plus-jakarta-sans font-medium text-[15px] leading-[100%] tracking-normal text-gray-700">
                Offers
              </a>
          </div>

          <div className="flex w-[89px] h-[23px] top-[25px] left-[972px] items-center ml-6 px-4">
              <ShoppingCart className="text-gray-500 mr-1" />{" "}
              <a href="/" className="font-plus-jakarta-sans font-medium text-[15px] leading-[100%] tracking-normal text-gray-700">
                Cart
              </a>
          </div>


          {/* ---- Login Avatar ---- */}
          <div className="flex items-center ml-auto">
            <img
              src={assets.user}
              alt="User Avatar"
              className="w-10 h-10 top-[18.5px] left-[1228px]  mr-3 rounded-full object-cover border border-gray-300 shadow-sm"
            />
            <span className="w-[116px] h-[23px] top-[24px]  font-plus-jakarta-sans font-medium text-[13px] text-gray-700 text-sm">
              Hello, Username
            </span>
          </div>
        </div>


        {/* ---- Middle Header ---- */}

        <div className="w-full h-[48px] bg-pink-400 text-pink-800 text-center font-semibold text-sm flex items-center justify-center">
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .fade-text {
          animation: fadeInOut 15s infinite;
        }
      `}</style>

  <div className="flex flex-row items-center justify-center space-x-8 w-full h-full">
        <div className="flex items-center h-full px-4">
          <ShoppingCart className="text-pink-400 bg-white w-[22px] h-[20px] mr-1" />
          <span 
             className="bg-whi fade-text text-gray-50 w-[250px] h-[20px] flex items-center justify-around" 
            style={{ 
              animationDelay: currentIndex === 0 ? '0s' : currentIndex === 1 ? '5s' : '10s',
              opacity: currentIndex === 0 ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
          >
            SHOPPING VOUCHER UPTO Rs. 1000
          </span>
        </div>
        <div className="flex items-center h-full px-4">
          <Gift  className="text-pink-400 bg-white w-[22px] h-[20px] mr-1"  />
          <span 
            className="fade-text text-gray-50 w-[250px] h-[20px] flex items-center justify-center" 
            style={{ 
              animationDelay: currentIndex === 1 ? '0s' : currentIndex === 2 ? '5s' : '10s',
              opacity: currentIndex === 1 ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
          >
            SELECTABLE FREE GIFTS ON EVERY
          </span>
        </div>
        <div className="flex items-center h-full px-4">
          <Truck className="text-pink-400 bg-white w-[22px] h-[20px] mr-1"  />
          <span 
            className="fade-text text-gray-50 w-[250px] h-[20px] flex items-center justify-center" 
            style={{ 
              animationDelay: currentIndex === 2 ? '0s' : currentIndex === 0 ? '5s' : '10s',
              opacity: currentIndex === 2 ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
          >
            ABOVE RS. 1000 (INSIDE POKHARA)
          </span>
        </div>
      </div>
    </div>

        {/* ---- Bottom Header ---- */}
        <div>
          <nav className="font-jakarta-sans font-medium text-[16px] w-full flex items-center justify-center gap-8 py-3 text-gray-700 border-b bg-white border-gray-100 pb-20 mb-20">
            <a href="#" className="hover:text-pink-600">
              Women
            </a>
            <a href="#" className="hover:text-pink-600">
              Men
            </a>
            <a href="#" className="hover:text-pink-600">
              Kids
            </a>
            <a href="#" className="hover:text-pink-600">
              Beauty Products
            </a>
            <a href="#" className="hover:text-pink-600">
              Hairstyles
            </a>
            <a href="#" className="hover:text-pink-600">
              PLUS
            </a>
            <a href="#" className="hover:text-pink-600">
              Offers
            </a>
          </nav>
        </div>
    </header>
  );
};

export default Navbar;