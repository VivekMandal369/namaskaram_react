import { useEffect, useState } from "react";

const useRestaurantMenu = (id) => {
  const [restaurantMenu, setRestaurantMenu] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {

    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;

    const restaurantData = await fetch(url);
    const restaurantMenu  = await restaurantData.json();
    setRestaurantMenu(restaurantMenu?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards);
  };
  return restaurantMenu;
};

export default useRestaurantMenu;