import axios from 'axios'

export function fetchOrders() {
  return axios.get('/api/orders')
}
