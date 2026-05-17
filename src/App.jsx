import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Row from './components/Row';
import MovieModal from './components/MovieModal';
import SearchGrid from './components/SearchGrid';
import { requests } from './api/tmdb';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} />
      
      {searchQuery ? (
        <SearchGrid query={searchQuery} onMovieClick={handleMovieClick} />
      ) : (
        <>
          <Banner />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow onMovieClick={handleMovieClick} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} onMovieClick={handleMovieClick} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} onMovieClick={handleMovieClick} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} onMovieClick={handleMovieClick} />
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} onMovieClick={handleMovieClick} />
          <Row title="Sci-Fi Movies" fetchUrl={requests.fetchSciFi} onMovieClick={handleMovieClick} />
          <Row title="Thriller Movies" fetchUrl={requests.fetchThriller} onMovieClick={handleMovieClick} />
          <Row title="Cartoons & Animation" fetchUrl={requests.fetchCartoons} onMovieClick={handleMovieClick} />
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
