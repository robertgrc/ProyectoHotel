import axios from 'axios';

const API_URL = http://localhost:4000/api/

const hotelApi = axios.create({
    baseURL: API_URL
});

export default hotelApi;
