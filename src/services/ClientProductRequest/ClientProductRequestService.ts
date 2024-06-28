import ProcessAutomationApi from '@/config/api'
import {
  ListClientProductRequestData,
  PutClientProductRequestData,
  PostClientProductRequestData,
  WorkflowRequestBody,
  DeleteClientProductRequestData,
} from './dto/ClientProductRequestDto'

class ClientProductRequestService {
  private static endpoints = {
    getClientProductRequest: (client_id: string) =>
      `/client/${client_id}/client-product-request`,
    getClientProductRequestId: (
      client_id: string,
      client_product_request_id: string,
    ) =>
      `/client/${client_id}/client-product-request/${client_product_request_id}`,
    postClientProductRequest: (client_id: string) =>
      `/client/${client_id}/client-product-request`,
    putClientProductRequest: (
      client_id: string,
      client_product_request_id: string,
    ) =>
      `/client/${client_id}/client-product-request/${client_product_request_id}`,
    deleteClientProductRequest: (
      client_id: string,
      client_product_request_id: string,
    ) =>
      `/client/${client_id}/client-product-request/${client_product_request_id}`,
  }

  public static async getClientProductRequest(
    client_id: string,
  ): Promise<ListClientProductRequestData> {
    const { data } =
      await ProcessAutomationApi.get<ListClientProductRequestData>(
        ClientProductRequestService.endpoints.getClientProductRequest(
          client_id,
        ),
      )
    return data
  }

  public static async getClientProductRequestId(
    client_id: string,
    client_product_request_id: string,
  ): Promise<ListClientProductRequestData> {
    const { data } =
      await ProcessAutomationApi.get<ListClientProductRequestData>(
        ClientProductRequestService.endpoints.getClientProductRequestId(
          client_id,
          client_product_request_id,
        ),
      )
    return data
  }

  public static async putClientProductRequest(
    body: WorkflowRequestBody,
    client_id: string,
    client_product_request_id: string,
  ): Promise<PutClientProductRequestData> {
    const url = ClientProductRequestService.endpoints.putClientProductRequest(
      client_id,
      client_product_request_id,
    )
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.put<PutClientProductRequestData>(url, body)
    return data
  }

  public static async postClientProductRequest(
    body: WorkflowRequestBody,
    client_id: string,
  ): Promise<PostClientProductRequestData> {
    const { data } =
      await ProcessAutomationApi.post<PostClientProductRequestData>(
        ClientProductRequestService.endpoints.postClientProductRequest(
          client_id,
        ),
        body,
      )
    return data
  }

  public static async deleteClientProductRequest(
    client_id: string,
    client_product_request_id: string,
  ): Promise<DeleteClientProductRequestData> {
    const url =
      ClientProductRequestService.endpoints.deleteClientProductRequest(
        client_id,
        client_product_request_id,
      )
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.delete<DeleteClientProductRequestData>(url)
    return data
  }
}

export default ClientProductRequestService
