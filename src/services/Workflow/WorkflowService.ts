import ProcessAutomationApi from '@/config/api'
import { ListWorkflowData } from './dto/WorkflowDto'

class WorkflowService {
  private static endpoints = {
    getWorkflows: () => '/techforms/workflow',
  }

  public static async getWorkflows(): Promise<ListWorkflowData> {
    const { data } = await ProcessAutomationApi.get<ListWorkflowData>(
      this.endpoints.getWorkflows(),
    )

    return data
  }
}

export default WorkflowService
