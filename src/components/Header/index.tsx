import { useAuthContext } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'

import { FiLogOut } from 'react-icons/fi'
import style from './styles.module.scss'

function capitalizeFirstLetter(client: string) {
  return client.charAt(0).toUpperCase() + client.slice(1)
}

export function Header() {
  const { user, signOut } = useAuthContext()

  const clientName = user?.client ? capitalizeFirstLetter(user.client) : ''

  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <div className={style.divName}>
          <Link to='/dashboard'>
            <img src='/assets/tech.png' width={190} height={60} />
          </Link>
          <div className={style.infoCompany}>
            <h5>DESENVOLVIMENTO WEBAPP - {clientName}</h5>
          </div>
        </div>
      </div>

      <div className={style.headerContentButtons}>
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
