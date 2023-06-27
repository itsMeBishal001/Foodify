export function filterData(searchText, restaurants) {
    const filterData = restaurants.filter((restaurant) =>
      restaurant?.data?.name?.toUpperCase().includes(searchText.toUpperCase())
    );
    return searchText === "" ? restaurants : filterData;
  }