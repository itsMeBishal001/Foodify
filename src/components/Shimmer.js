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
    {/* <div className="bg-orange-400 rounded-md p-1 mx-4 text-white w-20 h-10 animate-pulse"></div> */}
  </div>
);

export const ShimmerFilterOptions = ({ className }) => (
  <div className={`flex justify-around mt-4 w-3/4 ${className}`}>
    {Array(5).fill('').map((_, index) => (
      <div key={index} className="bg-gray-300 rounded-md py-2 px-4 w-24 h-10 animate-pulse"></div>
    ))}
  </div>
);

const Shimmer = ({ count = 15, className }) => {
  return (
    <div className={`flex items-center flex-col pt-20 ${className}`}>
      <ShimmerSearchBar />
      <ShimmerFilterOptions />
      <div className="flex flex-wrap justify-around w-3/4">
        {Array(count)
          .fill('')
          .map((_, index) => (
            <Card key={index} />
          ))}
      </div>
    </div>
  );
};

export default Shimmer;
