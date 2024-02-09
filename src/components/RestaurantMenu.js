import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import {productImgPath} from "../utils/constants";
import useRestaurantMenu from "../utils/custom_hooks/useRestaurantMenu";
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

const Recommended = (props) => {
  const {menu} = props;
  // console.log(menu);
  const {name, defaultPrice, description, imageId, category, ratings} = menu?.info;
  const {ratingCountV2} = ratings?.aggregatedRating;
  return (
    <div className="center">
    <div className="upper-layout mt-1 p-2">
      <img className="food-img" src={productImgPath + imageId}></img>
      <h2 className="restaurant-name text-2xl font-bold text-500">{name}</h2>
      <div className="restaurant-name">
        <span className="cardleft rating">⭐ {ratingCountV2 ? ratingCountV2:1}</span>
        <span className="cardright">{category}</span>
      </div>
      <div className="cuisinesprice">
        <span className="cardleft">{description}</span>
        <span className="cardright">₹ {defaultPrice/100}</span>
      </div>
    </div>
    </div>
  )
};

const RestaurantMenu = () => {
  
  const {id} = useParams();
  const restaurantDetails = useRestaurantDetails(id);
  // console.log(restaurantDetails);
  const filteredRestaurantMenu = useRestaurantMenu(id);
  
  return (restaurantDetails === undefined || restaurantDetails.length === 0) ? (<Shimmer />) : (
    <>
      <RestuarantDetail details={restaurantDetails}/>
      <div>
        <h1 className="heading">Menu</h1>
    </div>
      {filteredRestaurantMenu.map(resMenu => (
          // console.log(resMenu?.card?.info?.id)
          // <Recommended key={resMenu.info.id} menu={resMenu} /> 
          <Recommended  key={resMenu?.card?.info?.id} menu={resMenu?.card}/>  
        ))
      }
    </>
  );
};

export default RestaurantMenu;