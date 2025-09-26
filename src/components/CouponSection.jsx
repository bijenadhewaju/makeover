import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";

const CouponSection = () => {
  const couponImages = [
    assets.coupons,
    assets.coupons,
    assets.coupons,
    assets.coupons,
    assets.coupons,
    assets.coupons,
  ];

  return (
    <div className="w-full py-8">
      <div className="max-w-[90%] mx-auto mt-8">

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-5 gap-4">
          {couponImages.slice(0, 5).map((image, index) => (
            <CouponImage key={index} image={image} />
          ))}
        </div>

        {/* Mobile Horizontal Scroll*/}
        <div className="md:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {couponImages.map((image, index) => (
              <div key={index} className="flex-shrink-0">
                <CouponImage image={image} isMobile={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Image Component
const CouponImage = ({ image, isMobile = false }) => {
  return (
    <div className={`bg-white rounded-lg overflow-hidden ${isMobile ? 'w-[233px]' : 'w-full'}`}>
      <img 
        src={image} 
        alt="Special Offer"
        className="w-full h-[74px] object-cover rounded-lg hover:opacity-90 transition-opacity duration-200"
      />
    </div>
  );
};

export default CouponSection;