import ProcessAutomationApi from '@/config/api'
import { SESSION_KEY } from '@/constants/session'
import SessionService from '@/services/Session/SessionService'
import { displayError, displaySuccess } from '@/utils/functions/messageToast'
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type AuthContextData = {
  signIn: (credentials: SignInPropsWebApp) => Promise<void>
  signOut: () => void
  signInWebApp: (data: unknown) => void
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
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [cacheClient, setCacheClient] = useState<string[] | null>(null)

  const clearCacheClient = useCallback(() => {
    for (const key of cacheClient || []) {
      if (key) caches?.delete(key)
    }

    setTimeout(() => {
      window.location.reload()
    }, 0)
  }, [cacheClient])

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
        },
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
      navigate('/dashboard')
    } catch (error: unknown) {
      displayError('Erro ao fazer login!')
    }
  }

  function signOut() {
    try {
      ProcessAutomationApi.defaults.headers.common = {}
      setUser(null)
      localStorage.clear()
      navigate('/')
    } catch (error: unknown) {
      displayError('Erro ao deslogar!')
    }
  }

  useEffect(() => {
    const userParsed = JSON.parse(
      localStorage.getItem(SESSION_KEY) ?? '{}',
    ) as LoggedInUserProps

    if (!Object.keys(userParsed).length) navigate('/')
    else {
      localStorage.setItem(SESSION_KEY, JSON.stringify(userParsed))

      ProcessAutomationApi.defaults.headers.common = {
        ...ProcessAutomationApi.defaults.headers.common,
        Authorization: `Bearer ${userParsed?.access_token}`,
      }

      setUser(userParsed)

      if (pathname === '/') navigate('/dashboard')
    }
  }, [pathname, navigate])

  useEffect(() => {
    getCachesClient()
  }, [])

  useEffect(() => {
    if (cacheClient?.length) clearCacheClient()
  }, [cacheClient, clearCacheClient])

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user, signInWebApp: () => {} }}
    >
      {children}
    </AuthContext.Provider>
  )
}
