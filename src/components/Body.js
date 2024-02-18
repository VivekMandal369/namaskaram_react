import RestaurantCard, { RestaurantCardWithRating }from "./RestuarantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import OnMind from "./OnMind";
import useRestaurant from "../utils/custom_hooks/useRestaurant";
// import {data} from '../utils/mockData';

const Body = () => {
  let machedName = [];
  
  const Restaurants = useRestaurant([]);
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
  const [onMind, setOnMind] = useState([]);
  const [heading, setHeading] = useState([]);

  useEffect(() => {
    const keys = Object.keys(Restaurants);
    
    if (keys.length > 0) {
      setRestaurantList(
        Restaurants?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      setFilteredRestaurant(
        Restaurants?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
    
      setOnMind(Restaurants?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info);
      setHeading(Restaurants?.data?.cards[0]?.card?.card?.header?.title)
    }
  }, [Restaurants]);

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

  const TopRatedRestaurant = RestaurantCardWithRating(RestaurantCard);

  const btnStatusCrCol = btnStatusCr == 'deactive' ? '' : 'bg-gray-200';
  const btnStatusPvCol = btnStatusPv == 'deactive' ? '' : 'bg-gray-200';
  const btnStatusFdCol = btnStatusFd == 'deactive' ? '' : 'bg-gray-200';
  const btnStatusClCol = btnStatusCl == 'deactive' ? '' : 'bg-gray-200';

  /////////////// scroll ///////////////
  
  const scroll = (name) => {
    const distance = name === 'scrollForward' ? '400':'-400';
    const container = document.getElementById('scrollContainer');
    container.scrollBy({
      left: distance, // Adjust as needed for scroll distance
      behavior: 'smooth'
    });
  };

  /////////////// scroll ///////////////

  return restaurantList.length ===  0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="p-4 m-2 flex justify-between">
        <div className="text-[30px] font-bold">{heading}</div>
        <div className="">
          <button name="scrollBackward" className="p-2 text-[18px] font-bold m-2 rounded-full shadow-lg border-2" onClick={() => scroll('scrollBackward')}>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 text-[18px] font-bold m-2 rounded-full shadow-lg border-2" onClick={() => scroll('scrollForward')}>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4 m-2">
        <div id="scrollContainer" className="overflow-x-auto flex scroll-hide">
          {
            onMind.map(ele => (
              <OnMind key={ele.id} data={ele} />
            ))
          }
        </div>
      </div>
     <div className="p-4 m-2">
        <h1 className="text-[30px] font-bold">Restaurants with online food delivery</h1>
      </div>
      <div className="flex p-4 m-4">
        <div className="flex items-center">
          <input type="text" className="shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200"
            placeholder="Search food by name"
            onKeyUp={(e) => {
              let newChar = e.target.value.toLowerCase();
              machedName = restaurantList.filter((res) => res.info.name.toLowerCase().includes(newChar));
              setFilteredRestaurant(machedName);
            }}
          />
          <select id="options" name="options" className="shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200" onChange={(e) => {
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
          <button type="button" name={costLimit} className={`${btnStatusClCol} shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200`}
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
          <button type="button" name={costRangeBtn} className={`${btnStatusCrCol} shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200`}
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
          <button type="button" name={foodType} className={`${btnStatusPvCol} shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200`}
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
          <button type="button" name={sortBtnName} className={`${btnStatusFdCol} shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200`}
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
      <div className="grid grid-cols-5 gap-2 px-4">
        {/* {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} cardData={restaurant} />
        ))} */}

        {filteredRestaurant.map((restaurant) => (
          (restaurant.info.totalRatingsString.includes('K') && restaurant.info.totalRatingsString.slice(0, -2)) > 5 ?
           (<TopRatedRestaurant key={restaurant.info.id} cardData={restaurant} />):
           (<RestaurantCard key={restaurant.info.id} cardData={restaurant} />)
        ))}
      </div>
    </div>
  );
};

export default Body;
