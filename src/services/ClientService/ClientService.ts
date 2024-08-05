import ProcessAutomationApi from '@/config/api'
import {
  ListClientServiceData,
  PutClientServiceData,
  PostClientServiceData,
  WorkflowRequestBody,
  DeleteClientServiceData,
} from './dto/ClientServiceDto'

class ClientServiceTable {
  private static endpoints = {
    getClientService: (client_id: string) =>
      `/client/${client_id}/client-Service`,
    postClientService: (client_id: string) =>
      `/client/${client_id}/client-Service`,
    putClientService: (client_id: string, client_Service_id: string) =>
      `/client/${client_id}/client-Service/${client_Service_id}`,
    deleteClientService: (client_id: string, client_Service_id: string) =>
      `/client/${client_id}/client-Service/${client_Service_id}`,
    publishClientService: (client_id: string, client_Service_id: string) =>
      `/client/client//${client_id}/client-Service/${client_Service_id}/publish`,
  }

  public static async publishClientService(
    client_id: string,
    client_Service_id: string,
  ): Promise<void> {
    const url = ClientServiceTable.endpoints.publishClientService(
      client_id,
      client_Service_id,
    )
    console.log('URL:', url)
    await ProcessAutomationApi.post(url)
  }

  public static async getClientService(
    client_id: string,
  ): Promise<ListClientServiceData> {
    const { data } = await ProcessAutomationApi.get<ListClientServiceData>(
      ClientServiceTable.endpoints.getClientService(client_id),
    )
    return data
  }

  public static async putClientService(
    body: WorkflowRequestBody,
    client_id: string,
    client_Service_id: string,
  ): Promise<PutClientServiceData> {
    const url = ClientServiceTable.endpoints.putClientService(
      client_id,
      client_Service_id,
    )
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.put<PutClientServiceData>(
      url,
      body,
    )
    return data
  }

  public static async postClientService(
    body: WorkflowRequestBody,
    client_id: string,
  ): Promise<PostClientServiceData> {
    const { data } = await ProcessAutomationApi.post<PostClientServiceData>(
      ClientServiceTable.endpoints.postClientService(client_id),
      body,
    )
    return data
  }

  public static async deleteClientService(
    client_id: string,
    client_Service_id: string,
  ): Promise<DeleteClientServiceData> {
    const url = ClientServiceTable.endpoints.deleteClientService(
      client_id,
      client_Service_id,
    )
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.delete<DeleteClientServiceData>(url)
    return data
  }
}

export default ClientServiceTable
