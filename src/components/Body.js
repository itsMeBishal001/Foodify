import { restrudentList } from "../constents";
import RestrudentCard from "./RestrudentCard";
const Body = () => {
    return (
      <div className="restrudentList" >
        {/* going to add map function rather then writing line by line */}
  
        {
        restrudentList.map((restrunt) => {
         return <RestrudentCard {...restrunt.data }  />
        })
        }
  
       
      </div>
    );
  };
  export default Body;