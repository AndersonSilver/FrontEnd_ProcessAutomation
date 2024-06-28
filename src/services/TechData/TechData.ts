import ProcessAutomationApi from '@/config/api'
import {
  ListTechData,
  PostTechData,
  PutTechData,
  WorkflowRequestBody,
  DeleteTechData,
} from './dto/TechDataDto'

class TechDataService {
  private static endpoints = {
    getTechData: () => `/tech/data`,
    postTechData: () => `/tech/data`,
    putTechData: (TechData_id: string) => `/tech/data/${TechData_id}`,
    deleteTechData: (TechData_id: string) => `/tech/data/${TechData_id}`,
  }

  public static async getTechData(): Promise<ListTechData> {
    const { data } = await ProcessAutomationApi.get<ListTechData>(
      TechDataService.endpoints.getTechData(),
    )
    return data
  }

  public static async postTechData(
    body: WorkflowRequestBody,
  ): Promise<PostTechData> {
    const { data } = await ProcessAutomationApi.post<PostTechData>(
      TechDataService.endpoints.postTechData(),
      body,
    )
    return data
  }
  public static async putTechData(
    body: WorkflowRequestBody,
    TechData_id: string,
  ): Promise<PutTechData> {
    const url = TechDataService.endpoints.putTechData(TechData_id)
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.put<PutTechData>(url, body)
    return data
  }
  public static async deleteTechData(
    TechData_id: string,
  ): Promise<DeleteTechData> {
    const url = TechDataService.endpoints.deleteTechData(TechData_id)
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.delete<DeleteTechData>(url)
    return data
  }
}

export default TechDataService
