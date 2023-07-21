import axios from 'axios';

const hotelApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Todo: Configurar interceptores
/* eslint-disable no-param-reassign */
hotelApi.interceptors.request.use(config => {
  config.headers['x-token'] = localStorage.getItem('token');
  return config;
});

export default hotelApi;
