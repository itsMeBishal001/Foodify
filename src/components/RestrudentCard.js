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
    <div className="restrurdentCard bg-white rounded-lg shadow-md p-4">
      <img className="cardImg object-cover h-40 w-full rounded" src={url + cloudinaryImageId} alt={name} />
      <div className="res-cui mt-4">
        <div className="resName text-lg font-bold">{name}</div>
        <div className="cuisines text-gray-600">{cuisines.join(", ")}</div>
      </div>
      <div className="other-info mt-4 flex items-center text-gray-600">
        <div className="rating flex items-center">
          <span className="icon-star text-yellow-500">★</span>
          <span className="ml-1">{avgRating}</span>
        </div>
        <div className="mx-2">•</div>
        <div>{deliveryTime} MINS</div>
        <div className="mx-2">•</div>
        <div>{costForTwoString}</div>
      </div>
    </div>
  );
};

export default RestrudentCard;
