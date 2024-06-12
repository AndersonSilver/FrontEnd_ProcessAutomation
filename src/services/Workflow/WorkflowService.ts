import ProcessAutomationApi from '@/src/config/api'
import { ListWorkflowData, PutWorkflowData, PostWorkflowData } from './dto/WorkflowDto'

class WorkflowService {
  private static endpoints = {
    getWorkflows: () => '/techforms/workflow',
    postWorkflows: () => '/techforms/workflow',
    putWorkflows: (id: string) => `/techforms/workflow/${id}`,
  }

  public static async getWorkflows(): Promise<ListWorkflowData> {
    const { data } = await ProcessAutomationApi.get<ListWorkflowData>(
      this.endpoints.getWorkflows()
    )
    return data
  }

  public static async putWorkflows(body: any, id: string): Promise<PutWorkflowData> {
    const url = this.endpoints.putWorkflows(id);
    console.log("URL:", url);
    const { data } = await ProcessAutomationApi.put<PutWorkflowData>(url, body);
    return data;
  }  


  public static async postWorkflows(body: any): Promise<PostWorkflowData> {
    const { data } = await ProcessAutomationApi.post<PostWorkflowData>(
      this.endpoints.postWorkflows(),
       body);
    return data;
  }  
}

export default WorkflowService
