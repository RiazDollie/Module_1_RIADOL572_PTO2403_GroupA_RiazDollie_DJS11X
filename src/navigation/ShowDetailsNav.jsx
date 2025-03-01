import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ShowDetailsNav = ({ showTitle }) => {
  const { id } = useParams();

  return (
    <nav className="show-details-nav">
      <Link to="/">Back to Home</Link>
      <h2>{showTitle}</h2>
      <Link to={`/show/${id}/seasons`}>Seasons</Link>
      <Link to={`/show/${id}/episodes`}>Episodes</Link>
    </nav>
  );
};

export default ShowDetailsNav;