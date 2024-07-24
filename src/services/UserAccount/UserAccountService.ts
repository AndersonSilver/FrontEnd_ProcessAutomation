import ProcessAutomationApi from '@/config/api'
import {
  ListUserAccountData,
  PostUserAccountData,
  WorkflowRequestBody,
  DeleteUserAccountData,
  PutUserAccountData,
  LinkUserAccountData,
} from './dto/UserAccountDto'

class UserAccountService {
  private static endpoints = {
    linkUserAccount: () =>
      `/authentication/access-session/generate-link-to-home`,
    getUserAccount: () => `/authentication/user-account`,
    postUserAccount: () => `/authentication/user-account`,
    putUserAccount: (useraccount_id: string) =>
      `/authentication/user-account/${useraccount_id}`,
    deleteUserAccount: (useraccount_id: string) =>
      `/authentication/user-account/${useraccount_id}`,
  }

  public static async putUserAccount(
    body: WorkflowRequestBody,
    id: string,
  ): Promise<PutUserAccountData> {
    const url = UserAccountService.endpoints.putUserAccount(id)
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.put<PutUserAccountData>(
      url,
      body,
    )
    return data
  }

  public static async getUserAccount(): Promise<ListUserAccountData> {
    const { data } = await ProcessAutomationApi.get<ListUserAccountData>(
      UserAccountService.endpoints.getUserAccount(),
    )
    return data
  }

  public static async postUserAccount(
    body: WorkflowRequestBody,
  ): Promise<PostUserAccountData> {
    const { data } = await ProcessAutomationApi.post<PostUserAccountData>(
      UserAccountService.endpoints.postUserAccount(),
      body,
    )
    return data
  }

  public static async deleteUserAccount(
    UserAccount_id: string,
  ): Promise<DeleteUserAccountData> {
    const url = UserAccountService.endpoints.deleteUserAccount(UserAccount_id)
    console.log('URL:', url)
    const { data } =
      await ProcessAutomationApi.delete<DeleteUserAccountData>(url)
    return data
  }

  public static async linkUserAccount(
    body: WorkflowRequestBody,
  ): Promise<LinkUserAccountData> {
    const url = UserAccountService.endpoints.linkUserAccount()
    console.log('URL:', url)
    const { data } = await ProcessAutomationApi.post<LinkUserAccountData>(
      url,
      body,
    )
    return data
  }
}

export default UserAccountService
