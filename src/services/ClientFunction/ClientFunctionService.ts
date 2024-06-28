import ProcessAutomationApi from '@/config/api'
import {
  ListClientFunctionData,
  PutClientFunctionData,
  PostClientFunctionData,
  WorkflowRequestBody,
  DeleteClientFunctionData,
} from './dto/ClientFunctionDto'

class ClientFunctionService {
  private static endpoints = {
    getClientFunction: (client_id: string) =>
      `/client/${client_id}/client-function`,
    postClientFunction: (client_id: string) =>
      `/client/${client_id}/client-function`,
    putClientFunction: (client_id: string, client_function_id: string) =>
      `/client/${client_id}/client-function/${client_function_id}`,
    deleteClientFunction: (client_id: string, client_function_id: string) =>
      `/client/${client_id}/client-function/${client_function_id}`,
  }

  public static async getClientFunction(
    client_id: string,
  ): Promise<ListClientFunctionData> {
    const { data } = await ProcessAutomationApi.get<ListClientFunctionData>(
      ClientFunctionService.endpoints.getClientFunction(client_id),
    )
    return data
  }

  public static async putClientFunction(
    body: WorkflowRequestBody,
    client_id: string,
    client_function_id: string,
  ): Promise<PutClientFunctionData> {
    const url = ClientFunctionService.endpoints.putClientFunction(
      client_id,
      client_function_id,
    )
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.put<PutClientFunctionData>(
      url,
      body,
    )
    return data
  }

  public static async postClientFunction(
    body: WorkflowRequestBody,
    client_id: string,
  ): Promise<PostClientFunctionData> {
    const { data } = await ProcessAutomationApi.post<PostClientFunctionData>(
      ClientFunctionService.endpoints.postClientFunction(client_id),
      body,
    )
    return data
  }

  public static async deleteClientFunction(
    client_id: string,
    client_function_id: string,
  ): Promise<DeleteClientFunctionData> {
    const url = ClientFunctionService.endpoints.deleteClientFunction(
      client_id,
      client_function_id,
    )
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.delete<DeleteClientFunctionData>(url)
    return data
  }
}

export default ClientFunctionService
