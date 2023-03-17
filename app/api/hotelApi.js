import axios from 'axios';

const hotelApi = axios.create({
  baseURL: 'http://localhost:4000/api'
});

// Todo: Configurar interceptores
hotelApi.interceptors.request.use( config => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  };

  return config;
});

export default hotelApi;
