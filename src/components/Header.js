import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../utils/constants';
import { useState } from 'react';
import useOnlineStatus from '../utils/custom_hooks/useOnlineStatus';
import UserContext from '../utils/UserContext';

const Header = () => {
  const [authBtnName, setAuthBtnName] = useState('Login');
  const {loggedInUser, avatar} = useContext(UserContext);
  const color = useOnlineStatus() ? 'green':'red';
  return (
    <div className="flex justify-between bg-white shadow-md sticky top-0 z-20">
      <div className="mx-2 px-4">
        <Link to={'/'}>
          <img 
            className="w-24"
            src={logo}
          />
        </Link>
      </div>
      <div className="mx-4 py-6 px-4 flex items-center">
        <div>
          <ul className="flex">
            <li className="mx-2 whitespace-nowrap"><Link to={'/'}>Home</Link></li>
            <li className="mx-2 whitespace-nowrap"><Link to={'about'}>About Us</Link></li>
            <li className="mx-2 whitespace-nowrap"><Link to={'/contact'}>Contact Us</Link></li>
            <li className="mx-2 whitespace-nowrap"><Link to={'/cart'}>Cart</Link></li>
            <li className="mx-2 whitespace-nowrap font-bold">{loggedInUser}</li>
          </ul>
        </div>
        <div className='flex mx-4'>
          <div style={{ position: "relative" }}>
            <img className="w-10 rounded-full" src={avatar} alt="avatar" />
            <svg
              className="absolute -bottom-1 -left-1 w-5 h-5"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="7" fill={color} />
            </svg>
          </div>
        </div>
        <button name={authBtnName} className="bg-blue-600 py-2 px-4 mx-4" onClick={() => {
          authBtnName == 'Login' ? setAuthBtnName('Logout'):setAuthBtnName('Login');
        }}>{authBtnName}</button>
      </div>
    </div>
  );
};

export default Header;