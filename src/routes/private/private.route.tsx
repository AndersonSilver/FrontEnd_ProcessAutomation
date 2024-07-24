import { DashboardPage } from '@/pages/dashboard/dashboard.page'
import { WorkflowPage } from '@/pages/workflow/workflow.page'
import { WorkflowGroupPage } from '@/pages/workflowGroup/workflowGroup.page'
import { WorkflowGroupItemPage } from '@/pages/workflowGroupItem/workflowGroupItem.page'
import { WorkflowProductPage } from '@/pages/workflowProduct/workflowProduct.page'
import { WorkflowStepPage } from '@/pages/workflowStep/workflowStep.page'
import { WorkflowStepFormPage } from '@/pages/workflowStepForm/workflowStepForm.page'
import { WorkflowFormPage } from '@/pages/workflowForm/workflowForm.page'
import { WorkflowFormGroupPage } from '@/pages/workflowFormGroup/workflowFormGroup.page'
import { ClientProductRequestPage } from '@/pages/clientProductRequest/clientProductRequest.page'
import { ClientProductRequestIdPage } from '@/pages/clientProductRequestId/clientProductRequestId.page'
import { ClientFunctionPage } from '@/pages/clientFunction/clientFunction.page'
import { ClientFunctionEditPage } from '@/pages/clientFunctionEdit/clientFunctionEdit.page'
import { ClientServicePage } from '@/pages/clientService/clientService.page'
import { TechDataPage } from '@/pages/techData/techData.page'
import { UserAccountPage } from '@/pages/userAccount/userAccount.page'

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
  {
    path: '/clientProductRequest',
    element: <ClientProductRequestPage />,
  },
  {
    path: '/clientProductRequestId',
    element: <ClientProductRequestIdPage />,
  },
  {
    path: '/clientFunction',
    element: <ClientFunctionPage />,
  },
  {
    path: '/clientFunctionEdit',
    element: <ClientFunctionEditPage />,
  },
  {
    path: '/clientService',
    element: <ClientServicePage />,
  },
  {
    path: '/techData',
    element: <TechDataPage />,
  },
  {
    path: '/useraccount',
    element: <UserAccountPage />,
  },
]
