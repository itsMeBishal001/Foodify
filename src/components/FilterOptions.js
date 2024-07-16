import React from 'react';

const FilterOptions = ({ onFilterClick, activeFilters }) => {
  const filters = [
    { name: 'Fast Delivery', value: 'fast_delivery' },
    { name: 'New on Swiggy', value: 'new_on_swiggy' },
    { name: 'Ratings 4.0+', value: 'ratings_4_plus' },
    { name: 'Pure Veg', value: 'pure_veg' },
    { name: 'Offers', value: 'offers' },
    { name: 'Rs. 300–Rs. 600', value: '300_600' },
    { name: 'Less than Rs. 300', value: 'less_300' },
  ];

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`px-3 py-1 rounded-full ${
            activeFilters.includes(filter.value)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } focus:bg-gray-400`}
          onClick={() => onFilterClick(filter.value)}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
};

export default FilterOptions;
