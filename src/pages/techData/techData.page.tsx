import { Header } from '@/components/Header'
import { Section } from '@/components/Section'
import { WorkflowComponent } from '@/components/Workflow'

import style from './style.module.scss'

export function TechDataPage() {
  return (
    <div className={style.dashboardContainer}>
      <div>
        <Header />
      </div>

      <div className={style.dashboardContainerCenter}>
        <div className={style.dashboardContainerCenterSection}>
          <Section />
        </div>
        <WorkflowComponent caller='techData' />
        <div className={style.dashboardContainerCenterAside}></div>
      </div>
    </div>
  )
}
