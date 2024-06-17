import ProcessAutomationApi from '@/config/api'
import {
  ListWorkflowData,
  PutWorkflowData,
  PostWorkflowData,
  WorkflowRequestBody,
  DeleteWorkflowData,
} from './dto/WorkflowDto'

class WorkflowService {
  private static endpoints = {
    getWorkflows: () => '/techforms/workflow',
    postWorkflows: () => '/techforms/workflow',
    putWorkflows: (id: string) => `/techforms/workflow/${id}`,
    deleteWorkflows: (id: string) => `/techforms/workflow/${id}`,
  }

  public static async getWorkflows(): Promise<ListWorkflowData> {
    const { data } = await ProcessAutomationApi.get<ListWorkflowData>(
      WorkflowService.endpoints.getWorkflows(),
    )

    return data
  }

  public static async putWorkflows(
    body: WorkflowRequestBody,
    id: string,
  ): Promise<PutWorkflowData> {
    const url = WorkflowService.endpoints.putWorkflows(id)
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.put<PutWorkflowData>(url, body)
    return data
  }

  public static async postWorkflows(
    body: WorkflowRequestBody,
  ): Promise<PostWorkflowData> {
    const { data } = await ProcessAutomationApi.post<PostWorkflowData>(
      WorkflowService.endpoints.postWorkflows(),
      body,
    )
    return data
  }

  public static async deleteWorkflows(id: string): Promise<PutWorkflowData> {
    const url = WorkflowService.endpoints.deleteWorkflows(id)
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.delete<DeleteWorkflowData>(url)
    return data
  }
}

export default WorkflowService
