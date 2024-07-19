import React from 'react';

export const Card = ({ className }) => (
  <div className={`flex-grow  bg-white rounded-lg p-4 mb-4 w-64 mx-2 ${className}`}>
    <div className="w-50 h-40 rounded bg-gray-300 animate-pulse"></div>
    <div>
      <div className="bg-gray-300 h-6 rounded mt-2 animate-pulse"></div>
      <div className="bg-gray-300 h-4 rounded mt-2 animate-pulse"></div>
    </div>
  </div>
);

export const ShimmerSearchBar = ({ className }) => (
  <div className={`flex items-center justify-center py-4 m-1 w-3/4 ${className}`}>
    <div className="border border-gray-300 rounded-full py-2 px-5 mr-2 w-1/3 h-10 bg-gray-300 animate-pulse"></div>
  </div>
);

export const ShimmerFilterOptions = ({ className }) => (
  <div className="flex flex-wrap gap-2 my-4 animate-pulse">
    {Array(7).fill().map((_, index) => (
      <div
        key={index}
        className="px-3 py-1 rounded-full bg-gray-300 w-24 h-8"
      ></div>
    ))}
  </div>
);

export const ShimmerRestrudentCard = () => {
  return (
    <div className="p-4 flex flex-col space-y-2 animate-pulse">
      <div className="relative w-full h-48 bg-gray-300 rounded-lg"></div>
      <div className="flex flex-col space-y-1">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
              <div className="h-6 bg-gray-300 rounded w-12"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};
export const ShimmerDish = () => {
  return (
    <div className="dish-container flex items-center justify-between bg-gray-50 p-5 border-b border-gray-400 animate-pulse">
      <div className="dish-details flex-grow mr-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-16 bg-gray-300 rounded w-full"></div>
      </div>
      <div className="relative flex items-center flex-shrink-0 mb-3">
        <div className="relative">
          <div className="h-32 w-32 bg-gray-300 rounded-xl"></div>
          <div className="h-10 w-24 bg-gray-300 rounded mt-2 absolute -bottom-5 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export const ShimmerRestaurantInfo = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="flex border border-slate-400 rounded-2xl p-4">
        <div className="flex-2 m-5">
          <div className="rounded-lg bg-gray-300 h-40 w-40 my-2"></div>
        </div>
        <div className="flex flex-col items-start space-y-3 p-5">
          <div className="bg-gray-300 h-6 rounded w-40"></div>
          <div className="bg-gray-300 h-6 rounded w-32"></div>
          <div className="bg-gray-300 h-6 rounded w-48"></div>
          <div className="bg-gray-300 h-6 rounded w-28"></div>
        </div>
      </div>
      <div className="p-4 mt-4 space-y-3">
        <div className="bg-gray-300 h-6 rounded w-1/2"></div>
        <div className="bg-gray-300 h-6 rounded w-3/4"></div>
      </div>
    </div>
  );
};

const Shimmer = ({ count = 15, className }) => {
  return (
    <div className={`flex items-center flex-col pt-20 ${className}`}>
      <ShimmerSearchBar />
      <ShimmerFilterOptions />
      <div className="flex flex-wrap justify-around w-3/4">
        {Array(count)
          .fill('')
          .map((_, index) => (
            <ShimmerRestrudentCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default Shimmer;
