import ProcessAutomationApi from '@/config/api'
import {
  ListWorkflowFormData,
  PutWorkflowFormData,
  PostWorkflowFormData,
  WorkflowRequestBody,
  DeleteWorkflowFormData,
} from './dto/WorkflowFormDto'

class WorkflowFormService {
  private static endpoints = {
    getWorkflowForm: () => `/techforms/workflow-form`,
    postWorkflowForm: () => `/techforms/workflow-form`,
    putWorkflowForm: (workflow_form_id: string) =>
      `/techforms/workflow-form/${workflow_form_id}`,
    deleteWorkflowForm: (workflow_form_id: string) =>
      `/techforms/workflow-form/${workflow_form_id}`,
  }

  public static async getWorkflowForm(): Promise<ListWorkflowFormData> {
    const { data } = await ProcessAutomationApi.get<ListWorkflowFormData>(
      WorkflowFormService.endpoints.getWorkflowForm(),
    )
    return data
  }

  public static async putWorkflowForm(
    body: WorkflowRequestBody,
    workflow_form_id: string,
  ): Promise<PutWorkflowFormData> {
    const url = WorkflowFormService.endpoints.putWorkflowForm(workflow_form_id)
    const { data } = await ProcessAutomationApi.put<PutWorkflowFormData>(
      url,
      body,
    )
    return data
  }

  public static async postWorkflowForm(
    body: WorkflowRequestBody,
  ): Promise<PostWorkflowFormData> {
    const { data } = await ProcessAutomationApi.post<PostWorkflowFormData>(
      WorkflowFormService.endpoints.postWorkflowForm(),
      body,
    )
    return data
  }

  public static async deleteWorkflowForm(
    workflow_form_id: string,
  ): Promise<DeleteWorkflowFormData> {
    const url =
      WorkflowFormService.endpoints.deleteWorkflowForm(workflow_form_id)
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.delete<DeleteWorkflowFormData>(url)
    return data
  }
}

export default WorkflowFormService
