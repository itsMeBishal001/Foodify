import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchText, setSearchText, filterRestaurant, isFiltering }) => {
  return (
    <div className="flex items-center justify-center py-4 m-1">
      <div className="relative w-80">
        <input
          className="border border-gray-300 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 font-sans"
          type="text"
          placeholder="Search for restaurants and food"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          aria-label="Search input"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center bg-secondary p-2 mx-4 rounded-md text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-all duration-200 font-sans"
        onClick={() => filterRestaurant()}
        disabled={isFiltering}
        aria-label="Search button"
      >
        {isFiltering ? (
          <span className="loader" />
        ) : (
          <>
            <FiSearch className="mr-2" />
            Search
          </>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
