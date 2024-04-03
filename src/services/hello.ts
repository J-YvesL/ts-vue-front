import axios from 'axios'

export function fetchHelloMessage() {
  return axios.get('/api/v1/hello')
}
