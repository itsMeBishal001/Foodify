import RestaurantDish from "./RestaurantDish";

const RestaurantItemCategory = (itemCategory) => {
  return (
    <div>
      <h1 className="dishHeader text-2xl font-bold mb-4">
        {itemCategory?.title} ({itemCategory?.itemCards.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {itemCategory?.itemCards?.map((dish, index) => {
          return (
            <div key={index}>
              <RestaurantDish {...dish?.card?.info} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantItemCategory;
