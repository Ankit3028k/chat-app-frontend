// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://chat-app-backend-stzg.onrender.com', // Update with your API URL

});

export default instance;