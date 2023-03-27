

import { url,restrudentList } from "../constents";


const RestrudentCard = ({
    name,
    cuisines,
    totalRatingsString,
    cloudinaryImageId,
    id,
    area,
    locality
  }) => {
    return (
      <div  className="restrurdentCard"  >
        <img className="cardImg" src={url + cloudinaryImageId} />
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h5>{totalRatingsString}</h5>
        <h5>{area }, {locality}</h5>
        {/* <h5>{locality}</h5> */}
      </div>
    );
  };
  export default RestrudentCard;