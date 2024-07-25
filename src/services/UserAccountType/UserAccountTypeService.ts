import ProcessAutomationApi from '@/config/api'
import {
  ListUserAccountTypeData,
  PutUserAccountTypeData,
  PostUserAccountTypeData,
  WorkflowRequestBody,
  DeleteUserAccountTypeData,
} from './dto/UserAccountTypeDto'

class UserAccountTypeService {
  private static endpoints = {
    getUserAccountType: () => `/authentication/user-account-type`,
    postUserAccountType: () => `/authentication/user-account-type`,
    putUserAccountType: (user_account_id: string) =>
      `/authentication/user-account-type/${user_account_id}`,
    deleteUserAccountType: (user_account_id: string) =>
      `/authentication/user-account-type/${user_account_id}`,
  }

  public static async getUserAccountType(): Promise<ListUserAccountTypeData> {
    const { data } = await ProcessAutomationApi.get<ListUserAccountTypeData>(
      UserAccountTypeService.endpoints.getUserAccountType(),
    )
    return data
  }

  public static async putUserAccountType(
    body: WorkflowRequestBody,
    user_account_id: string,
  ): Promise<PutUserAccountTypeData> {
    const url =
      UserAccountTypeService.endpoints.putUserAccountType(user_account_id)
    const { data } = await ProcessAutomationApi.put<PutUserAccountTypeData>(
      url,
      body,
    )
    return data
  }

  public static async postUserAccountType(
    body: WorkflowRequestBody,
  ): Promise<PostUserAccountTypeData> {
    const { data } = await ProcessAutomationApi.post<PostUserAccountTypeData>(
      UserAccountTypeService.endpoints.postUserAccountType(),
      body,
    )
    return data
  }

  public static async deleteUserAccountType(
    user_account_id: string,
  ): Promise<DeleteUserAccountTypeData> {
    const url =
      UserAccountTypeService.endpoints.deleteUserAccountType(user_account_id)
    const { data } =
      await ProcessAutomationApi.delete<DeleteUserAccountTypeData>(url)
    return data
  }
}

export default UserAccountTypeService
