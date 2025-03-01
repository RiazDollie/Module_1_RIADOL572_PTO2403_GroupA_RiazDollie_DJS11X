import React, { useState } from 'react';
import { addFavourite, removeFavourite, getFavourites } from '../utils/localStorage';
import AudioPlayer from './AudioPlayer';

const EpisodeList = ({ episodes, showId, seasonId }) => {
  const [favourites, setFavourites] = useState(getFavourites()); // Track favourites state
  const [currentEpisode, setCurrentEpisode] = useState(null); // Track the currently playing episode

  // Handle adding/removing favourites
  const handleFavouriteClick = (episode) => {
    // Check if the episode is already in favourites
    const isFavourite = favourites.some(
      (fav) =>
        fav.showId === showId &&
        fav.seasonId === seasonId &&
        fav.episodeId === episode.id
    );

    let updatedFavourites;
    if (isFavourite) {
      // Remove from favourites if already added
      updatedFavourites = removeFavourite(showId, seasonId, episode.id);
    } else {
      // Add to favourites
      updatedFavourites = addFavourite(showId, seasonId, episode);
    }

    // Update the favourites state
    setFavourites(updatedFavourites);
  };

  // Handle playing an episode
  const handlePlayClick = (episode) => {
    setCurrentEpisode(episode); // Set the episode to play
  };

  return (
    <div className="episode-list">
      {episodes.map((episode) => {
        const isFavourite = favourites.some(
          (fav) =>
            fav.showId === showId &&
            fav.seasonId === seasonId &&
            fav.episodeId === episode.id
        );

        return (
          <div key={episode.id} className="episode">
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <button onClick={() => handleFavouriteClick(episode)}>
              {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
            </button>
            <button onClick={() => handlePlayClick(episode)}>Play</button>
          </div>
        );
      })}

      {/* Audio Player */}
      {currentEpisode && (
        <div className="audio-player-container">
          <h3>Now Playing: {currentEpisode.title}</h3>
          <AudioPlayer episode={{ file: 'placeholder-audio.mp3' }} />
        </div>
      )}
    </div>
  );
};

export default EpisodeList;
