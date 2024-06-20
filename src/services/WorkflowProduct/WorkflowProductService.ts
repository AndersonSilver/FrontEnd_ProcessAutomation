import ProcessAutomationApi from '@/config/api'
import {
  ListWorkflowProductData,
  PutWorkflowProductData,
  PostWorkflowProductData,
  WorkflowRequestBody,
  DeleteWorkflowProductData,
} from './dto/WorkflowProductDto'

class WorkflowProductService {
  private static endpoints = {
    getWorkflowsProduct: () => `/techforms/workflow-product`,
    postWorkflowsProduct: () => `/techforms/workflow-product`,
    putWorkflowsProduct: (id: string) => `/techforms/workflow-product/${id}`,
    deleteWorkflowsProduct: (id: string) => `/techforms/workflow-product/${id}`,
  }

  public static async getWorkflowsProduct(): Promise<ListWorkflowProductData> {
    const { data } = await ProcessAutomationApi.get<ListWorkflowProductData>(
      WorkflowProductService.endpoints.getWorkflowsProduct(),
    )
    return data
  }

  public static async putWorkflowsProduct(
    body: WorkflowRequestBody,
    id: string,
  ): Promise<PutWorkflowProductData> {
    const url = WorkflowProductService.endpoints.putWorkflowsProduct(id)
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.put<PutWorkflowProductData>(
      url,
      body,
    )
    return data
  }

  public static async postWorkflowsProduct(
    body: WorkflowRequestBody,
  ): Promise<PostWorkflowProductData> {
    const { data } = await ProcessAutomationApi.post<PostWorkflowProductData>(
      WorkflowProductService.endpoints.postWorkflowsProduct(),
      body,
    )
    return data
  }

  public static async deleteWorkflowsProduct(
    id: string,
  ): Promise<DeleteWorkflowProductData> {
    const url = WorkflowProductService.endpoints.deleteWorkflowsProduct(id)
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.delete<DeleteWorkflowProductData>(url)
    return data
  }
}

export default WorkflowProductService
