import React from "react";

const DealsSection = () => {
  const baseCircle =
    "h-24 w-24 rounded-full flex flex-col items-center justify-center text-center transition-all duration-200 hover:scale-105";

  return (
    <div className="w-full py-12">
      <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-8 text-center">

        {/* Skincare Section */}
        <div className="flex flex-col items-center gap-4 text-gray-800">
          <h2 className="text-lg md:text-xl font-bold mb-6">
            Get your skincare products
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className={`${baseCircle} bg-pink-300`}>
              <span className="text-xs">Under Rs.</span>
              <p className="text-2xl font-bold">600</p>
            </div>
            <div className={`${baseCircle} bg-pink-300`}>
              <span className="text-xs">Under Rs.</span>
              <p className="text-2xl font-bold">1200</p>
            </div>
            <div className={`${baseCircle} bg-pink-300`}>
              <span className="text-xs">Under Rs.</span>
              <p className="text-2xl font-bold">2000</p>
            </div>
          </div>
        </div>

        {/* Haircare Section */}
        <div className="flex flex-col items-center gap-4 text-gray-800">
          <h2 className="text-lg md:text-xl font-bold mb-6">
            Get your haircare products
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className={`${baseCircle} bg-blue-200`}>
              <span className="text-xs">Under Rs.</span>
              <p className="text-2xl font-bold">400</p>
            </div>
            <div className={`${baseCircle} bg-blue-200`}>
              <span className="text-xs">Under Rs.</span>
              <p className="text-2xl font-bold">900</p>
            </div>
            <div className={`${baseCircle} bg-blue-200`}>
              <span className="text-xs">Under Rs.</span>
              <p className="text-2xl font-bold">1000</p>
            </div>
          </div>
        </div>

        {/* Makeup Section */}
        <div className="flex flex-col items-center gap-4 text-gray-800">
          <h2 className="text-lg md:text-xl font-bold mb-6">
            Get your makeup products
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className={`${baseCircle} bg-purple-300`}>
              <span className="text-xs">Under Rs.</span>
              <p className="text-2xl font-bold">400</p>
            </div>
            <div className={`${baseCircle} bg-purple-300`}>
              <span className="text-xs">Under Rs.</span>
              <p className="text-2xl font-bold">900</p>
            </div>
            <div className={`${baseCircle} bg-purple-300`}>
              <span className="text-xs">Under Rs.</span>
              <p className="text-2xl font-bold">1000</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DealsSection;
