import { useState } from "react";
import { restrudentList } from "../constents";
import RestrudentCard from "./RestrudentCard";
function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
     restaurant.data.name.includes(searchText)
   );
   return  searchText===""?restrudentList:filterData;
}
const Body = () => {

 
  //const txt="kfc"; => normal variable
  //hooks==> useState hooks ==>makes a variable 2 way binding
  //returns an array [variable name,set the value]=useState("here you can put your default value")
  const [restaurants, setRestaurants] = useState(restrudentList);
  const [searchText, setSearchText] = useState("");
  // const [isClicked,setIsClicked]=useState("false"); ==> just practice useState hook



    return (
      <>
      <div className="search-container">
        <input
        className="search-input"
        type="text"
        placeholder="search"
        value={searchText}
        onChange={(e)=>
          setSearchText(e.target.value)
        }
        />
        <button
        className="search-btn"
        // onClick={()=>{
        //   isClicked==="true"?setIsClicked("false"):setIsClicked("true");
        // }}   ==> just practice useState hook

        onClick={() => {
                      //need to filter the data
                      const data = filterData(searchText, restaurants);
                      // update the state - restaurants
                      setRestaurants(data);
                    }}
        >Search</button>
        {/* <h1>{isClicked}</h1> */}
      </div>
      <div className="restrudentList" >
        {/* going to add map function rather then writing line by line */}
  
        {
      restaurants.map((restrunt) => {
         return <RestrudentCard {...restrunt.data }  />
        })
        }
  
       
      </div>
      </>
    );
  };
  export default Body;