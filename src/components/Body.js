import RestaurantCard from "./RestuarantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
// import {data} from '../utils/mockData';

const Body = () => {
  let machedName = [];
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
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

  // if(restaurantList.length === 0){
  //   return <Shimmer />;
  // }

  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex items-center">
        <div className="flex items-center">
          <input type="text" class="inline-block mt-1 p-2 w-full border rounded-md"
            // value={}
            onKeyUp={(e) => {
              let newChar = e.target.value.toLowerCase();
              machedName = restaurantList.filter((res) => res.info.name.toLowerCase().includes(newChar));
              setFilteredRestaurant(machedName);
              // console.log(machedName);
              // console.log(e.target.value);
            }}
          />

          <button className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Search
          </button>
      </div>
      {/* <div>
        <button
          type="button"
          className="filter-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            topRatedList = restaurantList.filter((res) => res.info.avgRating > 4.4);
            setFilteredRestaurant(topRatedList);
            console.log(restaurantList);
          }}
          >
          Top Rated
        </button>
      </div> */}
      <div class="w-64">
        {/* <label for="options" class="block text-sm font-medium text-gray-600">Select Rating:</label> */}
        <select id="options" name="options" className="mt-1 block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-blue-300" onChange={(e) => {
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
