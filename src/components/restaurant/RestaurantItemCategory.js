import { useState } from 'react';
import RestaurantDish from './RestaurantDish';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const RestaurantItemCategory = ( itemCategory ) => {
  const [showDishes, setShowDishes] = useState(true);

  const toggleDishes = () => {
    setShowDishes(!showDishes);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-primary">
          {itemCategory?.title} ({itemCategory?.itemCards.length})
        </h1>
        <button onClick={toggleDishes} className="text-secondary w-6">
          {showDishes ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {showDishes && (
        <div className="grid grid-cols-1 gap-4">
          {itemCategory?.itemCards?.map((dish, index) => (
            <div key={index}>
              <RestaurantDish {...dish?.card?.info} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantItemCategory;
