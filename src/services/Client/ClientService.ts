import ProcessAutomationApi from '@/config/api'
import {
  ListClientData,
  PostClientData,
  WorkflowRequestBody,
  DeleteClientData,
} from './dto/ClientDto'

class ClientService {
  private static endpoints = {
    getClient: () => `/client/client`,
    postClient: () => `/client/client`,
    deleteClient: (client_id: string) => `/client/client/${client_id}`,
  }

  public static async getClient(): Promise<ListClientData> {
    const { data } = await ProcessAutomationApi.get<ListClientData>(
      ClientService.endpoints.getClient(),
    )
    return data
  }

  public static async postClient(
    body: WorkflowRequestBody,
  ): Promise<PostClientData> {
    const { data } = await ProcessAutomationApi.post<PostClientData>(
      ClientService.endpoints.postClient(),
      body,
    )
    return data
  }

  public static async deleteClient(
    client_id: string,
  ): Promise<DeleteClientData> {
    const url = ClientService.endpoints.deleteClient(client_id)
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.delete<DeleteClientData>(url)
    return data
  }
}

export default ClientService
