import axios from 'axios'

export function fetchItems() {
  return axios.get('/api/v1/items')
}
