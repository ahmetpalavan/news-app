import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEWS_API_BASE_URL,
});

export default axiosInstance;
