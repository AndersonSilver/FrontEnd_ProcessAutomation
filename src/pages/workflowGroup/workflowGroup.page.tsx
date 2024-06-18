import { Header } from '@/components/Header'
import { Section } from '@/components/Section'
import { WorkflowComponent } from '@/components/Workflow'

import style from './style.module.scss'

export function WorkflowGroupPage() {
  return (
    <div className={style.dashboardContainer}>
      <div>
        <Header />
      </div>

      <div className={style.dashboardContainerCenter}>
        <div className={style.dashboardContainerCenterSection}>
          <Section />
        </div>
        <WorkflowComponent caller='workflowGroup' />
        <div className={style.dashboardContainerCenterAside}></div>
      </div>
    </div>
  )
}
