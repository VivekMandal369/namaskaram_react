import RestaurantCard from "./RestuarantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
// import {data} from '../utils/mockData';

const Body = () => {
  let machedName = [];
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [sortBtnName, setSortBtnName] = useState('Fast Delivery');
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
          <button type="button" className="filters inline-block mt-1 p-2 border"
            onClick={() => {
              machedName = restaurantList.filter((res) => {
                let match = res.info.costForTwo.match(/\d+/);
                let cost = parseInt(match[0], 10);
                return cost < 300;
              });
              setFilteredRestaurant(machedName);
            }}
          >Less than Rs. 300</button>
          <button type="button" className="filters inline-block mt-1 p-2 border"
            onClick={() => {
              machedName = restaurantList.filter((res) => {
                let match = res.info.costForTwo.match(/\d+/);
                let cost = parseInt(match[0], 10);
                return (cost >= 300 && cost <= 600) ;
              });
              setFilteredRestaurant(machedName);
            }}
          >Rs. 300 - Rs. 600</button>
          <button type="button" className="filters inline-block mt-1 p-2 border"
            onClick={() => {
              machedName = restaurantList.filter((res) => {
                return res?.info?.veg === true ;
              });
              setFilteredRestaurant(machedName);
            }}
          >Pure Veg</button>
          <button type="button" name={sortBtnName} className="filters inline-block mt-1 p-2 border"
            onClick={() => {
              sortBtnName == 'Fast Delivery' ? setSortBtnName('Fast Delivery '):setSortBtnName('Fast Delivery');
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
