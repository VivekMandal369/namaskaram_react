import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../utils/constants';
import { useState } from 'react';

const Header = () => {
  const [authBtnName, setAuthBtnName] = useState('Login');

  return (
    <div className="header">
      <div className="logo-container">
        <Link to={'/'}>
          <img 
            className="logo"
            src={logo}
          />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'about'}>About Us</Link></li>
          <li><Link to={'/contact'}>Contact Us</Link></li>
          <li><Link to={'/cart'}>Cart</Link></li>
        </ul>
      </div>
      <div className="nav-items">
        <button name={authBtnName} className="login filter-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
          authBtnName == 'Login' ? setAuthBtnName('Logout'):setAuthBtnName('Login');
        }}>{authBtnName}</button>
      </div>
    </div>
  );
};

export default Header;