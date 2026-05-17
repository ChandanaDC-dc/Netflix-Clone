import React, { useState, useEffect } from 'react';
import axios from '../api/tmdb';
import { imageUrl } from '../api/tmdb';
import './Row.css';

const Row = ({ title, fetchUrl, isLargeRow = false, onMovieClick }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row" id={title}>
      <h2>{title}</h2>
      <div className="row-posters hide-scrollbar">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <div key={movie.id} className="row-item" onClick={() => onMovieClick && onMovieClick(movie)}>
                <img
                  className={`row-poster ${isLargeRow && 'row-posterLarge'}`}
                  src={`${imageUrl}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name || movie.title}
                />
                <p className="row-movie-title">{movie.title || movie.name || movie.original_name}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Row;
