import http from "@/api/http.js"

const getOrder = async () => {
  const response = await http.get('/order')
  return response.data
}
const postOrder = async () => {
  try {
    const response = await http.post('/order')
    return response.data
  } catch (error) {
    if(error.response && error.response.status === 422) {
      return "Cart is empty."
    }
  }
}

export default {
  getOrder,
  postOrder,
}
