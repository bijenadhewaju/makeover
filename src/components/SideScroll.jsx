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
    <section className="w-full h-[500px] flex items-center justify-center relative mt-16">
      <div className="w-full overflow-x-auto scrollbar-hide py-12">
        <div className="flex gap-8 min-w-max px-8">
          {carouselImages.map((img, idx) => (
            <div
              key={idx}
              className="w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-lg"
              style={{ flex: '0 0 auto' }}
            >
              <img
                src={img}
                alt={`Carousel ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SideScroll;