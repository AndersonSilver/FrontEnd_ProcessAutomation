import ProcessAutomationApi, { setApiBaseUrl } from '@/config/api'
import { Session } from './dto/SessionDto'

class SessionService {
  private static endpoints = {
    authentication: (client: string, clientService: string) =>
      `/${client}/${clientService}/authentication/access-session/password`,
  }

  public static async getAuthentication(
    client: string,
    clientService: string,
    payload: Record<string, string>,
    environment: string, // Adiciona o parâmetro environment
  ): Promise<Session> {
    // Define a URL base da API conforme o ambiente selecionado
    setApiBaseUrl(environment)

    const { data } = await ProcessAutomationApi.post<Session>(
      this.endpoints.authentication(client, clientService),
      {
        ...payload,
      },
    )

    return data
  }
}

export default SessionService
