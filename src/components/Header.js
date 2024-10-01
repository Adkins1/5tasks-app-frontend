import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Strona główna</Link></li>
        <li><Link to="/one-day">1 day</Link></li>
        <li><Link to="/one-month">1 month</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
