import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ShowEpisodesNav = ({ showTitle }) => {
  const { id } = useParams();

  return (
    <nav className="show-episodes-nav">
      <Link to={`/show/${id}`}>Back to Show</Link>
      <h2>{showTitle} - Episodes</h2>
    </nav>
  );
};

export default ShowEpisodesNav;