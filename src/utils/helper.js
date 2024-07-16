export const filterData = (searchText, restaurantList, activeFilters) => {
  // Check for empty search text and active filters
  if (searchText.length === 0 && activeFilters.length === 0) {
    return restaurantList; // Return unfiltered list if no criteria are specified
  }

  // 1. Search Text Filtering
  const filteredByName = restaurantList.filter((restaurant) =>
    restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // 2. Multi-Filter Application with `some`
  const filteredByFilters = filteredByName.filter((restaurant) => {
    return activeFilters.some((filter) => {
      switch (filter) {
        case 'fast_delivery':
          return restaurant.info.sla.deliveryTime <= 30;
        case 'new_on_swiggy':
          return restaurant.info.newOnSwiggy;
        case 'ratings_4_plus':
          return restaurant.info.rating >= 4.0;
        case 'pure_veg':
          return restaurant.info.pureVeg;
        case 'offers':
          return restaurant.info.hasOffer;
        case '300_600':
          return restaurant.info.price >= 300 && restaurant.info.price <= 600;
        case 'less_300':
          return restaurant.info.price < 300;
        default:
          // Handle unexpected filters
          console.warn(`Unknown filter: ${filter}`);
          return false; // Avoid unexpected behaviors
      }
    });
  });

  // 3. Return Filtered List
  return filteredByFilters;
};
