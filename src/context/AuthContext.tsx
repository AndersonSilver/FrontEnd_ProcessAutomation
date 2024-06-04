'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, createContext, useEffect, useState } from 'react'
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
      localStorage.clear()
      router.push('/')
    } catch (error: any) {
      displayError('Erro ao deslogar!')
    }
  }

  useEffect(() => {
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

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}
