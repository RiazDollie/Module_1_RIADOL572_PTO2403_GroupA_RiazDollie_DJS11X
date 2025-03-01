import React, { useState } from 'react';
import ShowList from '../components/ShowList';
import GenreFilter from '../components/GenreFilter';

const Home = ({ shows }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title-asc'); // Default to A-Z sorting

  // Filter shows based ni the genre
  const filteredShows = selectedGenre
    ? shows.filter((show) => show.genres.includes(Number(selectedGenre)))
    : shows;

  // Sort shows 
  const sortedShows = [...filteredShows].sort((a, b) => {
    if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title); // A-Z
    } else if (sortBy === 'title-desc') {
      return b.title.localeCompare(a.title); // Z-A
    } else if (sortBy === 'recent') {
      return new Date(b.updated) - new Date(a.updated); // Newest first
    } else if (sortBy === 'oldest') {
      return new Date(a.updated) - new Date(b.updated); // Oldest first
    }
    return 0;
  });

  const handleGenreFilter = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <div className="home">
      <h1>Podcast Shows</h1>
      <div className="controls">
        <GenreFilter onFilter={handleGenreFilter} />
        <div className="sort-controls">
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <optgroup label="By Title">
              <option value="title-asc">Title: A-Z</option>
              <option value="title-desc">Title: Z-A</option>
            </optgroup>
            <optgroup label="By Update Date">
              <option value="recent">Newly Updated</option>
              <option value="oldest">Oldest Updated</option>
            </optgroup>
          </select>
        </div>
      </div>
      <ShowList shows={sortedShows} />
    </div>
  );
};

export default Home;