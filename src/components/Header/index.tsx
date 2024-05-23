import { useContext } from "react";
import style from "./styles.module.scss";
import Link from "next/link";
import { FiLogOut, FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

export function Header() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <header className={style.headerContainer}>
        
      <div className={style.headerContent}>

        <div className={style.divName}>
          <Link href="/dashboard">
            <img src="/tech.png" width={190} height={60} />
          </Link>
          <div className={style.infoCompany}>
            <h5>Desenvolvimento WebApp - {user?.client}</h5>
          </div>
        </div>
      </div>

      <div className={style.headerContentButtons}>
        <nav className={style.menuNav}>
          <div className={style.info}>
            <h5>{user?.email  }</h5>
          </div>
          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}