import ProcessAutomationApi from '@/src/config/api'
import { ListWorkflowData } from './dto/WorkflowDto'

class WorkflowService {
  private static endpoints = {
    getWorkflows: (client: string, clientService: string) =>
      `/${client}/${clientService}/techforms/workflow`,
  }

  public static async getWorkflows(
    client: string,
    clientService: string
  ): Promise<ListWorkflowData> {
    const { data } = await ProcessAutomationApi.get<ListWorkflowData>(
      this.endpoints.getWorkflows(client, clientService)
    )

    return data
  }
}

export default WorkflowService
