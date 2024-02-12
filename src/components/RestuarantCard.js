import {productImgPath} from "../utils/constants";
import { Link } from "react-router-dom";

const RestaurantCard = (props) => {
  const {cardData} = props;
 
  const {id, name, cloudinaryImageId, avgRating, sla, cuisines, costForTwo} = cardData?.info;
  const {slaString} = sla;
  const ratingCol = (avgRating > 4) ? 'bg-green-600':'bg-red-400';

  return (
    <div className="rounded-lg m-1 p-4 hover:shadow-lg hover:border-2 text-[18px]">
      <Link to={`restaurant/${id}`}>
      <div className="">
      <img src={productImgPath + cloudinaryImageId} className="object-cover h-64 w-96 rounded-lg"></img>
      </div>
      <h2 className="p-2 font-bold">{name}</h2>
      <div className="flex justify-between">
        <span className={`${ratingCol} py-1 px-2 rounded-lg`}>⭐ {avgRating}</span>
        <span>{slaString}</span>
      </div>
      <div className="grid grid-cols-1 gap-2 ">
        <span className="p-1">{cuisines.join(', ')}</span>
        <span className="p-1">{costForTwo}</span>
      </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;