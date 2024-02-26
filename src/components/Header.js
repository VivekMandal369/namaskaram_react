import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../utils/constants';
import { useState } from 'react';
import useOnlineStatus from '../utils/custom_hooks/useOnlineStatus';
import UserContext from '../utils/UserContext';

const Header = () => {
  const [authBtnName, setAuthBtnName] = useState('Login');
  const {loggedInUser} = useContext(UserContext);
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
      <div className="mx-2 py-8 px-4 flex">
        <div>
          <ul className="flex">
            <li className="mx-2 whitespace-nowrap"><Link to={'/'}>Home</Link></li>
            <li className="mx-2 whitespace-nowrap"><Link to={'about'}>About Us</Link></li>
            <li className="mx-2 whitespace-nowrap"><Link to={'/contact'}>Contact Us</Link></li>
            <li className="mx-2 whitespace-nowrap"><Link to={'/cart'}>Cart</Link></li>
            <li className="mx-2 whitespace-nowrap font-bold">{loggedInUser}</li>
          </ul>
        </div>
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="px-4 mx-4 w-16" style={{color:`${color}`}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          <button name={authBtnName} className="bg-blue-600 px-4" onClick={() => {
            authBtnName == 'Login' ? setAuthBtnName('Logout'):setAuthBtnName('Login');
          }}>{authBtnName}</button>
        </div>
      </div>
    </div>
  );
};

export default Header;