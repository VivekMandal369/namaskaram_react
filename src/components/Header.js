import { logo } from '../utils/constants';
import { useState } from 'react';

const Header = () => {
  const [authBtnName, setAuthBtnName] = useState('Login');

  return (
    <div className="header">
      <div className="logo-container">
        <img 
          className="logo"
          src={logo}
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
      <div className="nav-items">
        <button name={authBtnName} className="login filter-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
          authBtnName == 'Login' ? setAuthBtnName('Logout'):setAuthBtnName('Login');
        }}>{authBtnName}</button>
      </div>
    </div>
  );
};

export default Header;