import React from "react";
import { assets } from "../assets/assets";

const carouselImages = [
  assets.carousel1,
  assets.carousel2,
  assets.carousel3,
  assets.carousel4,
  assets.carousel5,
];

const SideScroll = () => {
  const loopedImages = [...carouselImages, ...carouselImages, ...carouselImages, ]; // Loop images for infinite scroll effect
  return (
    <section className="w-full relative py-8 md:py-12 lg:py-16 flex justify-center mt-6">
      <div className="w-[90%] overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        <div className="flex gap-4 md:gap-6 lg:gap-8">
          {loopedImages.map((img, idx) => (
            <div
              key={idx}
              className="
                snap-start
                flex-shrink-0
                w-full sm:basis-[90%] md:basis-[70%] lg:basis-1/2 xl:basis-1/3
                h-48 md:h-56 lg:h-[300px]
                rounded-2xl overflow-hidden shadow-lg
              "
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