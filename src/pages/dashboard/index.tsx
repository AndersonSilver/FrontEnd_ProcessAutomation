import React, { useContext } from 'react'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Aside } from '../../components/Aside'
import style from './style.module.scss'
import { AuthContext } from '../../context/AuthContext'

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  return (
    <div className={style.dashboardContainer}>
      <div>
        <Header />
      </div>

      <div className={style.dashboardContainerCenter}>
        <div className={style.dashboardContainerCenterSection}>
          <Section />
        </div>
        <div className={style.dashboardContainerCenterAside}>
          <Aside />
        </div>
      </div>
    </div>
  )
}
