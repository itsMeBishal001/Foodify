import { url, restrudentList } from "../constents";

const RestrudentCard = ({
  name,
  cuisines,
  avgRating,
  cloudinaryImageId,
  areaName,
  costForTwo,
  totalRatingsString,
  sla,
  promoted,
  aggregatedDiscountInfoV3,
}) => {
  // console.log(aggregatedDiscountInfoV3);
  return (
    <div className="h-fit rounded overflow-hidden bg-white shadow-lg">
      {/* Promoted label for restaurants */}
      {promoted && (
        <h1 className="bg-blue-400 text-white px-2 py-1 rounded inline-block ">
          Promoted
        </h1>
      )}
      {/* Normal Cards */}
      <img
        className="object-cover w-96 h-36 rounded-lg relative overflow-hidden"
        src={url + cloudinaryImageId}
        alt={name}
      />
      {/* <div className="absolute inset-0 rounded-lg overflow-hidden shadow-inner"></div> */}

      <div className="">
        <div className="resName text-lg font-bold">{name}</div>
        <div className="text-gray-700 text-sm mb-2 line-clamp-1">
          {cuisines.join(", ")}
        </div>
        <p className="text-gray-700 text-sm mb-2">{areaName}</p>
        <div className="pt-2 font-medium">{costForTwo ?? "₹200 for two"}</div>
      </div>
      <div className="other-info mt-4 flex items-center text-gray-600">
        <div className="rating flex items-center">
          {
            <div
              className={`${
                avgRating > 3.9 ? "bg-green-600" : "bg-orange-500"
              } inline-flex items-center rounded p-1`}
            >
              <svg
                className="w-4 h-4 fill-current text-white mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 1L12.39 6.36L18.18 7.27L13.96 11.18L15.09 16.14L10 13.77L4.91 16.14L6.04 11.18L1.82 7.27L7.61 6.36L10 1Z" />
              </svg>
              <p className="text-white text-sm font-bold">{avgRating}</p>
            </div>
          }
          <span className="ml-2 text-sm font-thin">
            {totalRatingsString} ratings
          </span>
        </div>

        <img
          className=" ml-2 h-7"
          alt="delivery-boi-image"
          src="https://icon-library.com/images/food-delivery-icon/food-delivery-icon-9.jpg"
        />
        <div className="mx-2 ">{sla?.slaString} </div>
      </div>
    </div>
  );
};

export default RestrudentCard;
