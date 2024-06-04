import { useEffect, useRef } from 'react'
import ProcessAutomationApi from './api'

export const Interceptors = () => {
  const interceptorRef = useRef<number | null>(null)

  useEffect(() => {
    if (interceptorRef.current) {
      ProcessAutomationApi.interceptors.request.eject(interceptorRef.current)
      ProcessAutomationApi.interceptors.response.eject(interceptorRef.current)
    }

    interceptorRef.current = ProcessAutomationApi.interceptors.request.use(
      (config) => {
        let dataStorage

        if (window.location !== undefined)
          dataStorage = JSON.parse(localStorage.getItem('SESSION_KEY') ?? '{}')

        const prefix =
          Object?.keys(dataStorage)?.length > 0
            ? dataStorage?.client + '/' + dataStorage?.clientServices
            : ''

        if (config.url?.startsWith(prefix)) return config

        config.url = prefix + config.url

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    interceptorRef.current = ProcessAutomationApi.interceptors.response.use(
      (config) => {
        return Promise.resolve(config)
      },
      async (error) => {
        if (error.response.status === 401) {
          if (window.location !== undefined) localStorage.clear()

          ProcessAutomationApi.defaults.headers.common = {}
          window.location.reload()
          return Promise.reject(error)
        }

        return Promise.reject(error)
      }
    )

    return () => {
      if (interceptorRef.current) {
        ProcessAutomationApi.interceptors.request.eject(interceptorRef.current)
        ProcessAutomationApi.interceptors.response.eject(interceptorRef.current)
      }
    }
  }, [interceptorRef.current])

  return <></>
}
