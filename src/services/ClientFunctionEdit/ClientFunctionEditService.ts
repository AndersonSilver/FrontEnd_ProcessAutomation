import ProcessAutomationApi from '@/config/api'
import { ListClientFunctionEditData } from './dto/ClientFunctionEditDto'

class ClientFunctionEditService {
  private static endpoints = {
    getClientFunctionEdit: (client_id: string, client_function_id: string) =>
      `/client/${client_id}/client-function/${client_function_id}`,
  }

  public static async getClientFunctionEdit(
    client_id: string,
    client_function_id: string,
  ): Promise<ListClientFunctionEditData> {
    const { data } = await ProcessAutomationApi.get<ListClientFunctionEditData>(
      ClientFunctionEditService.endpoints.getClientFunctionEdit(
        client_id,
        client_function_id,
      ),
    )
    return data
  }
}

export default ClientFunctionEditService
