// src/utils/api.js

import axios from 'axios';

const API_BASE_URL = 'https://book-storage-mern-stack-api.vercel.app'; // Update with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
