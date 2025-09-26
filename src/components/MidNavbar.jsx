import React from "react";
import { ShoppingCart, Gift, Truck } from "lucide-react";

const MidNavbar = () => {
  const items = [
    { icon: <ShoppingCart className="text-pink-400 bg-white w-4 h-4 mr-1" />, text: "SHOPPING VOUCHER UPTO Rs. 1000" },
    { icon: <Gift className="text-pink-400 bg-white w-4 h-4 mr-1" />, text: "SELECTABLE FREE GIFTS ON EVERY ORDER" },
    { icon: <Truck className="text-pink-400 bg-white w-4 h-4 mr-1" />, text: "FREE DELIVERY ABOVE RS. 1000" },
      ];

  return (
    <div className="w-full bg-pink-400 text-gray-50 font-semibold flex items-center justify-center h-8 md:h-8 overflow-hidden relative text-xs md:text-sm  tracking-widest">
      <style>{`
        /* Fade in/out for large screens */
        @media (min-width: 768px) {
          @keyframes fadeInOut {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }
          .fade-text {
            animation: fadeInOut 4s infinite;
          }
        }

        /* Slide up for small screens */
        @media (max-width: 767px) {
          @keyframes slideUp {
            0% { transform: translateY(100%); opacity: 0; }
            10% { transform: translateY(0); opacity: 1; }
            30% { transform: translateY(0); opacity: 1; }
            40% { transform: translateY(-100%); opacity: 0; }
            100% { transform: translateY(-100%); opacity: 0; }
          }
          .slide-text {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            animation: slideUp 9s infinite;
          }
          .slide-text:nth-child(1) { animation-delay: 0s; }
          .slide-text:nth-child(2) { animation-delay: 3s; }
          .slide-text:nth-child(3) { animation-delay: 6s; }
        }
      `}</style>

      {/* Large screens */}
      <div className="max-w-[90%] mx-auto hidden md:flex flex-row items-center justify-between space-x-6 w-full">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center h-full px-2">
            {item.icon}
            <span className="fade-text">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Small screens */}
      <div className="md:hidden relative w-full h-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="slide-text flex items-center justify-center"
          >
            {item.icon}
            <span className="ml-1">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MidNavbar;
