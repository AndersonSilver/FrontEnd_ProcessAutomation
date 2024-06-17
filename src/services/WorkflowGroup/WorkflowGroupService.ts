import ProcessAutomationApi from '@/config/api'
import {
  ListWorkflowGroupData,
  PutWorkflowGroupData,
  PostWorkflowGroupData,
  WorkflowRequestBody,
  DeleteWorkflowGroupData,
} from './dto/WorkflowGroupDto'

class WorkflowGroupService {
  private static endpoints = {
    getWorkflowsGroup: () => '/techforms/workflow-group',
    postWorkflowsGroup: () => '/techforms/workflow-group',
    putWorkflowsGroup: (id: string) => `/techforms/workflow-group/${id}`,
    deleteWorkflowsGroup: (id: string) => `/techforms/workflow-group/${id}`,
  }

  public static async getWorkflowsGroup(): Promise<ListWorkflowGroupData> {
    const { data } = await ProcessAutomationApi.get<ListWorkflowGroupData>(
      WorkflowGroupService.endpoints.getWorkflowsGroup(),
    )
    return data
  }

  public static async putWorkflowsGroup(
    body: WorkflowRequestBody,
    id: string,
  ): Promise<PutWorkflowGroupData> {
    const url = WorkflowGroupService.endpoints.putWorkflowsGroup(id)
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.put<PutWorkflowGroupData>(
      url,
      body,
    )
    return data
  }

  public static async postWorkflowsGroup(
    body: WorkflowRequestBody,
  ): Promise<PostWorkflowGroupData> {
    const { data } = await ProcessAutomationApi.post<PostWorkflowGroupData>(
      WorkflowGroupService.endpoints.postWorkflowsGroup(),
      body,
    )
    return data
  }

  public static async deleteWorkflowsGroup(
    id: string,
  ): Promise<DeleteWorkflowGroupData> {
    const url = WorkflowGroupService.endpoints.deleteWorkflowsGroup(id)
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.delete<DeleteWorkflowGroupData>(url)
    return data
  }
}

export default WorkflowGroupService
