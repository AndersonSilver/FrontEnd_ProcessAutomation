import ProcessAutomationApi from '@/config/api'
import {
  ListWorkflowStepFormData,
  PutWorkflowStepFormData,
  PostWorkflowStepFormData,
  WorkflowRequestBody,
  DeleteWorkflowStepFormData,
} from './dto/WorkflowStepFormDto'

class WorkflowStepFormService {
  private static endpoints = {
    getWorkflowStepForm: (workflow_id: string, workflow_step_id: string) =>
      `/techforms/workflow/${workflow_id}/workflow-step/${workflow_step_id}/workflow-step-form`,
    postWorkflowStepForm: (workflow_id: string, workflow_step_id: string) =>
      `/techforms/workflow/${workflow_id}/workflow-step/${workflow_step_id}/workflow-step-form`,
    putWorkflowStepForm: (
      workflow_id: string,
      workflow_step_id: string,
      workflow_step_form_id: string,
    ) =>
      `/techforms/workflow/${workflow_id}/workflow-step/${workflow_step_id}/workflow-step-form/${workflow_step_form_id}`,
    deleteWorkflowStepForm: (
      workflow_id: string,
      workflow_step_id: string,
      workflow_step_form_id: string,
    ) =>
      `/techforms/workflow/${workflow_id}/workflow-step/${workflow_step_id}/workflow-step-form/${workflow_step_form_id}`,
  }

  public static async getWorkflowStepForm(
    workflow_id: string,
    workflow_step_id: string,
  ): Promise<ListWorkflowStepFormData> {
    const { data } = await ProcessAutomationApi.get<ListWorkflowStepFormData>(
      WorkflowStepFormService.endpoints.getWorkflowStepForm(
        workflow_id,
        workflow_step_id,
      ),
    )
    return data
  }

  public static async putWorkflowStepForm(
    body: WorkflowRequestBody,
    workflow_id: string,
    workflow_step_id: string,
    workflow_step_form_id: string,
  ): Promise<PutWorkflowStepFormData> {
    const url = WorkflowStepFormService.endpoints.putWorkflowStepForm(
      workflow_id,
      workflow_step_id,
      workflow_step_form_id,
    )
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.put<PutWorkflowStepFormData>(
      url,
      body,
    )
    return data
  }

  public static async postWorkflowStepForm(
    body: WorkflowRequestBody,
    workflow_id: string,
    workflow_step_id: string,
  ): Promise<PostWorkflowStepFormData> {
    const { data } = await ProcessAutomationApi.post<PostWorkflowStepFormData>(
      WorkflowStepFormService.endpoints.postWorkflowStepForm(
        workflow_id,
        workflow_step_id,
      ),
      body,
    )
    return data
  }

  public static async deleteWorkflowStepForm(
    workflow_id: string,
    workflow_step_id: string,
    workflow_step_form_id: string,
  ): Promise<DeleteWorkflowStepFormData> {
    const url = WorkflowStepFormService.endpoints.deleteWorkflowStepForm(
      workflow_id,
      workflow_step_id,
      workflow_step_form_id,
    )
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.delete<DeleteWorkflowStepFormData>(url)
    return data
  }
}

export default WorkflowStepFormService
