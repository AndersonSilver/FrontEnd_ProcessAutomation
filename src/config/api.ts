import axios from 'axios'

const ProcessAutomationApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL_LOCAL,
})

ProcessAutomationApi.defaults.headers.common = {
  ...ProcessAutomationApi.defaults.headers.common,
}

export function setApiBaseUrl(environment: string) {
  let baseUrl = 'http://localhost:3001'

  switch (environment) {
    case 'PROD':
      console.log('PROD')
      baseUrl = import.meta.env.VITE_PUBLIC_API_URL_PROD
      break
    case 'HOMOL':
      console.log('HOMOL')
      baseUrl = import.meta.env.VITE_PUBLIC_API_URL_HOMOL
      break
    case 'DEV':
      console.log('DEV')
      baseUrl = import.meta.env.VITE_PUBLIC_API_URL_DEV
      break
    default:
      baseUrl = import.meta.env.VITE_PUBLIC_API_URL_LOCAL
  }

  ProcessAutomationApi.defaults.baseURL = baseUrl
}

export default ProcessAutomationApi
