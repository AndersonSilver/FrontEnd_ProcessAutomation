import { WorkflowComponent } from '@/src/components/Workflow'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import style from './style.module.scss'

export default function Dashboard() {
  return (
    <div className={style.dashboardContainer}>
      <div>
        <Header />
      </div>

      <div className={style.dashboardContainerCenter}>
        <div className={style.dashboardContainerCenterSection}>
          <Section />
        </div>
        <WorkflowComponent />
        <div className={style.dashboardContainerCenterAside}></div>
      </div>
    </div>
  )
}
