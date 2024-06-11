'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, createContext, useLayoutEffect, useState } from 'react'
import ProcessAutomationApi from '../config/api'
import SessionService from '../services/Session/SessionService'
import { displayError, displaySuccess } from '../utils/functions/messageToast'

export const SESSION_KEY = 'SESSION_KEY' as const

type AuthContextData = {
  signIn: (credentials: SignInPropsWebApp) => Promise<void>
  signOut: () => void
  user: LoggedInUserProps | null
}

type SignInPropsWebApp = {
  client: string
  clientServices: string
  email: string
  password: string
}

export type LoggedInUserProps = {
  client: string
  clientServices: string
  email: string
  access_token: string
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const location = usePathname()
  const router = useRouter()

  const [cacheClient, setCacheClient] = useState<string[] | null>(null)

  const clearCacheClient = () => {
    for (const key of cacheClient || []) {
      if (key) caches?.delete(key)
    }

    setTimeout(() => {
      window.location.reload()
    }, 0)
  }

  const getCachesClient = async () => {
    const cachesData = await caches?.keys()

    if (cachesData) setCacheClient(cachesData)
  }

  const [user, setUser] = useState<LoggedInUserProps | null>(null)

  async function signIn(credentials: SignInPropsWebApp) {
    try {
      const response = await SessionService.getAuthentication(
        credentials.client,
        credentials.clientServices,
        {
          login: credentials.email,
          password: credentials.password,
        }
      )

      const loggedInUserProps = {
        client: credentials.client,
        clientServices: credentials.clientServices,
        email: credentials.email,
        ...response,
      }

      ProcessAutomationApi.defaults.headers.common = {
        ...ProcessAutomationApi.defaults.headers.common,
        Authorization: `Bearer ${response?.access_token}`,
      }

      setUser(loggedInUserProps as LoggedInUserProps)

      localStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUserProps))

      displaySuccess('Login efetuado com sucesso!')

      router.push('/dashboard')
    } catch (error: any) {
      displayError('Erro ao fazer login!')
    }
  }

  function signOut() {
    try {
      ProcessAutomationApi.defaults.headers.common = {}
      setUser(null)
      localStorage.clear()
      router.push('/')
    } catch (error: any) {
      displayError('Erro ao deslogar!')
    }
  }

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const userParsed = JSON.parse(
        localStorage.getItem(SESSION_KEY) ?? '{}'
      ) as LoggedInUserProps

      if (!Object.keys(userParsed).length) router.push('/')
      else {
        localStorage.setItem(SESSION_KEY, JSON.stringify(userParsed))

        ProcessAutomationApi.defaults.headers.common = {
          ...ProcessAutomationApi.defaults.headers.common,
          Authorization: `Bearer ${userParsed?.access_token}`,
        }

        setUser(userParsed)

        if (location === '/') router.push('/dashboard')
      }
    }
  }, [location])

  useLayoutEffect(() => {
    getCachesClient()
  }, [])

  useLayoutEffect(() => {
    if (cacheClient?.length) clearCacheClient()
  }, [cacheClient])

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}
