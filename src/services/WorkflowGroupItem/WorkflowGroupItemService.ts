import ProcessAutomationApi from '@/config/api'
import {
  ListWorkflowGroupItemData,
  PutWorkflowGroupItemData,
  PostWorkflowGroupItemData,
  WorkflowRequestBody,
  DeleteWorkflowGroupItemData,
} from './dto/WorkflowGroupItemDto'

class WorkflowGroupItemService {
  private static endpoints = {
    getWorkflowsGroupItem: (workflow_group_id: string) =>
      `/techforms/workflow-group/${workflow_group_id}/workflow-group-item`,
    postWorkflowsGroupItem: (workflow_group_id: string) =>
      `/techforms/workflow-group/${workflow_group_id}/workflow-group-item`,
    putWorkflowsGroupItem: (
      workflow_group_id: string,
      workflow_group_item: string,
    ) =>
      `/techforms/workflow-group/${workflow_group_id}/workflow-group-item/${workflow_group_item}`,
    deleteWorkflowsGroupItem: (
      workflow_group_id: string,
      workflow_group_item: string,
    ) =>
      `/techforms/workflow-group/${workflow_group_id}/workflow-group-item/${workflow_group_item}`,
  }

  public static async getWorkflowsGroupItem(
    workflow_group_id: string,
  ): Promise<ListWorkflowGroupItemData> {
    const { data } = await ProcessAutomationApi.get<ListWorkflowGroupItemData>(
      WorkflowGroupItemService.endpoints.getWorkflowsGroupItem(
        workflow_group_id,
      ),
    )
    return data
  }

  public static async putWorkflowsGroupItem(
    body: WorkflowRequestBody,
    workflow_group_id: string,
    workflow_group_item: string,
  ): Promise<PutWorkflowGroupItemData> {
    const url = WorkflowGroupItemService.endpoints.putWorkflowsGroupItem(
      workflow_group_id,
      workflow_group_item,
    )
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.put<PutWorkflowGroupItemData>(
      url,
      body,
    )
    return data
  }

  public static async postWorkflowsGroupItem(
    body: WorkflowRequestBody,
    workflow_group_id: string,
  ): Promise<PostWorkflowGroupItemData> {
    const { data } = await ProcessAutomationApi.post<PostWorkflowGroupItemData>(
      WorkflowGroupItemService.endpoints.postWorkflowsGroupItem(
        workflow_group_id,
      ),
      body,
    )
    return data
  }

  public static async deleteWorkflowsGroupItem(
    workflow_group_id: string,
    workflow_group_item: string,
  ): Promise<DeleteWorkflowGroupItemData> {
    const url = WorkflowGroupItemService.endpoints.deleteWorkflowsGroupItem(
      workflow_group_id,
      workflow_group_item,
    )
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.delete<DeleteWorkflowGroupItemData>(url)
    return data
  }
}

export default WorkflowGroupItemService
