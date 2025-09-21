import React from "react";
import { ShoppingCart, Gift, Truck } from "lucide-react";

const MidNavbar = ({ currentIndex }) => {
  return (
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
            className="fade-text text-gray-50 w-[250px] h-[20px] flex items-center justify-around"
            style={{
              animationDelay:
                currentIndex === 0 ? "0s" : currentIndex === 1 ? "5s" : "10s",
              opacity: currentIndex === 0 ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            SHOPPING VOUCHER UPTO Rs. 1000
          </span>
        </div>
        <div className="flex items-center h-full px-4">
          <Gift className="text-pink-400 bg-white w-[22px] h-[20px] mr-1" />
          <span
            className="fade-text text-gray-50 w-[250px] h-[20px] flex items-center justify-center"
            style={{
              animationDelay:
                currentIndex === 1 ? "0s" : currentIndex === 2 ? "5s" : "10s",
              opacity: currentIndex === 1 ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            SELECTABLE FREE GIFTS ON EVERY
          </span>
        </div>
        <div className="flex items-center h-full px-4">
          <Truck className="text-pink-400 bg-white w-[22px] h-[20px] mr-1" />
          <span
            className="fade-text text-gray-50 w-[250px] h-[20px] flex items-center justify-center"
            style={{
              animationDelay:
                currentIndex === 2 ? "0s" : currentIndex === 0 ? "5s" : "10s",
              opacity: currentIndex === 2 ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            ABOVE RS. 1000 (INSIDE POKHARA)
          </span>
        </div>
      </div>
    </div>
  );
};

export default MidNavbar;
