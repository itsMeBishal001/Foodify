import React from 'react';
import { url } from "../../utils/constents";
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
  const offerText = Object.values(aggregatedDiscountInfoV3 || {}).join(' ')

  return (
    <div className="p-4 flex flex-col space-y-2">
      {promoted && (
        <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded font-bold inline-block">
          Promoted
        </span>
      )}
      <div className="relative  w-full h-48 rounded-lg object-cover">
        <img
          className="w-full h-full object-cover rounded-lg "
          src={url + cloudinaryImageId}
          alt={name}
        />
        <div className="absolute bottom-0 right-0 p-2 text-white  font-bold shadow-lg bg-custom-gradient w-full whitespace-nowrap overflow-hidden overflow-ellipsis rounded-lg">
          {offerText.slice(0, 12)}
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <h3 className="text-xl font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">{name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">

            <div className="flex items-center">
              <svg
                className="w-5 h-5 fill-current text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 1L12.39 6.36L18.18 7.27L13.96 11.18L15.09 16.14L10 13.77L4.91 16.14L6.04 11.18L1.82 7.27L7.61 6.36L10 1Z" />
              </svg>
              <p className="text-gray-700 font-bold ml-1">{avgRating}</p>
            </div>

            <div className="flex items-center space-x-2">
              <img
                className="w-6 h-6 object-cover rounded-full"
                alt="delivery-boi-image"
                src="https://icon-library.com/images/food-delivery-icon/food-delivery-icon-9.jpg"
              />
              <div className="text-gray-500 text-sm font-bold">{sla?.slaString}</div>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
          {cuisines.join(", ")}
        </p>
        <p className="text-gray-500 text-sm">{areaName}</p>
      </div>
    </div>
  );
};

export default RestrudentCard;
