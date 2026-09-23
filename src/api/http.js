import axios from 'axios'

const http = axios.create({
    baseURL: 'http://lifestealer86.ru/api-shop/',
    timeout: 10000,
  })

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('user_token');

  if(token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

export default http;
