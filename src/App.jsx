import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainHeaderNav from './navigation/MainHeaderNav';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import ShowDetail from './pages/ShowDetail';
import { fetchShows } from './utils/api';
import { getFavourites } from './utils/localStorage';

const App = () => {
  const [shows, setShows] = useState([]);
  const [favourites, setFavourites] = useState(getFavourites());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchShows()
      .then(data => {
        console.log('Fetched shows:', data); // Check the console for this log
        setShows(data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching shows:', error);
        setIsLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  return (
    <Router>
      <div className="app">
        <MainHeaderNav />
        <Routes>
          <Route path="/" element={<Home shows={shows} isLoading={isLoading} />} />
          <Route path="/favourites" element={<Favourites favourites={favourites} />} />
          <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;