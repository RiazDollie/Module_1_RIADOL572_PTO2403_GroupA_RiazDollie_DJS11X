import React from 'react';
import { getFavourites } from '../utils/localStorage';

const FavouritesList = () => {
  const favourites = getFavourites();

  return (
    <div className="favourites-list">
      <h2>Favourites</h2>
      {favourites.length > 0 ? (
        favourites.map(episode => (
          <div key={episode.id} className="favourite-episode">
            <h4>{episode.title}</h4>
            <p>{episode.description}</p>
          </div>
        ))
      ) : (
        <p>No favourites yet.</p>
      )}
    </div>
  );
};

export default FavouritesList;