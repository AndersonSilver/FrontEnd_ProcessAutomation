import { Button } from '@/components/ui/Button'
import { useAuthContext } from '@/hooks/auth'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import style from './styles.module.scss'

export function LoginWebApp() {
  const { signInWebApp } = useAuthContext()

  const [client, setClient] = useState('')
  const [clientServices, setClientServices] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('WebApp')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (client === '') {
      toast.warn('Preencha o Client!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      })
      return
    }

    if (clientServices === '') {
      toast.warn('Preencha o Client Services!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      })
      return
    }

    if (email === '') {
      toast.warn('Preencha o email!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      })
      return
    }

    if (password === '') {
      toast.warn('Preencha a senha!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      })
      return
    }

    setLoading(true)

    const data = {
      client,
      clientServices,
      email,
      password,
    }

    const handleSignIn = async () => {
      try {
        await signInWebApp(data)
        setLoading(false)
        setIsLoggedIn(true)
      } catch (error) {
        setLoading(false)
        toast.error('Erro ao acessar!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        })
      }
    }
    handleSignIn()
  }

  function handleLogout() {
    localStorage.removeItem('WebApp')
    setIsLoggedIn(false)
  }

  if (isLoggedIn) {
    return (
      <aside className={style.AsideContainer}>
        <p>Você está logado!</p>
        <button className={style.buttonLogoff} onClick={handleLogout}>
          Sair
        </button>
      </aside>
    )
  }

  return (
    <aside className={style.AsideContainer}>
      <form onSubmit={handleSubmit}>
        <label>
          Client:
          <input
            type='text'
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </label>
        <label>
          Client Services:
          <input
            type='text'
            value={clientServices}
            onChange={(e) => setClientServices(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button type='submit' loading={loading}>
          Entrar
        </Button>
      </form>
    </aside>
  )
}
