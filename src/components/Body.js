import { useState, useEffect } from "react";
import { restrudentList } from "../constents";
import RestrudentCard from "./RestrudentCard";
import Shimmer from "./Shimmer";

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
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.5408357&lng=87.3406605&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    // Optional Chaining
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }
  console.log("render");
  // not render component (Early return)
  if (!allRestaurants) return null;

  // if (filteredRestaurants?.length === 0)
    // return <h1>No Restraunt match your Filter!!</h1>;


  return allRestaurants.length===0?<Shimmer/>:(
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
        
        {(filteredRestaurants.length === 0)?<h1>No Restraunt match your Filter!!</h1>:
        filteredRestaurants.map((restaurant) => {
          return (<RestrudentCard {...restaurant.data} key={restaurant.data.id} />);
        })}
      </div>
    </>
  );
};
export default Body;
