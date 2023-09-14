import React from "react";
import ReactDOM from "react-dom/client";

/*
* Header
* - Logo
* - Nav Items
* Body
* - Search
* - Restaurant Container
*   - Restaurant Card
*     - Restaurant Name, Rating
*     - Dish Name, Price
*     - Time
* Footer
* - Copyright
* - Links 
* - Address
* - Contact
*/

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img 
          className="logo"
          src="https://www.clipartmax.com/png/small/112-1129793_healthy-food-logo-png.png"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  )
};

const RestaurantCard = () => {
  return (
    <div>
      <h2 className="restaurant-name">Restaurant Name</h2>
      <div className="rating">Rating</div>
    </div>
    // <div>
    //   <p className="dish-name">Dish Name</p>
    // </div>
  )
};

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search </div>
      <div className="restaurant-container">
        <RestaurantCard />
      </div>
    </div>
  )
};

const AppLayout = () => {
  return <div className="App">
    <Header />
    <Body />
  </div>
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<AppLayout />);

