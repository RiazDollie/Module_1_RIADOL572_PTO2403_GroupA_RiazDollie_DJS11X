import React, { useState } from 'react';
import EpisodeList from './EpisodeList';

const SeasonList = ({ seasons, showId }) => {
  const [expandedSeason, setExpandedSeason] = useState(null); // Track which season is expanded

  const toggleSeason = (index) => {
    if (expandedSeason === index) {
      setExpandedSeason(null); // Collapse if already expanded
    } else {
      setExpandedSeason(index); // Expand the selected season
    }
  };

  console.log('Seasons data:', seasons); // Debug: Log the seasons data

  return (
    <div className="season-list">
      <h2>Seasons</h2>
      {seasons.map((season, index) => (
        <div key={index} className="season">
          <h3 onClick={() => toggleSeason(index)}>
            Season {index + 1} {expandedSeason === index ? '▼' : '▶'}
          </h3>
          
          {expandedSeason === index && (
            <EpisodeList
              episodes={season.episodes}
              showId={showId}
              seasonId={index}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SeasonList;