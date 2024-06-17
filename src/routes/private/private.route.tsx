import { DashboardPage } from '@/pages/dashboard/dashboard.page'
import { WorkflowPage } from '@/pages/workflow/workflow.page'
import { WorkflowGroupPage } from '@/pages/workflowGroup/workflowGroup.page'

export const PRIVATE_ROUTES = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/workflow',
    element: <WorkflowPage />,
  },
  {
    path: '/workflowGroup',
    element: <WorkflowGroupPage />,
  },
]
