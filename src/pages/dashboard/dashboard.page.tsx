import { Aside } from '@/components/Aside'
import { Header } from '@/components/Header'
import { Section } from '@/components/Section'
import style from './style.module.scss'

export function DashboardPage() {
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
