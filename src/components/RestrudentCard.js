

import { url,restrudentList } from "../constents";


const RestrudentCard = ({
    name,
    cuisines,
    totalRatingsString,
    cloudinaryImageId,
    id,
  }) => {
    return (
      <div key={id} className="restrurdentCard"  >
        <img className="cardImg" src={url + cloudinaryImageId} />
        <h2>{name}</h2>
        <h5>{cuisines.join(", ")}</h5>
        <h4>{totalRatingsString}</h4>
      </div>
    );
  };
  export default RestrudentCard;