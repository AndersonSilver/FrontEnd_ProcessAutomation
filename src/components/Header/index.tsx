import { useState } from 'react'
import { useAuthContext } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'
import { LuMaximize } from 'react-icons/lu'
import { FiLogOut, FiVolume2, FiVolumeX } from 'react-icons/fi' // Importando ícones de volume
import style from './styles.module.scss'

function capitalizeFirstLetter(client: string) {
  return client.charAt(0).toUpperCase() + client.slice(1)
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((e) => console.error(e))
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((e) => console.error(e))
    }
  }
}

export function Header() {
  const { user, signOut } = useAuthContext()
  const [isSoundEnabled, setIsSoundEnabled] = useState(true) // Estado para controle do som

  const clientName = user?.client ? capitalizeFirstLetter(user.client) : ''

  // Função para alternar o estado do som
  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled)
    // Aqui você pode adicionar lógica adicional para ativar/desativar sons na aplicação
  }

  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <div className={style.divName}>
          <Link to='/dashboard'>
            <img src='/assets/logo-full.png' alt='Logo' />
          </Link>
          <div className={style.infoCompany}>
            <h5>Desenvolvimento - {clientName}</h5>
          </div>
        </div>
      </div>

      <div className={style.headerContentButtons}>
        <div className={style.headerContentButtonsMaxAudio}>
          <button onClick={toggleFullScreen}>
            <LuMaximize color='white' size='30px' />
          </button>
          <button onClick={toggleSound}>
            {isSoundEnabled ? (
              <FiVolume2 color='#FFF' size={24} />
            ) : (
              <FiVolumeX color='#FFF' size={24} />
            )}
          </button>
        </div>
        <nav className={style.menuNav}>
          <div className={style.info}>
            <h5>{user?.email}</h5>
          </div>
          <button onClick={signOut}>
            <FiLogOut color='#FFF' size={24} />
          </button>
        </nav>
      </div>
    </header>
  )
}
