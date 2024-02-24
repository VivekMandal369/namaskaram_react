import { useState, useEffect } from "react";

const  useRestaurantDetails = (id) => {
  const [restuarantDetail, setRestaurantDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async() => {
    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;
    
    const resDetails = await fetch(url);
    const details = await resDetails.json();

    setRestaurantDetails(details?.data);
  };
  return restuarantDetail;
};

export default useRestaurantDetails;