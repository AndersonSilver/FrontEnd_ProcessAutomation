import { useAuthContext } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'

import { FiLogOut } from 'react-icons/fi'
import style from './styles.module.scss'

export function Header() {
  const { user, signOut } = useAuthContext()

  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <div className={style.divName}>
          <Link to='/dashboard'>
            <img src='/assets/tech.png' width={190} height={60} />
          </Link>
          <div className={style.infoCompany}>
            <h5>Desenvolvimento WebApp - {user?.client}</h5>
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
