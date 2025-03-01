import React from 'react';
import ShowCard from './ShowCard';

const ShowList = ({ shows }) => {
  //console.log('Shows in ShowList:', shows); // Check the console for this log
  return (
    <div className="show-list">
      {shows.map(show => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default ShowList;