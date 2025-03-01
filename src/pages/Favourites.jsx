import React, { useState, useEffect } from 'react';
import { getFavourites } from '../utils/localStorage';
import { fetchShowById } from '../utils/api';

const Favourites = () => {
  const [groupedFavourites, setGroupedFavourites] = useState({});
  const [showDetails, setShowDetails] = useState({});
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const favourites = getFavourites();

    if (!favourites || favourites.length === 0) {
      setLoading(false);
      setError('No favourites found.');
      return;
    }

    // Group favourites by show and season
    const grouped = favourites.reduce((acc, fav) => {
      const { showId, seasonId, episode } = fav;

      if (!acc[showId]) {
        acc[showId] = {};
      }
      if (!acc[showId][seasonId]) {
        acc[showId][seasonId] = [];
      }
      acc[showId][seasonId].push(fav); 
      return acc;
    }, {});

    setGroupedFavourites(grouped);

    const fetchShowDetails = async () => {
      try {
        const details = {};
        for (const showId of Object.keys(grouped)) {
          const show = await fetchShowById(showId);
          details[showId] = show;
        }
        setShowDetails(details);
        setLoading(false);
      } catch (err) {
        setError('Error fetching show details');
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, []);

  const sortShows = (shows, order) => {
    return Object.entries(shows).sort(([showIdA], [showIdB]) => {
      const showA = showDetails[showIdA];
      const showB = showDetails[showIdB];

      if (order === 'asc') {
        return showA.title.localeCompare(showB.title);
      } else {
        return showB.title.localeCompare(showA.title);
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="favourites">
      <h1>Favourites</h1>
      <div className="sort-controls">
        <label htmlFor="sort-order">Sort by Title:</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      {Object.keys(groupedFavourites).length > 0 ? (
        sortShows(groupedFavourites, sortOrder).map(([showId, seasons]) => {
          const show = showDetails[showId];

          return (
            <div key={showId} className="favourite-show">
              {show && <h2>Show: {show.title}</h2>}
              {Object.entries(seasons).map(([seasonId, favourites]) => (
                <div key={`${showId}-${seasonId}`} className="favourite-season">
                  <h3>Season: {Number(seasonId) + 1}</h3>
                  {favourites.map((fav) => (
                    <div key={fav.episode.id} className="favourite-episode">
                      <h4>{fav.episode.title}</h4>
                      <p>{fav.episode.description}</p>
                      <p>
                        <strong>Added on:</strong>{' '}
                        {new Date(fav.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })
      ) : (
        <p>No favourites yet.</p>
      )}
    </div>
  );
};

export default Favourites;
