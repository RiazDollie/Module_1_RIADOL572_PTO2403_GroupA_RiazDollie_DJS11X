import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ShowSeasonsNav = ({ showTitle }) => {
  const { id } = useParams();

  return (
    <nav className="show-seasons-nav">
      <Link to={`/show/${id}`}>Back to Show</Link>
      <h2>{showTitle} - Seasons</h2>
    </nav>
  );
};

export default ShowSeasonsNav;