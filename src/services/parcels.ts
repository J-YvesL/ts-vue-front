import axios from 'axios'

export function fetchParcels() {
  return axios.get('/api/v1/parcels/build')
}
