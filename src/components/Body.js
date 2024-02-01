import RestaurantCard from "./RestuarantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
// import {data} from '../utils/mockData';

const Body = () => {
  let machedName = [];
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [sortBtnName, setSortBtnName] = useState('Fast Delivery');
  const [costRangeBtn, setCostRangeBtn] = useState('Rs. 300 - Rs. 600');
  const [foodType, setFoodType] = useState('Pure Veg');
  const [costLimit, setCostLimit] = useState('Less than Rs. 300');
  const [btnStatusCr, setBtnStatusCr] = useState('deactive');
  const [btnStatusPv, setBtnStatusPv] = useState('deactive');
  const [btnStatusFd, setBtnStatusFd] = useState('deactive');
  const [btnStatusCl, setBtnStatusCl] = useState('deactive');
  const [search, setSearch] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    // console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    setRestaurantList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const sortByTime = () => {
    // let sortedListByTime = restaurantList;
    let sortedListByTime = [...restaurantList];
    sortedListByTime.sort((a,b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime)
    setFilteredRestaurant(sortedListByTime);
    // setFilteredRestaurant([].concat(sortedListByTime));
  };

  const unSort = () => {
    setFilteredRestaurant([...restaurantList]);
    // setFilteredRestaurant([].concat(restaurantList));
  }

  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="heading">
        <h1>Restaurants with online food delivery</h1>
      </div>
      <div className="filter flex items-center">
        <div className="flex items-center">
          <input type="text" className="filters inline-block mt-1 p-2 border"
            placeholder="Search food by name"
            onKeyUp={(e) => {
              let newChar = e.target.value.toLowerCase();
              machedName = restaurantList.filter((res) => res.info.name.toLowerCase().includes(newChar));
              setFilteredRestaurant(machedName);
            }}
          />
          <select id="options" name="options" className="filters mt-1 p-2 bg-white" onChange={(e) => {
            topRatedList = restaurantList.filter((res) => res.info.avgRating > e.target.value);
            setFilteredRestaurant(topRatedList);
          }}>
              <option value="">Filter By Ratings</option>
              <option value="5">5</option>
              <option value="4.5">4.5</option>
              <option value="4.2">4.2</option>
              <option value="4">4</option>
              <option value="3.5">3.5</option>
              <option value="3">3</option>
          </select>
          <button type="button" name={costLimit} id={btnStatusCl} className="filters inline-block mt-1 p-2 border"
            onClick={() => {

              costLimit == 'Less than Rs. 300' ? setCostLimit('Less than Rs. 300 X'):setCostLimit('Less than Rs. 300');
              btnStatusCl  == 'deactive' ? setBtnStatusCl("cl-active"):setBtnStatusCl("deactive");

              
              if(costLimit == 'Less than Rs. 300') {
                machedName = restaurantList.filter((res) => {
                  let match = res.info.costForTwo.match(/\d+/);
                  let cost = parseInt(match[0], 10);
                  return cost < 300;
                });
                setFilteredRestaurant(machedName);
              } else {
                unSort();
              }

            }}
          >{costLimit}</button>
          <button type="button" name={costRangeBtn} id={btnStatusCr} className="filters inline-block mt-1 p-2 border"
            onClick={() => {

              costRangeBtn == 'Rs. 300 - Rs. 600' ? setCostRangeBtn('Rs. 300 - Rs. 600 X'):setCostRangeBtn('Rs. 300 - Rs. 600');
              btnStatusCr  == 'deactive' ? setBtnStatusCr("cr-active"):setBtnStatusCr("deactive");

              
              if(costRangeBtn == 'Rs. 300 - Rs. 600') {
                machedName = restaurantList.filter((res) => {
                  let match = res.info.costForTwo.match(/\d+/);
                  let cost = parseInt(match[0], 10);
                  return (cost >= 300 && cost <= 600) ;
                });
                setFilteredRestaurant(machedName);
              } else {
                unSort();
              }

            }}
          >{costRangeBtn}</button>
          <button type="button" name={foodType} id={btnStatusPv} className="filters inline-block mt-1 p-2 border"
            onClick={() => {

              foodType == 'Pure Veg' ? setFoodType('Pure Veg X'):setFoodType('Pure Veg');
              btnStatusPv  == 'deactive' ? setBtnStatusPv("pv-active"):setBtnStatusPv("deactive");
              if(foodType == 'Pure Veg') {
                machedName = restaurantList.filter((res) => {
                  return res?.info?.veg === true ;
                });
                setFilteredRestaurant(machedName);
              } else {
                unSort();
              }

            }}
          >{foodType}</button>
          <button type="button" name={sortBtnName} id={btnStatusFd} className="filters inline-block mt-1 p-2 border"
            onClick={() => {
              sortBtnName == 'Fast Delivery' ? setSortBtnName('Fast Delivery X'):setSortBtnName('Fast Delivery');
              btnStatusFd  == 'deactive' ? setBtnStatusFd("fd-active"):setBtnStatusFd("deactive");
              if(sortBtnName == 'Fast Delivery') {
                  sortByTime();
                } else {
                  // fetchData();
                  unSort();
                }
              }}
          >{sortBtnName}</button>
        </div>
      </div>
      <div className="restaurant-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} cardData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
