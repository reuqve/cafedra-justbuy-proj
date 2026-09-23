import http from '@/api/http'

async function signUp (data) {
  const response = await http.post('/signup', data);
  return response.data;
}

export default signUp
