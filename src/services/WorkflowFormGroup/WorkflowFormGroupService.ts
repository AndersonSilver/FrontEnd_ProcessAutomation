import ProcessAutomationApi from '@/config/api'
import {
  ListWorkflowFormGroupData,
  PutWorkflowFormGroupData,
  PostWorkflowFormGroupData,
  WorkflowRequestBody,
  DeleteWorkflowFormGroupData,
} from './dto/WorkflowFormGroupDto'

class WorkflowFormGroupService {
  private static endpoints = {
    getWorkflowFormGroup: (workflow_id: string, workflow_form_id: string) =>
      `/techforms/workflow/${workflow_id}/workflow-form/${workflow_form_id}/workflow-form-group`,
    postWorkflowFormGroup: (workflow_id: string, workflow_form_id: string) =>
      `/techforms/workflow/${workflow_id}/workflow-form/${workflow_form_id}/workflow-form-group`,
    putWorkflowFormGroup: (
      workflow_id: string,
      workflow_form_id: string,
      workflow_form_group_id: string,
    ) =>
      `/techforms/workflow/${workflow_id}/workflow-form/${workflow_form_id}/workflow-form-group/${workflow_form_group_id}`,
    deleteWorkflowFormGroup: (
      workflow_id: string,
      workflow_form_id: string,
      workflow_form_group_id: string,
    ) =>
      `/techforms/workflow/${workflow_id}/workflow-form/${workflow_form_id}/workflow-form-group/${workflow_form_group_id}`,
  }

  public static async getWorkflowFormGroup(
    workflow_id: string,
    workflow_form_id: string,
  ): Promise<ListWorkflowFormGroupData> {
    const { data } = await ProcessAutomationApi.get<ListWorkflowFormGroupData>(
      WorkflowFormGroupService.endpoints.getWorkflowFormGroup(
        workflow_id,
        workflow_form_id,
      ),
    )
    return data
  }

  public static async putWorkflowFormGroup(
    body: WorkflowRequestBody,
    workflow_id: string,
    workflow_form_id: string,
    workflow_form_group_id: string,
  ): Promise<PutWorkflowFormGroupData> {
    const url = WorkflowFormGroupService.endpoints.putWorkflowFormGroup(
      workflow_id,
      workflow_form_id,
      workflow_form_group_id,
    )
    const { data } = await ProcessAutomationApi.put<PutWorkflowFormGroupData>(
      url,
      body,
    )
    return data
  }

  public static async postWorkflowFormGroup(
    body: WorkflowRequestBody,
    workflow_id: string,
    workflow_form_id: string,
  ): Promise<PostWorkflowFormGroupData> {
    const { data } = await ProcessAutomationApi.post<PostWorkflowFormGroupData>(
      WorkflowFormGroupService.endpoints.postWorkflowFormGroup(
        workflow_id,
        workflow_form_id,
      ),
      body,
    )
    return data
  }

  public static async deleteWorkflowFormGroup(
    workflow_form_id: string,
    workflow_id: string,
    workflow_form_group_id: string,
  ): Promise<DeleteWorkflowFormGroupData> {
    const url = WorkflowFormGroupService.endpoints.deleteWorkflowFormGroup(
      workflow_id,
      workflow_form_id,
      workflow_form_group_id,
    )
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.delete<DeleteWorkflowFormGroupData>(url)
    return data
  }
}

export default WorkflowFormGroupService
