import { useState } from "react";
import {productImgPath} from "../utils/constants";

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
          <rect x="0" y="0" width="20" height="20" fill="none" stroke={veg} strokeWidth="1"/>
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
  const {menu, accordionAction, accordionStatus} = props;
  const title = menu?.card?.title ? menu?.card?.title : '';
  const items = menu?.card?.itemCards ? menu?.card?.itemCards : '';

  return (title == '' || items == '') ? (<></>) : (
    <div className="w-6/12 m-auto my-4 p-4 rounded-lg shadow-lg border-2 hover:cursor-pointer" onClick={() => accordionAction(title)}>
      <div className="flex justify-between font-bold">
        <span className="text-lg">{title} ({items.length})</span>
        <button>
          {
            (accordionStatus.title == title && accordionStatus.isOpen) ? 
            (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <polyline points="6 15 12 9 18 15" />
            </svg>) : 
            (<svg className="h-8 w-8 text-gray-600"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 9 12 15 18 9" /></svg>)
          }
        </button>
      </div>
      {
        (accordionStatus.title == title && accordionStatus.isOpen) && 
        <>
          {items.map(item => (
            <MenuItems key={item?.card?.info?.id} data={item?.card?.info} />
            ))
          }
        </>
      }
    </div>
  )
};

export default Menu;