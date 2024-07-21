import React from 'react';
import { FaStar } from 'react-icons/fa';
import { CDN_IMG_URL_RES } from '../config';

const RestaurantInfo = ({ restrudentInfos }) => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">{restrudentInfos?.name}</h1>
      <div className="flex border border-slate-400 rounded-2xl p-4">
        <div className="flex-2 m-5">
          <img
            className="rounded-lg h-40 my-2"
            src={CDN_IMG_URL_RES + restrudentInfos?.cloudinaryImageId}
            alt={restrudentInfos?.name}
          />
        </div>
        <div className="flex items-center space-x-3 p-5">
          <h3 className="text-lg">{restrudentInfos?.areaName}</h3>
          <h3 className="text-lg">{restrudentInfos?.city}</h3>
          <h3 className="text-lg font-medium flex items-center">
            {`${restrudentInfos?.avgRating} (${restrudentInfos?.totalRatingsString})`}
            <FaStar className="text-yellow-500 ml-1" />
          </h3>

          <h3 className="text-lg font-medium">{restrudentInfos?.costForTwoMessage}</h3>
        </div>
      </div>
      <div className="p-4 mt-4">
        <h3 className="text-lg">{restrudentInfos?.sla?.slaString}</h3>
        <h3 className="text-lg">
          {restrudentInfos?.sla?.lastMileTravelString} | ₹{restrudentInfos?.feeDetails?.totalFee / 100} Delivery fee
        </h3>
      </div>
    </div>
  );
};

export default RestaurantInfo;
