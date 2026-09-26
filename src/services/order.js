import http from "@/api/http.js"

const getOrder = async () => {
  const response = await http.get('/order')
  return response.data
}

export default {
  getOrder,
}
