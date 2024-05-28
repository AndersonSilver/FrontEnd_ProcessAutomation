import axios from 'axios'

const ProcessAutomationApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
})

ProcessAutomationApi.defaults.headers.common = {
  ...ProcessAutomationApi.defaults.headers.common,
}

export default ProcessAutomationApi
