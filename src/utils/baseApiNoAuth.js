import axios from 'axios'
import { baseApiUrlGateway } from './constant'

export const BASE_URL = baseApiUrlGateway

const api = axios.create({
  baseURL: BASE_URL
})

export default api
