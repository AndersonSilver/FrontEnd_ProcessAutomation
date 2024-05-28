import ProcessAutomationApi from '@/src/config/api'
import { Session } from './dto/SessionDto'

class SessionService {
  private static endpoints = {
    authentication: (client: string, clientService: string) =>
      `/${client}/${clientService}/authentication/access-session/password`,
  }

  public static async getAuthentication(
    client: string,
    clientService: string,
    payload: Record<string, string>
  ): Promise<Session> {
    const { data } = await ProcessAutomationApi.post<Session>(
      this.endpoints.authentication(client, clientService),
      {
        ...payload,
      }
    )

    return data
  }
}

export default SessionService
