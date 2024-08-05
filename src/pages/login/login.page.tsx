import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select' // Importar o componente Select
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { useAuthContext } from '@/hooks/useAuth'
import styles from '@/styles/home.module.scss'

export function LoginPage() {
  const { signIn } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [client, setClient] = useState('')
  const [clientServices, setclientServices] = useState('')
  const [environment, setEnvironment] = useState('PROD') // Novo estado para o ambiente

  const [rememberPassword, setRememberPassword] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (environment === '') {
      toast.warn('Preencha o ambiente!', {
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

    if (client === '') {
      toast.warn('Preencha o cliente!', {
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
      toast.warn('Preencha o servico!', {
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
      environment,
    }

    signIn(data)
    setLoading(false)
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <div className={styles.container}>
          <div className={styles.containerTop}>
            <div className={styles.containerTwo}>
              <div className={styles.titulo}>
                <h3>Bem vindo de volta !</h3>
                <br />
                <h4>Faça login na ferramenta.</h4>
              </div>
              <div className={styles.containerLogoOne}>
                <img
                  className={styles.logoTechOne}
                  src='/assets/techOne.png'
                  alt='Logo Tech One'
                />
              </div>
            </div>
          </div>
          <div className={styles.containerPictury}>
            <div className={styles.containerLogo}>
              <img
                className={styles.logoTech}
                src='/assets/tech.png'
                alt='Logo Tech'
              />
            </div>
          </div>
          <div className={styles.login}>
            <form onSubmit={handleLogin}>
              <h4>Ambiente</h4>
              <Select
                options={[
                  { value: 'PROD', label: 'Produção' },
                  { value: 'HOMOL', label: 'Homologação' },
                  { value: 'DEV', label: 'Desenvolvimento' },
                ]}
                value={environment}
                onChange={setEnvironment}
              />
              <h4>Client</h4>
              <Input
                placeholder='Cliente'
                type='text'
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />

              <h4>Client Service</h4>
              <Input
                placeholder='Serviço do Cliente'
                type='text'
                value={clientServices}
                onChange={(e) => setclientServices(e.target.value)}
              />

              <h4>Email</h4>
              <Input
                placeholder='E-mail'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <h4>Senha</h4>
              <Input
                placeholder='Senha'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label>
                <input
                  type='checkbox'
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                />
                Lembrar senha
              </label>

              <Button type='submit' loading={loading}>
                Entrar
              </Button>
            </form>
          </div>
        </div>
        <p>© 2024 Process Automation - Tech4humans.</p>
        <a>v1.2.1</a>
      </div>
    </>
  )
}
