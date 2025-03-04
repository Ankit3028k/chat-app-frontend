// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.4.160:3000', // Update with your API URL

});

export default instance;