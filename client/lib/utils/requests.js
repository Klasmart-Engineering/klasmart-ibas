import axios from 'axios'
import { getCookie } from '@/lib/utils/cookies'

let _apiHost = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://localhost:1337/'

export function url(path) {
  if (!path) path = ''
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://localhost:1337/'}${path}`
}

export function customApi() {
  const instance = axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return instance
}

export function api() {
  const instance = axios.create({
    baseURL: _apiHost,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return instance
}

export function privateApi() {
  const authToken = getCookie('_kdslp_dash')
  const instance = axios.create({
    baseURL: _apiHost,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })

  return instance
}
