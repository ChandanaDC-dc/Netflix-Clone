import axios from 'axios';

const API_KEY = '93dcf6858abad8cb9dd07e52b9e9e59f';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchSciFi: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  fetchThriller: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
  fetchCartoons: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchSearch: (query) => `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  fetchMovieDetails: (id) => `/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
};

export const imageUrl = 'https://image.tmdb.org/t/p/original';

export default instance;
