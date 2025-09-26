import React from "react";

const SearchSection = () => {
  return (
    <section className="w-full  mb-4 flex flex-col items-center justify-center py-20 px-4  bg-gradient-to-b from-pink-50/50">
      <div className="w-full max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl  md:text-4xl font-semibold text-gray-700">
          What are you looking for?
        </h2>

        {/* Search Box */}
        <div className="mt-6 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="relative flex items-center w-full h-14 rounded-full bg-white overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="grid place-items-center h-full w-14 text-gray-400 hover:text-pink-500 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-base text-gray-700 px-4 transition-all duration-300 placeholder:text-gray-400 focus:placeholder:text-gray-300"
              type="text"
              id="search"
              placeholder="Search for Clothes..."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
