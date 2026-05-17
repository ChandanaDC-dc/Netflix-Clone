import React, { useEffect, useState } from 'react';
import axios from '../api/tmdb';
import { requests, imageUrl } from '../api/tmdb';
import './SearchGrid.css';

const SearchGrid = ({ query, onMovieClick }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchSearch() {
      if (!query) return;
      try {
        const response = await axios.get(requests.fetchSearch(query));
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    }
    fetchSearch();
  }, [query]);

  return (
    <div className="search-grid-container">
      <h2>Search Results for "{query}"</h2>
      <div className="search-grid">
        {movies.map((movie) => (
          movie.poster_path && (
            <div key={movie.id} className="search-grid-item" onClick={() => onMovieClick(movie)}>
              <img 
                src={`${imageUrl}${movie.poster_path}`} 
                alt={movie.title || movie.name} 
              />
            </div>
          )
        ))}
      </div>
      {movies.length === 0 && <p className="no-results">No results found.</p>}
    </div>
  );
};

export default SearchGrid;
