import React from 'react';
import { Link } from 'react-router-dom';

const ShowCard = ({ show }) => {
  return (
    <Link to={`/show/${show.id}`} className="show-card">
      <img src={show.image} alt={show.title} />
      <h3>{show.title}</h3>
      <p>Seasons: {show.seasons}</p>
      <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
      <p>Genres: {show.genres.join(', ')}</p>
    </Link>
  );
};

export default ShowCard;