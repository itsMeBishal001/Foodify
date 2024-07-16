import React from 'react';

export const Card = () => (
  <div className="flex-grow pt-20 bg-white rounded-lg p-4 mb-4 w-64 mx-2">
    <div className="w-50 h-40 rounded bg-gray-300 animate-pulse"></div>
    <div>
      <div className="bg-gray-300 h-6 rounded mt-2 animate-pulse"></div>
      <div className="bg-gray-300 h-4 rounded mt-2 animate-pulse"></div>
    </div>
  </div>
);


const Shimmer = ({ count = 15 }) => {
  return (
    <div className="restrudentList flex flex-wrap pt-20">
      {Array(count)
        .fill('')
        .map(() => ( 
          <Card key={Math.random()} /> 
        ))}
    </div>
  );
};

export default Shimmer;
