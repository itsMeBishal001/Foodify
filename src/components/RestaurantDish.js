const RestaurantDish = (dish) => {
    return (
      <>
        <div className="dish_Container">
          <div className="dish_Details">
            <h3 className="dish_SubHeader">{dish.name}</h3>
            <h2>{dish.price ? dish.price / 100 : dish.defaultPrice / 100}</h2>
            <p className="dish_Description">{dish.description}</p>
          </div>
          <div className="dish_ImageContainer">
            {dish.imageId ? (
              <img
                className="dish_Image"
                src={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" + dish.imageId}
              />
            ) : (
              <div>No Image Available</div>
            )}
          </div>
        </div>
        <div className="divider"></div>
      </>
    );
  };
  export default RestaurantDish;