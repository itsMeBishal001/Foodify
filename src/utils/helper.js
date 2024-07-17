export const filterData = (searchText, restaurantList, activeFilters) => {
  // Check for empty search text and active filters
  if (searchText.length === 0 && activeFilters.length === 0) {
    return restaurantList; // Return unfiltered list if no criteria are specified
  }

  // 1. Search Text Filtering
  const filteredByName = restaurantList.filter((restaurant) =>
    restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // 2. Active Filters Application
  const filteredByFilters = filteredByName.filter((restaurant) => {
    const costForTwo = parseInt(restaurant.info.costForTwo.replace(/[^0-9]/g, ''), 10);

    // Check if the restaurant satisfies all of the active filters
    return activeFilters.every((filter) => {
      switch (filter) {
        case 'fast_delivery':
          return restaurant.info.sla.deliveryTime <= 30;
        case 'new_on_swiggy':
          return restaurant.info.totalRatingsString < 10;
        case 'ratings_4_plus':
          return restaurant.info.avgRating >= 4.0;
        case 'pure_veg':
          return restaurant.info.veg;
        case 'offers':
          return restaurant.info.aggregatedDiscountInfoV3?.header?.includes('%');
        case '300_600':
          return costForTwo >= 300 && costForTwo <= 600;
        case 'less_300':
          return costForTwo < 300;
        default:
          console.warn(`Unknown filter: ${filter}`);
          return false;
      }
    });
  });

  return filteredByFilters;
};
