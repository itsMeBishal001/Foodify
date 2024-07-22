import { IMG_CDN_URL } from "../utils/constents";

const FoodItem = ({ name, description, imageId, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between">
      <img src={IMG_CDN_URL + imageId} className="w-24 h-24 object-cover rounded-md" />
      <div>
      <div className="font-bold mt-2">{name}</div>
      <div className="text-gray-500 text-sm">{description}</div>
      <div className="text-green-600 font-bold mt-2">Rupees: {price / 100}</div>

      </div>
    </div>
  );
};

export default FoodItem;
