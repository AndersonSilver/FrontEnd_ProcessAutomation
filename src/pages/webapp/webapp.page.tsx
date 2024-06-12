import { Header } from '@/components/Header'
import { LoginWebApp } from '@/components/LoginWebApp'
import { Section } from '@/components/Section'

import style from './style.module.scss'

export function WebAppPage() {
  return (
    <div className={style.dashboardContainer}>
      <div>
        <Header />
      </div>

      <div className={style.dashboardContainerCenter}>
        <div className={style.dashboardContainerCenterSection}>
          <Section />
        </div>
        <LoginWebApp />
        <div className={style.dashboardContainerCenterAside}></div>
      </div>
    </div>
  )
}
