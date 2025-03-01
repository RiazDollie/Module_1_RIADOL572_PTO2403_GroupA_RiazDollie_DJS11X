import React from 'react';
import { Link } from 'react-router-dom'; // Add this import

const MainHeaderNav = () => {
  return (
    <header className="main-header">
      <h1>Podcast App</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favourites">Favourites</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeaderNav;