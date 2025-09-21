import React from 'react';
import { assets } from '../assets/assets';

const carouselImages = [
  assets.carousel1,
  assets.carousel2,
  assets.carousel3,
  assets.carousel4,
  assets.carousel5,
];

const SideScroll = () => {
  return (
   <section className="w-full relative py-8 md:py-12 lg:py-16">
  <div className="w-full overflow-x-auto scrollbar-hide">
    <div className="flex gap-4 md:gap-6 lg:gap-8 min-w-max px-8 md:px-12 lg:px-16">
      {/* Left Spacer */}
      <div className="shrink-0 w-4 md:w-8 lg:w-20"></div>

      {carouselImages.map((img, idx) => (
        <div
          key={idx}
          className="w-80 md:w-96 lg:w-[500px] h-48 md:h-56 lg:h-[300px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0"
        >
          <img
            src={img}
            alt={`Carousel ${idx + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      ))}

      {/* Right Spacer */}
      <div className="shrink-0 w-4 md:w-8 lg:w-20"></div>
    </div>
  </div>
</section>


  );
};

export default SideScroll;