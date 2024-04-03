import axios, { AxiosPromise } from 'axios'
import { EnvDTO } from '@/models/envDTO'

export function fetchEnvName(): AxiosPromise<EnvDTO> {
  return axios.get('/api/v1/env')
}
