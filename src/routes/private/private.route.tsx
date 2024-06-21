import { DashboardPage } from '@/pages/dashboard/dashboard.page'
import { WorkflowPage } from '@/pages/workflow/workflow.page'
import { WorkflowGroupPage } from '@/pages/workflowGroup/workflowGroup.page'
import { WorkflowGroupItemPage } from '@/pages/workflowGroupItem/workflowGroupItem.page'
import { WorkflowProductPage } from '@/pages/workflowProduct/workflowProduct.page'
import { WorkflowStepPage } from '@/pages/workflowStep/workflowStep.page'
import { WorkflowStepFormPage } from '@/pages/workflowStepForm/workflowStepForm.page'
import { WorkflowFormPage } from '@/pages/workflowForm/workflowForm.page'
import { WorkflowFormGroupPage } from '@/pages/workflowFormGroup/workflowFormGroup.page'

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
  {
    path: '/workflowGroupItem',
    element: <WorkflowGroupItemPage />,
  },
  {
    path: '/workflowProduct',
    element: <WorkflowProductPage />,
  },
  {
    path: '/workflowStep',
    element: <WorkflowStepPage />,
  },
  {
    path: '/workflowStepForm',
    element: <WorkflowStepFormPage />,
  },
  {
    path: '/workflowForm',
    element: <WorkflowFormPage />,
  },
  {
    path: '/workflowFormGroup',
    element: <WorkflowFormGroupPage />,
  },
]
