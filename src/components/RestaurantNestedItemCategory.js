import RestaurantDish from "./RestaurantDish";
const RestaurantCategory = (category) => {
    return (
      <div>
        <h1 className="nested_item_header">{category?.title}</h1>
        {category?.categories?.map((groupedSubCategory, index) => (
          <div key={index}>
            <h2 className="nested_item_subheader">
              {groupedSubCategory?.title}({groupedSubCategory?.itemCards?.length})
            </h2>
            <div className="divider nested_item_subheader_divider"></div>
            <ol>
              {groupedSubCategory?.itemCards?.map((dish, index) => (
                <div key={index}>
                  <RestaurantDish {...dish?.card?.info} />
                  {/* <p>{dish?.card?.info?.description}</p> */}
                </div>
              ))}
            </ol>
          </div>
        ))}
      </div>
    );
  };
  export default RestaurantCategory;