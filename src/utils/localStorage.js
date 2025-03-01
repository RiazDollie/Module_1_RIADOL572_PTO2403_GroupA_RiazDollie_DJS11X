export const getFavourites = () => {
  const favourites = localStorage.getItem('favourites');
  return favourites ? JSON.parse(favourites) : [];
};

export const saveFavourites = (favourites) => {
  localStorage.setItem('favourites', JSON.stringify(favourites));
};

export const addFavourite = (showId, seasonId, episode) => {
  const favourites = getFavourites();
  const newFavourite = {
    showId,
    seasonId,
    episodeId: episode.id,
    episode,
    timestamp: new Date().toISOString(), // Add a timestamp
  };
  const updatedFavourites = [...favourites, newFavourite];
  saveFavourites(updatedFavourites);
  return updatedFavourites; // Return the updated list
};

export const removeFavourite = (showId, seasonId, episodeId) => {
  const favourites = getFavourites();
  const updatedFavourites = favourites.filter(
    (fav) =>
      !(fav.showId === showId && fav.seasonId === seasonId && fav.episodeId === episodeId)
  );
  saveFavourites(updatedFavourites);
  return updatedFavourites; // Return the updated list
  
}; 

// Get listened episodes from localStorage
export const getListenedEpisodes = () => {
  const listenedEpisodes = localStorage.getItem('listenedEpisodes');
  return listenedEpisodes ? JSON.parse(listenedEpisodes) : [];
};

// Save listened episodes to localStorage
export const saveListenedEpisodes = (listenedEpisodes) => {
  localStorage.setItem('listenedEpisodes', JSON.stringify(listenedEpisodes));
};