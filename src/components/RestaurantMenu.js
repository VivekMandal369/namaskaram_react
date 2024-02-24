import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import {productImgPath} from "../utils/constants";
import useRestaurantDetails from "../utils/custom_hooks/useRestaurantDetails";


const RestuarantDetail = (props) => {
  const {details} = props;
  const {id, name, areaName, costForTwoMessage, cuisines, avgRating} = details;
  return (
    <div>
      <div>
        <h1 className="heading">Restaurant Details</h1>
      </div>
      <div className="upper-layout">
        <h1>{id}</h1>
        <h2>{name}</h2>
        <p>{areaName}</p>
        <p>{costForTwoMessage}</p>
        <p>{cuisines.join()}</p>
        <p>{avgRating}</p>
      </div>
    </div>
  )
};

const MenuItems = (props) => {
  const {data} = props;
  const {price, name, defaultPrice, offerTags, imageId, isVeg, category} = data;
  const finalPrice = price ? price: defaultPrice;
  const veg = isVeg ? 'green':'red';
  const offer = offerTags ? `${offerTags[0].title} | ${offerTags[0].subTitle}` : '';
  return (
    <div className="flex py-6 justify-between border-b-2 border-gray-200">
      <div className="grid">
        <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="5" fill={veg} />
          <rect x="0" y="0" width="20" height="20" fill="none" stroke={veg} stroke-width="1"/>
        </svg>
        <span>{name}</span>
        <div className="flex items-center">
          <span>₹{finalPrice/100}</span>
          <span className="text-sm mx-2 px-2 rounded-lg border-red-500 border-l-4 bg-red-300">{offer}</span>
        </div>
      </div>
      <img src={productImgPath + imageId} alt="img" className="w-24"></img>
    </div>
  );
};

const Menu = (props) => {
  const {menu} = props;
  // console.log(menu);
  const title = menu?.card?.title ? menu?.card?.title : '';
  const items = menu?.card?.itemCards ? menu?.card?.itemCards : '';
  console.log(items);
  return (title == '' || items == '') ? (<></>) : (
    <div className="w-6/12 m-auto my-4 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between font-bold">
        <span className="text-lg">{title} ({items.length})</span>
        <span>
          <svg className="h-8 w-8 text-gray-600"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 9 12 15 18 9" /></svg>
        </span>
      </div>
      {
        items.map(item => (
          <MenuItems key={item?.card?.info?.id} data={item?.card?.info} />
        ))
      }
    </div>
  )
};

const RestaurantMenu = () => {
  
  const {id} = useParams();
  const RestaurantDetails = useRestaurantDetails(id);
  const [filteredRestaurantMenu, setFilteredRestaurantMenu] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState([]);

  useEffect(() => {
    const keys = Object.keys(RestaurantDetails);
    
    if(keys.length > 0) {
      setRestaurantDetails(RestaurantDetails?.cards[2]?.card?.card?.info);
      setFilteredRestaurantMenu(RestaurantDetails?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
    }
    
  }, [RestaurantDetails]);
  
  // console.log(filteredRestaurantMenu);
  return restaurantDetails.length === 0 ? (<Shimmer />) : (
    <>
      <RestuarantDetail details={restaurantDetails}/>
      {/* <div>
        <h1 className="heading">Menu</h1>
    </div> */}
      {filteredRestaurantMenu.map(resMenu => (
          <Menu  key={resMenu?.card?.card?.title} menu={resMenu?.card}/>  
        ))
      }
    </>
  );
};

export default RestaurantMenu;