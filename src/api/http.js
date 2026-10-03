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

http.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const errorStatus = error.response?.status;
  const serverError = error.response?.data
  const serverMessage = serverError?.message || serverError?.error.message

  let message = serverError?.message || error.message || "Произошла неизвестная ошибка";
  let validationErrors = serverError?.errors || null

  if(Array.isArray(validationErrors)) {
    validationErrors = Object.assign({}, ...validationErrors)
  }

  switch (errorStatus) {
    case 401:
      message = serverError?.message || "Неверный логин или пароль"
      localStorage.removeItem('user_token');
      break;
    case 403:
      message = serverError?.message || "Доступ запрещен"
      break;
    case 404:
      message = serverError?.message || "Ресурс не найден"
      break;
    case 422:
      message = serverError?.message || "Ошибка валидации данных"
      break;
  }
  const customError = new Error(message)
  customError.status = errorStatus
  customError.errors = validationErrors

  return Promise.reject(customError);
})

export default http;
