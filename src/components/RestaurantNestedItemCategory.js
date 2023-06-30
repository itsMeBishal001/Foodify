import RestaurantDish from "./RestaurantDish";

const RestaurantCategory = (category) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{category?.title}</h1>
      {category?.categories?.map((groupedSubCategory, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-bold mb-2">
            {groupedSubCategory?.title} ({groupedSubCategory?.itemCards?.length})
          </h2>
          <div className="border-b-2 border-gray-300 mb-4"></div>
          <ul>
            {groupedSubCategory?.itemCards?.map((dish, index) => (
              <li key={index} className="mb-4">
                <RestaurantDish {...dish?.card?.info} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RestaurantCategory;
