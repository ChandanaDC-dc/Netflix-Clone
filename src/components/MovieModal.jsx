import React, { useEffect, useState } from 'react';
import axios from '../api/tmdb';
import { requests, imageUrl } from '../api/tmdb';
import { FaTimes, FaPlay, FaPlus, FaThumbsUp } from 'react-icons/fa';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [cast, setCast] = useState([]);
  const [genres, setGenres] = useState([]);
  const [runtime, setRuntime] = useState('');

  useEffect(() => {
    async function fetchDetails() {
      if (!movie) return;
      try {
        const response = await axios.get(requests.fetchMovieDetails(movie.id));
        const data = response.data;
        
        if (data.videos && data.videos.results.length > 0) {
          const trailer = data.videos.results.find((vid) => vid.type === 'Trailer') || data.videos.results[0];
          setTrailerUrl(trailer.key);
        } else {
          setTrailerUrl('');
        }

        if (data.credits && data.credits.cast) {
          setCast(data.credits.cast.slice(0, 5));
        }

        setGenres(data.genres || []);
        setRuntime(data.runtime);

      } catch (error) {
        console.error("Error fetching details", error);
      }
    }
    fetchDetails();
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="modal-header">
          {trailerUrl ? (
            <iframe
              className="modal-video"
              src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1&mute=1&controls=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img 
              className="modal-header-img" 
              src={`${imageUrl}${movie.backdrop_path || movie.poster_path}`} 
              alt={movie.name || movie.title} 
            />
          )}
          <div className="modal-header-fadeBottom"></div>
          <div className="modal-title-overlay">
             <h2>{movie.title || movie.name || movie.original_name}</h2>
             <div className="modal-buttons">
                <button className="play-btn"><FaPlay /> Play</button>
                <button className="icon-btn"><FaPlus /></button>
                <button className="icon-btn"><FaThumbsUp /></button>
             </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-info-left">
            <div className="modal-stats">
              <span className="match">98% Match</span>
              <span className="year">{(movie.release_date || movie.first_air_date || '').substring(0,4)}</span>
              {runtime && <span className="runtime">{Math.floor(runtime/60)}h {runtime%60}m</span>}
              <span className="hd">HD</span>
            </div>
            <p className="modal-overview">{movie.overview}</p>
          </div>
          
          <div className="modal-info-right">
            <div className="modal-cast">
              <span>Cast: </span>
              {cast.map(c => c.name).join(', ')}
            </div>
            <div className="modal-genres">
              <span>Genres: </span>
              {genres.map(g => g.name).join(', ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
