import axios from 'axios';
const API_KEY = 'b3219b6136040523d930845bd679cb00';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const getTrendMovies = async () => {
  const response = await axios.get('/trending/all/day', {
    params: { api_key: API_KEY },
  });

  return response.data;
};

export const getSingleMovie = async movieId => {
  const response = await axios.get(`/movie/${movieId}`, {
    params: { api_key: API_KEY },
  });

  return response.data;
};

export const getSearchMovie = async inputValue => {
  const response = await axios.get('/search/movie', {
    params: { api_key: API_KEY, query: `${inputValue}` },
  });
  return response.data;
};

export const getReviewsInfo = async movieId => {
  const response = await axios.get(`movie/${movieId}/reviews`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

export const getCastInfo = async movieId => {
  const response = await axios.get(`movie/${movieId}/credits`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};
