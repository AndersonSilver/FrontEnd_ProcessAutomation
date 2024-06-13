import { QueryKey, useQueryClient } from '@tanstack/react-query'

export const useQueryClientManual = () => {
  const queryClient = useQueryClient()

  const updateQuery = <T extends Partial<T>>(key: QueryKey, data: T) => {
    queryClient.setQueryData(key, data)
  }

  const getQuery = <T extends Partial<T>>(key: QueryKey) => {
    return queryClient.getQueryData(key)
  }

  return {
    updateQuery,
    getQuery,
  }
}
