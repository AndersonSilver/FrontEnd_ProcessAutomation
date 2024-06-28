import ProcessAutomationApi from '@/config/api'
import { ListClientProductRequestData } from './dto/ClientProductRequestEditDto'

class ClientProductRequestIdService {
  private static endpoints = {
    getClientProductRequestId: (
      client_id: string,
      client_product_request_id: string,
    ) =>
      `/client/${client_id}/client-product-request/${client_product_request_id}`,
  }

  public static async getClientProductRequestId(
    client_id: string,
    client_product_request_id: string,
  ): Promise<ListClientProductRequestData> {
    const { data } =
      await ProcessAutomationApi.get<ListClientProductRequestData>(
        ClientProductRequestIdService.endpoints.getClientProductRequestId(
          client_id,
          client_product_request_id,
        ),
      )
    return data
  }
}

export default ClientProductRequestIdService
