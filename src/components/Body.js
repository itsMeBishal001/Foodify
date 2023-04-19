import { useState, useEffect } from "react";
import { restrudentList } from "../constents";
import RestrudentCard from "./RestrudentCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";

function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.data?.name?.toUpperCase().includes(searchText.toUpperCase())
  );
  return searchText === "" ? restaurants : filterData;
}

const Body = () => {
  // const [restaurants, setRestaurants] = useState(restrudentList);
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // empty dependency array => once after render
  // dep arry [searchText] => once after initial render + everytime after redern (my searchText changes)
  useEffect(() => {
    //API call
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://cors-anywhere-axpo.onrender.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.3192377&lng=84.7921049&page_type=DESKTOP_WEB_LISTING"
      // "https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.5623046&lng=87.3512913&page_type=DESKTOP_WEB_LISTING"
      // https://cors-anywhere-axpo.onrender.com/
    );
    const json = await data.json();

    // Optional Chaining
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }
// const isOnline = useOnline();

  // if (!isOnline) {
  //   return <h1>🔴 Offline, please check your internet connection!!</h1>;
  // }

  // not render component (Early return)
  if (!allRestaurants) return null;

  // if (filteredRestaurants?.length === 0)
  // return <h1>No Restraunt match your Filter!!</h1>;

  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="search-btn"
          // onClick={()=>{
          //   isClicked==="true"?setIsClicked("false"):setIsClicked("true");
          // }}   ==> just practice useState hook

          onClick={() => {
            //need to filter the data
            const data = filterData(searchText, allRestaurants);
            // update the state - restaurants
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
      <div className="restrudentList">
        {/* going to add map function rather then writing line by line */}

        {filteredRestaurants.length === 0 ? (
          <h1>No Restraunt match your Filter!!</h1>
        ) : (
          filteredRestaurants.map((restaurant) => {
            return (
              <Link
              to={"/restrudentmenu/" + restaurant.data.id}
              key={restaurant.data.id}
            >
              <RestrudentCard {...restaurant.data} />
            </Link>


              // <RestrudentCard {...restaurant.data} key={restaurant.data.id} />
            );
          })
        )}
      </div>
    </>
  );
};
export default Body;
