import { url, restrudentList } from "../constents";

const RestrudentCard = ({
  name,
  cuisines,
  avgRating,
  cloudinaryImageId,
  deliveryTime,
  costForTwoString,
}) => {
  return (
    <div className="restrurdentCard">
      <img className="cardImg" src={url + cloudinaryImageId} />
      <div className="res-cui">
        <div className="resName">{name}</div>
        <div className="cuisines">{cuisines.join(", ")}</div>
      </div>
<div className="other-info">
      <div class="rating">
        <span className="icon-star">★</span>
        <span>{avgRating}</span>
      </div>
      <div>•</div>
      <div>
        {deliveryTime} MINS 
      </div>
      <div>•</div>
      <div>
        {costForTwoString} 
      </div>

      </div>
      {/* <div>{locality}</div> */}
    </div>
  );
};
export default RestrudentCard;
