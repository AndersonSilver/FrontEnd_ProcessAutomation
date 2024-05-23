'use client'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import {  ApiGetLogin } from "../services/apiClient";
import { displayError, displaySuccess } from '../utils/functions/messageToast'
import { workflow } from '../services/setupApis';

export const AUTHORIZATION_KEY = 'Authorization' as const
export const SESSION_KEY = 'SESSION_KEY' as const

type AuthContextData = {
  signIn: (credentials: SignInPropsWebApp) => Promise<void>;
  signOut: () => void;
  Workflow: ( client: string, clientServices: string, token: string) => Promise<any>;
  authorization: string
  user: LoggedInUserProps | null
}

type WorkflowPropsWebApp = {
  client: string;
  clientServices: string;
  token: string;
};

type SignInPropsWebApp = {
  client: string;
  clientServices: string;
  email: string;
  password: string;
};

type LoggedInUserProps = {
  client: string
  clientServices: string
  email: string
  acess_token: string
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [authorization, setAuthorization] = useState<string>('')
  const [user, setUser] = useState<LoggedInUserProps | null>(null)

  useEffect(() => {
    const authorizationData = JSON.stringify(
      localStorage.getItem(AUTHORIZATION_KEY)
    )
    const authorizationParsed = JSON.parse(authorizationData ?? '')

    const userData = localStorage.getItem(SESSION_KEY)
    const userParsed = userData ? JSON.parse(userData) : ''

    if (
      !authorizationParsed &&
      !userParsed &&
      router.pathname !== '/'
    ) {
      console.log('Invalid')
      router.push('/')
    } else {
      setAuthorization(authorizationParsed)
      setUser(userParsed)
    }
  }, [router.pathname,  authorization, router])

  async function signIn(credentials: SignInPropsWebApp) {
    try {
      const response = await ApiGetLogin.post("/auth-user", {}, {
        params: {
          client: credentials.client,
          client_services: credentials.clientServices,
          email: credentials.email,
          password: credentials.password,
        }
      });

      const loggedInUserProps = {
        client: credentials.client,
        clientServices: credentials.clientServices,
        acess_token: response.data.acess_token,
        email: credentials.email,
      }

      setUser(loggedInUserProps as LoggedInUserProps)

      localStorage.setItem(
        AUTHORIZATION_KEY,
        response.data.acess_token
      )

      localStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUserProps))

      displaySuccess('Login efetuado com sucesso!')

      router.push(`/dashboard?clientId=${credentials.client}&clientServices=${credentials.clientServices}`)
    } catch (error: any) {
      console.log(error)
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

  async function Workflow( client: any, clientServices: string, token: string) {
    try {

      const apiClient = workflow(undefined, undefined, token);

      const response = await apiClient.get("/search-workflow-webapp", {
        params: {
          client,
          client_services: clientServices,
        }        
      });
      const result = response.data.data

      return result;
    } catch (error: any) {
      console.log(error)
      displayError('Erro ao fazer ao trazer os workflows!')
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, authorization, user, Workflow }}
    >
      {children}
    </AuthContext.Provider>
  )
}
