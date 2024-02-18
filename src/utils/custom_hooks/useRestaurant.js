import { useEffect, useState } from "react";

/**
  * useRestaurant is a custom hook.
  * @return object list of restuarant.
  */
const useRestaurant = () => {
  const [resList, setResList] = useState([]);

   useEffect(() => {
    fetchRestuarantList(); 
   }, []);

   const fetchRestuarantList = async() => {
    const url = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

    const data = await fetch(url);
    const list = await data.json();
    setResList(list);
  };
  // console.log(resList);
  // return fetchRestuarantList();
  return resList;
};

export default useRestaurant;