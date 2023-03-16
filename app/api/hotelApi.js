import axios from 'axios';
// import { getEnvVariables } from '../helpers/getEnvVariables';
// const env = getEnvVariables();


const hotelApi = axios.create({
  baseURL: 'http://localhost:4000/api'
});

// Todo: Configurar interceptores

export default hotelApi;
