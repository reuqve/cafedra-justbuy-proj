import axios from 'axios'

const http = axios.create({
    baseURL: 'http://lifestealer86.ru/api-shop/',
    timeout: 10000,
  })

export default http;
