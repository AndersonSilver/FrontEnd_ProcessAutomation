import ProcessAutomationApi from '@/config/api'
import {
  ListWorkflowStepData,
  PutWorkflowStepData,
  PostWorkflowStepData,
  WorkflowRequestBody,
  DeleteWorkflowStepData,
} from './dto/WorkflowStepDto'

class WorkflowStepService {
  private static endpoints = {
    getWorkflowStep: (workflow_id: string) =>
      `/techforms/workflow/${workflow_id}/workflow-step`,
    postWorkflowStep: (workflow_id: string) =>
      `/techforms/workflow/${workflow_id}/workflow-step`,
    putWorkflowStep: (workflow_id: string, workflow_step_id: string) =>
      `/techforms/workflow/${workflow_id}/workflow-step/${workflow_step_id}`,
    deleteWorkflowStep: (workflow_id: string, workflow_step_id: string) =>
      `/techforms/workflow/${workflow_id}/workflow-step/${workflow_step_id}`,
  }

  public static async getWorkflowStep(
    workflow_id: string,
  ): Promise<ListWorkflowStepData> {
    const { data } = await ProcessAutomationApi.get<ListWorkflowStepData>(
      WorkflowStepService.endpoints.getWorkflowStep(workflow_id),
    )
    return data
  }

  public static async putWorkflowStep(
    body: WorkflowRequestBody,
    workflow_id: string,
    workflow_step_id: string,
  ): Promise<PutWorkflowStepData> {
    const url = WorkflowStepService.endpoints.putWorkflowStep(
      workflow_id,
      workflow_step_id,
    )
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.put<PutWorkflowStepData>(
      url,
      body,
    )
    return data
  }

  public static async postWorkflowStep(
    body: WorkflowRequestBody,
    workflow_id: string,
  ): Promise<PostWorkflowStepData> {
    const { data } = await ProcessAutomationApi.post<PostWorkflowStepData>(
      WorkflowStepService.endpoints.postWorkflowStep(workflow_id),
      body,
    )
    return data
  }

  public static async deleteWorkflowStep(
    workflow_id: string,
    workflow_step_id: string,
  ): Promise<DeleteWorkflowStepData> {
    const url = WorkflowStepService.endpoints.deleteWorkflowStep(
      workflow_id,
      workflow_step_id,
    )
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.delete<DeleteWorkflowStepData>(url)
    return data
  }
}

export default WorkflowStepService
