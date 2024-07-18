import { useState } from 'react';
import RestaurantDish from "./RestaurantDish";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const RestaurantCategory = (category) => {
  const [showDishes, setShowDishes] = useState(false);

  const toggleDishes = () => {
    setShowDishes(!showDishes);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{category?.title}</h1>
      {category?.categories?.map((groupedSubCategory, index) => (
        <div key={index} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold mb-2">
              {groupedSubCategory?.title} ({groupedSubCategory?.itemCards?.length})
            </h2>
            <button onClick={toggleDishes} className="text-blue-600 w-6">
              {showDishes ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          <div className="border-b-2 border-gray-300 mb-4"></div>
          {showDishes && (
            <ul>
              {groupedSubCategory?.itemCards?.map((dish, index) => (
                <li key={index} className="mb-4">
                  <RestaurantDish {...dish?.card?.info} />
                </li>
              ))}
            </ul>)}
        </div>
      ))}
    </div>
  );
};

export default RestaurantCategory;
