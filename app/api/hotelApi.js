import axios from 'axios';
import { fromJS } from 'immutable';

const hotelApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Todo: Configurar interceptores
hotelApi.interceptors.request.use(config => {
  const newConfig = fromJS(config);

  newConfig.headers = {
    ...newConfig.headers,
    'x-token': localStorage.getItem('token')
  };

  return newConfig;
});

export default hotelApi;
