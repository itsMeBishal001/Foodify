import React from 'react';

const FilterOptions = ({ onFilterClick, activeFilters }) => {
  const filters = [
    { name: 'Fast Delivery', value: 'fast_delivery' },
    { name: 'New on Foodify', value: 'new_on_swiggy' },
    { name: 'Ratings 4.0+', value: 'ratings_4_plus' },
    { name: 'Pure Veg', value: 'pure_veg' },
    { name: 'Offers', value: 'offers' },
    { name: 'Rs. 300–Rs. 600', value: '300_600' },
    { name: 'Less than Rs. 300', value: 'less_300' },
  ];

  return (
    <div className='flex justify-center'>
      <div className="flex flex-wrap gap-2 my-4">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`px-4 py-2 rounded-full text-base font-sans ${activeFilters.includes(filter.value)
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } focus:bg-gray-400 transition duration-300 ease-in-out`}
            onClick={() => onFilterClick(filter.value)}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterOptions;
