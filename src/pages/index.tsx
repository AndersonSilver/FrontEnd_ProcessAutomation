import { useContext, FormEvent, useState, useEffect } from 'react'
import { Bounce, toast } from 'react-toastify'
import Head from 'next/head'
import Image from 'next/image'
import logoImg from '../../public/tech.png'
import logoTechOne from '../../public/techOne.png'
import styles from '../../styles/home.module.scss'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/Button'
import { AuthContext } from '../context/AuthContext'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [client, setClient] = useState('')
  const [clientServices, setclientServices] = useState('')
  const [rememberPassword, setRememberPassword] = useState(false)
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);

  useEffect(() => {
    const clearCache = async () => {
      if (typeof window !== 'undefined' && window.caches) {
        const keys = await window.caches.keys();
        if (keys.length > 0) {
          await Promise.all(keys.map((key) => window.caches.delete(key)));

        }
        const remainingKeys = await window.caches.keys();
        if (remainingKeys.length === 0) {
          console.log("Cache está limpo");
        } else {
          console.log("Cache não está limpo");
        }
      }
    };
  
    clearCache();
  }, []);
  

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

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

    let data = {
      client,
      clientServices,
      email,
      password,
    }

    signIn(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Tech Forms - Faça seu login</title>
      </Head>
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
                <Image
                  className={styles.logoTechOne}
                  src={logoTechOne}
                  alt='Logo Tech One'
                  priority
                />
              </div>
            </div>
          </div>
          <div className={styles.containerPictury}>
            <div className={styles.containerLogo}>
              <Image
                className={styles.logoTech}
                src={logoImg}
                alt='Logo Tech'
                priority
              />
            </div>
          </div>
          <div className={styles.login}>
            <form onSubmit={handleLogin}>
              <h4>Client</h4>
              <br />
              <Input
                placeholder='Cliente'
                type='text'
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />

              <h4>Client Service</h4>
              <br />
              <Input
                placeholder='Serviço do Cliente'
                type='text'
                value={clientServices}
                onChange={(e) => setclientServices(e.target.value)}
              />

              <h4>Email</h4>
              <br />
              <Input
                placeholder='E-mail'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <h4>Senha</h4>
              <br />
              <Input
                placeholder='Senha'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />

              <label>
                <input
                  type='checkbox'
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                />
                Lembrar senha
              </label>
              <br />

              <Button type='submit' loading={loading}>
                Entrar
              </Button>
            </form>
          </div>
        </div>
        <p>© 2024 Process Automation - Tech4humans.</p>
        <a>v1.0.0</a>
      </div>
    </>
  )
}
