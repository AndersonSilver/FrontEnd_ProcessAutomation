/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useAuthContext } from '@/hooks/useAuth'
import WorkflowService from '@/services/Workflow/WorkflowService'
import WorkflowGroupService from '@/services/WorkflowGroup/WorkflowGroupService'
import WorkflowGroupItemService from '@/services/WorkflowGroupItem/WorkflowGroupItemService'
import WorkflowProductService from '@/services/WorkflowProduct/WorkflowProductService'
import WorkflowStepService from '@/services/WorkflowStep/WorkflowStepService'
import WorkflowStepFormService from '@/services/WorkflowStepForm/WorkflowStepFormService'
import WorkflowFormService from '@/services/WorkflowForm/WorkflowFormService'
import WorkflowFormGroupService from '@/services/WorkflowFormGroup/WorkflowFormGroupService'
import ClientProductRequestService from '@/services/ClientProductRequest/ClientProductRequestService'
import ClientService from '@/services/Client/ClientService'
import ClientFunctionService from '@/services/ClientFunction/ClientFunctionService'
import ClientFunctionEditService from '@/services/ClientFunctionEdit/ClientFunctionEditService'
import ClientServiceTable from '@/services/ClientService/ClientService'
import TechData from '@/services/TechData/TechData'
import { Workflow, Filter } from '@/services/Workflow/dto/WorkflowDto'
import { KeyboardEvent, useMemo, useState } from 'react'
import Table from '../Table/Table'
import TableRow from '../Table/TableRow'
import style from './styles.module.scss'
import { BiAddToQueue } from 'react-icons/bi'
import { FiRefreshCcw, FiSave } from 'react-icons/fi'
import { VscRemove } from 'react-icons/vsc'
import { IoMdAdd } from 'react-icons/io'
import { v4 as uuidv4 } from 'uuid'
import {
  displayError,
  displaySuccess,
} from '../../utils/functions/messageToast'
import { useEffect, useCallback } from 'react'
import CreatableSelect from 'react-select/creatable'

type WorkflowProtocolProps = {
  caller:
    | 'workflow'
    | 'workflowGroup'
    | 'workflowGroupItems'
    | 'workflowProduct'
    | 'workflowStep'
    | 'workflowStepForm'
    | 'workflowForm'
    | 'workflowFormGroup'
    | 'clientProductRequest'
    | 'clientProductRequestId'
    | 'clientFunction'
    | 'clientFunctionEdit'
    | 'clientService'
    | 'techData'
}

export type WorkflowData = {
  isNew?: boolean
  id?: string
  workflow_form_fields?: any[]
} & Workflow & {
    [key: string]: any
  }

export function WorkflowComponent({ caller }: WorkflowProtocolProps) {
  const [workflowList, setWorkflowList] = useState<WorkflowData[]>([])
  const [filter, setFilter] = useState<Filter | null>(null)
  const [filteredWorkflowList, setFilteredWorkflowList] = useState<any[]>([])
  const [changes, setChanges] = useState<any[]>([])
  const [selectedRow, setSelectedRow] = useState<number | null | string>(null)
  const [deleteMode, setDeleteMode] = useState(false)
  const [deleteRowIndex, setDeleteRowIndex] = useState<string | null>(null)
  const [editedItems, setEditedItems] = useState<any[]>([])
  const [cacheKeys, setCacheKeys] = useState<string[]>([])
  const [workflowGroups, setWorkflowGroups] = useState<WorkflowData[]>([])
  const [workflow, setWorkflow] = useState<WorkflowData[]>([])
  const [workflowStep, setWorkflowStep] = useState<WorkflowData[]>([])
  const [workflowId, setWorkflowId] = useState<string>('')
  const [workflowStepId, setWorkflowStepId] = useState<string>('')
  const [workflowGroupId, setworkflowGroupId] = useState<string>('')
  const [workflowForm, setWorkflowForm] = useState<WorkflowData[]>([])
  const [workflowFormId, setWorkflowFormId] = useState<string>('')
  const [clientProductRequestEdit, setClientProductRequestEdit] = useState<
    WorkflowData[]
  >([])
  const [clientFunctionEdit, setClientFunctionEdit] = useState<WorkflowData[]>(
    [],
  )
  const [clientFunctionEditId, setClientFunctionEditId] = useState<string>('')
  const [clientProductRequestEditId, setClientProductRequestEditId] =
    useState<string>('')

  const [client, setClient] = useState<WorkflowData[]>([])

  useEffect(() => {
    const fetchCacheKeys = async () => {
      if (typeof window !== 'undefined' && window.caches) {
        const keys = await window.caches.keys()
        setCacheKeys(keys)
      }
    }

    fetchCacheKeys()
  }, [])

  useEffect(() => {
    const clearCache = async () => {
      if (
        typeof window !== 'undefined' &&
        window.caches &&
        cacheKeys.length > 0
      ) {
        await Promise.all(cacheKeys.map((key) => window.caches.delete(key)))
        window.location.reload()
      }
    }

    clearCache()
  }, [cacheKeys])

  useEffect(() => {
    const fetchClient = async () => {
      const response = await ClientService.getClient()
      setClient(response.data)
    }

    fetchClient()
  }, [])

  const serviceMap = {
    workflow: {
      service: WorkflowService.getWorkflows,
      setter: setWorkflowList,
    },
    workflowGroup: {
      service: WorkflowGroupService.getWorkflowsGroup,
      setter: setWorkflowList,
    },
    workflowGroupItems: {
      service: WorkflowGroupItemService.getWorkflowsGroupItem,
      setter: setWorkflowList,
    },
    workflowProduct: {
      service: WorkflowProductService.getWorkflowsProduct,
      setter: setWorkflowList,
    },
    workflowStep: {
      service: WorkflowStepService.getWorkflowStep,
      setter: setWorkflowList,
    },
    workflowStepForm: {
      service: WorkflowStepFormService.getWorkflowStepForm,
      setter: setWorkflowList,
    },
    workflowForm: {
      service: WorkflowFormService.getWorkflowForm,
      setter: setWorkflowList,
    },
    workflowFormGroup: {
      service: WorkflowFormGroupService.getWorkflowFormGroup,
      setter: setWorkflowList,
    },
    clientProductRequest: {
      service: ClientProductRequestService.getClientProductRequest,
      setter: setWorkflowList,
    },
    clientProductRequestId: {
      service: ClientProductRequestService.getClientProductRequestId,
      setter: setWorkflowList,
    },
    clientFunction: {
      service: ClientFunctionService.getClientFunction,
      setter: setWorkflowList,
    },
    clientFunctionEdit: {
      service: ClientFunctionEditService.getClientFunctionEdit,
      setter: setWorkflowList,
    },
    clientService: {
      service: ClientServiceTable.getClientService,
      setter: setWorkflowList,
    },
    techData: {
      service: TechData.getTechData,
      setter: setWorkflow,
    },
  }

  const fetchData = useCallback(
    async ({ caller }: WorkflowProtocolProps) => {
      const { service, setter } = serviceMap[caller]
      let data: WorkflowData[] = []
      let clientProductRequestEditIdData: any[] = []
      let shouldFetch = true
      let params: [string, string] = ['', '']

      switch (caller) {
        case 'workflowGroupItems':
          shouldFetch = !!workflowGroupId
          params = [workflowGroupId, '']
          break
        case 'workflowStep':
          shouldFetch = !!workflowId
          params = [workflowId, '']
          break
        case 'workflowStepForm':
          shouldFetch = !!workflowStepId && !!workflowId
          params = [workflowId, workflowStepId]
          break
        case 'workflowFormGroup':
          shouldFetch = !!workflowId && !!workflowFormId
          params = [workflowId, workflowFormId]
          break
        case 'clientProductRequest':
          shouldFetch = client && client.length > 0 && !!client[0].id
          params = [client[0]?.id.toString(), '']
          break
        case 'clientProductRequestId':
          shouldFetch = !!clientProductRequestEditId
          params = [client[0]?.id.toString(), clientProductRequestEditId]
          break
        case 'clientFunction':
          shouldFetch = !!client && client.length > 0 && !!client[0].id
          params = [client[0]?.id.toString(), '']
          break
        case 'clientFunctionEdit':
          shouldFetch = !!clientFunctionEditId
          params = [client[0]?.id.toString(), clientFunctionEditId]
          break
        case 'clientService':
          shouldFetch = !!client && client.length > 0 && !!client[0].id
          params = [client[0]?.id.toString(), '']
          break
        case 'techData':
          break
        case 'workflowForm':
          break
        default:
          break
      }

      if (!shouldFetch) return

      const response = await service(...params)

      if (caller === 'clientProductRequestId') {
        clientProductRequestEditIdData = Array.isArray(response)
          ? response
          : [response]
        data = clientProductRequestEditIdData
      } else if (caller === 'clientFunctionEdit') {
        clientProductRequestEditIdData = Array.isArray(response)
          ? response
          : [response]
        data = clientProductRequestEditIdData
        console.log('data', data)
      } else {
        data = response.data || []
      }
      if (data.length > 0) {
        setter(data)
        setWorkflowList(data)
      }
    },
    [
      workflowGroupId,
      workflowId,
      workflowStepId,
      workflowFormId,
      client,
      clientProductRequestEditId,
      clientFunctionEditId,
    ],
  )

  useEffect(() => {
    fetchData({ caller: caller })
  }, [workflowGroupId, caller, fetchData, workflowId])

  const columnOrder = useMemo(
    () => Object?.keys?.(workflowList?.[0] ?? {}),
    [workflowList],
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const match = event.currentTarget.value.match(/(\w+)\s*=\s*'([^']*)'/)
      if (match) {
        const values = match[2].split(',').map((value) => value.trim())
        setFilter({ field: match[1], value: values })
      } else {
        setFilter(null)
      }
    }
  }

  const handleSave = async () => {
    try {
      let shouldFetchData = true
      const promises = editedItems.map((item) => {
        delete item.sla
        delete item.customer_view_form_id
        for (const key in item) {
          if (item[key] === null) {
            delete item[key]
          }
        }

        if (item.filters && typeof item.filters === 'string') {
          try {
            item.filters = JSON.parse(item.filters)
          } catch (error) {
            console.error('Erro ao converter item.filters para objeto:', error)
          }
        }

        if (
          item.workflow_form_fields &&
          typeof item.workflow_form_fields === 'string'
        ) {
          try {
            item.workflow_form_fields = JSON.parse(item.workflow_form_fields)
          } catch (error) {
            console.error(
              'Erro ao converter item.workflow_form_fields para objeto:',
              error,
            )
          }
        }

        // Adicione este bloco de código
        if (caller === 'workflowForm') {
          item.workflow_form_fields = item.workflow_form_fields?.map(
            (field: { length: number | null }) => {
              if (field.length === null) {
                field.length = 0
              }
              return field
            },
          )
        }

        if (caller === 'workflow') {
          let resultworkflow

          const requiredFields = ['title', 'description']

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (typeof item.optional_config === 'string') {
            item.optional_config = JSON.parse(item.optional_config)
          }

          if (allFieldsValid) {
            if (item.isNew) {
              resultworkflow = WorkflowService.postWorkflows(item)
            } else {
              resultworkflow = WorkflowService.putWorkflows(item, item.id)
            }
          }
          if (!resultworkflow) {
            shouldFetchData = false
          } else {
            displaySuccess('workflow salvo com sucesso!')
          }
          return resultworkflow
        } else if (caller === 'workflowGroup') {
          let resultworkflowGroup
          const requiredFields = ['title', 'filters', 'workflow_group_key']

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultworkflowGroup =
                WorkflowGroupService.postWorkflowsGroup(item)
            } else {
              resultworkflowGroup = WorkflowGroupService.putWorkflowsGroup(
                item,
                item.id,
              )
            }
          }
          if (!resultworkflowGroup) {
            shouldFetchData = false
          } else {
            displaySuccess('workflow Group Form salvo com sucesso!')
          }
          return resultworkflowGroup
        } else if (caller === 'workflowGroupItems') {
          let resultworkflowGroupItem
          const requiredFields = ['workflow_id', 'workflow_group_id']

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultworkflowGroupItem =
                WorkflowGroupItemService.postWorkflowsGroupItem(
                  item,
                  workflowGroupId,
                )
            } else {
              resultworkflowGroupItem =
                WorkflowGroupItemService.putWorkflowsGroupItem(
                  item,
                  workflowGroupId,
                  item.id,
                )
            }
          }
          if (!resultworkflowGroupItem) {
            shouldFetchData = false
          } else {
            displaySuccess('workflow Group Items Form salvo com sucesso!')
          }
          return resultworkflowGroupItem
        } else if (caller === 'workflowProduct') {
          let resultworkflowProduct
          const requiredFields = [
            'title',
            'description',
            'index',
            'service_key',
            'client_service_id',
          ]

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultworkflowProduct =
                WorkflowProductService.postWorkflowsProduct(item)
            } else {
              resultworkflowProduct =
                WorkflowProductService.putWorkflowsProduct(item, item.id)
            }
          }
          if (!resultworkflowProduct) {
            shouldFetchData = false
          } else {
            displaySuccess('workflow Product Form salvo com sucesso!')
          }
          return resultworkflowProduct
        } else if (caller === 'workflowStep') {
          let resultworkflowStep
          const requiredFields = [
            'title',
            'description',
            'workflow_step_key',
            'index',
          ]

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultworkflowStep = WorkflowStepService.postWorkflowStep(
                item,
                workflowId,
              )
            } else {
              resultworkflowStep = WorkflowStepService.putWorkflowStep(
                item,
                workflowId,
                item.id,
              )
            }
          }
          if (!resultworkflowStep) {
            shouldFetchData = false
          } else {
            displaySuccess('workflow Step salvo com sucesso!')
          }
          return resultworkflowStep
        } else if (caller === 'workflowStepForm') {
          if (!workflowId || !workflowStepId) {
            console.error('workflowId ou workflowStepId não estão definidos')
            return
          }
          let resultworkflowStepForm
          const requiredFields = ['index']

          if (typeof item.has_next_workflow_form === 'string') {
            item.has_next_workflow_form =
              item.has_next_workflow_form.toLowerCase() === 'true'
          }

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultworkflowStepForm =
                WorkflowStepFormService.postWorkflowStepForm(
                  item,
                  workflowId,
                  workflowStepId,
                )
            } else {
              resultworkflowStepForm =
                WorkflowStepFormService.putWorkflowStepForm(
                  item,
                  workflowId,
                  workflowStepId,
                  item.id,
                )
            }
          }
          if (!resultworkflowStepForm) {
            shouldFetchData = false
          } else {
            displaySuccess('workflow Step Form salvo com sucesso!')
          }
          return resultworkflowStepForm
        } else if (caller === 'workflowForm') {
          let resultworkflowForm

          if (typeof item.multiple_responses === 'string') {
            item.multiple_responses =
              item.multiple_responses.toLowerCase() === 'true'
          }

          const requiredFields = [
            'sub_title',
            'title',
            'description',
            'index',
            'workflow_form_key',
            'multiple_responses',
          ]

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (field === 'multiple_responses') {
              if (item[field] === undefined) {
                displayError(`${field} é obrigatório`)
                allFieldsValid = false
              }
            } else if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultworkflowForm = WorkflowFormService.postWorkflowForm(item)
            } else {
              resultworkflowForm = WorkflowFormService.putWorkflowForm(
                item,
                item.id,
              )
            }
          }
          if (!resultworkflowForm) {
            shouldFetchData = false
          } else {
            displaySuccess('workflow Form salvo com sucesso!')
          }
          return resultworkflowForm
        } else if (caller === 'clientProductRequest') {
          let resultClientProductRequest

          const requiredFields = ['title', 'product_key', 'request_function']

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultClientProductRequest =
                ClientProductRequestService.postClientProductRequest(
                  item,
                  client[0]?.id,
                )
            } else {
              resultClientProductRequest =
                ClientProductRequestService.putClientProductRequest(
                  item,
                  client[0]?.id,
                  item.id,
                )
            }
          }
          if (!resultClientProductRequest) {
            shouldFetchData = false
          } else {
            displaySuccess('Client Product Request salvo com sucesso!')
          }
          return resultClientProductRequest
        } else if (caller === 'clientProductRequestId') {
          let resultClientProductRequestEdit

          const requiredFields = ['title', 'product_key', 'request_function']

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultClientProductRequestEdit =
                ClientProductRequestService.postClientProductRequest(
                  item,
                  client[0]?.id,
                )
            } else {
              resultClientProductRequestEdit =
                ClientProductRequestService.putClientProductRequest(
                  item,
                  client[0]?.id,
                  item.id,
                )
            }
          }
          if (!resultClientProductRequestEdit) {
            shouldFetchData = false
          } else {
            displaySuccess('Client Product Request salvo com sucesso!')
          }
          return resultClientProductRequestEdit
        } else if (caller === 'clientFunction') {
          let resultClientFunction

          const requiredFields = ['title', 'description', 'function', 'type']

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultClientFunction = ClientFunctionService.postClientFunction(
                item,
                client[0]?.id,
              )
            } else {
              resultClientFunction = ClientFunctionService.putClientFunction(
                item,
                client[0]?.id,
                item.id,
              )
            }
          }
          if (!resultClientFunction) {
            shouldFetchData = false
          } else {
            displaySuccess('Client Function salvo com sucesso!')
          }
          return resultClientFunction
        } else if (caller === 'clientFunctionEdit') {
          let resultClientFunctionEdit

          const requiredFields = ['title', 'description', 'function', 'type']

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultClientFunctionEdit =
                ClientFunctionService.postClientFunction(item, client[0]?.id)
            } else {
              resultClientFunctionEdit =
                ClientFunctionService.putClientFunction(
                  item,
                  client[0]?.id,
                  item.id,
                )
            }
          }
          if (!resultClientFunctionEdit) {
            shouldFetchData = false
          } else {
            displaySuccess('Client Function salvo com sucesso!')
          }
          return resultClientFunctionEdit
        } else if (caller === 'clientService') {
          let resultClientService

          const requiredFields = ['name', 'service_key', 'enable']

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultClientService = ClientServiceTable.postClientService(
                item,
                client[0]?.id,
              )
            } else {
              resultClientService = ClientServiceTable.putClientService(
                item,
                client[0]?.id,
                item.id,
              )
            }
          }
          if (!resultClientService) {
            shouldFetchData = false
          } else {
            displaySuccess('Client Service salvo com sucesso!')
          }
          return resultClientService
        } else if (caller === 'techData') {
          let resultTechData

          const requiredFields = ['key', 'data', 'client_id', 'type']

          let allFieldsValid = true
          requiredFields.forEach((field) => {
            if (!item[field]) {
              displayError(`${field} é obrigatório`)
              allFieldsValid = false
            }
          })

          if (allFieldsValid) {
            if (item.isNew) {
              resultTechData = TechData.postTechData(item)
            } else {
              resultTechData = TechData.putTechData(item, item.id)
            }
          }
          if (!resultTechData) {
            shouldFetchData = false
          } else {
            displaySuccess('Tech Data salvo com sucesso!')
          }
          return resultTechData
        }
      })
      await Promise.all(promises)

      if (shouldFetchData) {
        fetchData({ caller: caller })
        setEditedItems([])
      }
    } catch (error) {
      console.error('Erro ao salvar os itens editados:', error)
    }
  }

  const handleDeleteOrConfirm = async () => {
    if (deleteMode) {
      setDeleteRowIndex(selectedRow !== null ? selectedRow.toString() : null)
      if (selectedRow !== null) {
        try {
          if (caller === 'workflow') {
            await WorkflowService.deleteWorkflows(selectedRow.toString())
            displaySuccess('workflow deletado com sucesso!')
            await fetchData({ caller: caller })
          } else if (caller === 'workflowGroup') {
            await WorkflowGroupService.deleteWorkflowsGroup(
              selectedRow.toString(),
            )
            displaySuccess('workflow Group deletado com sucesso!')
            await fetchData({ caller: caller })
          } else if (caller === 'workflowGroupItems') {
            await WorkflowGroupItemService.deleteWorkflowsGroupItem(
              workflowGroupId,
              selectedRow.toString(),
            )
            displaySuccess('workflow Group Item deletado com sucesso!')
            await fetchData({ caller: caller })
          } else if (caller === 'workflowProduct') {
            await WorkflowProductService.deleteWorkflowsProduct(
              selectedRow.toString(),
            )
            displaySuccess('workflow Product deletado com sucesso!')
            await fetchData({ caller: caller })
          } else if (caller === 'workflowStep') {
            await WorkflowStepService.deleteWorkflowStep(
              workflowId,
              selectedRow.toString(),
            )
            displaySuccess('workflow Step deletado com sucesso!')
            await fetchData({ caller: caller })
          } else if (caller === 'workflowStepForm') {
            await WorkflowStepFormService.deleteWorkflowStepForm(
              workflowId,
              workflowStepId,
              selectedRow.toString(),
            )
            displaySuccess('workflow Step Form deletado com sucesso!')
            await fetchData({ caller: caller })
          } else if (caller === 'workflowForm') {
            await WorkflowFormService.deleteWorkflowForm(selectedRow.toString())
            displaySuccess('workflow Form deletado com sucesso!')
            await fetchData({ caller: caller })
          } else if (caller === 'clientProductRequest') {
            await ClientProductRequestService.deleteClientProductRequest(
              client[0]?.id,
              selectedRow.toString(),
            )
            displaySuccess('Client Product Request deletado com sucesso!')
            await fetchData({ caller: caller })
          } else if (caller === 'clientProductRequestId') {
            await ClientProductRequestService.deleteClientProductRequest(
              client[0]?.id,
              selectedRow.toString(),
            )
            displaySuccess('Client Product Request deletado com sucesso!')
            window.location.reload()
          } else if (caller === 'clientFunction') {
            await ClientFunctionService.deleteClientFunction(
              client[0]?.id,
              selectedRow.toString(),
            )
            displaySuccess('Client Function deletado com sucesso!')
            await fetchData({ caller: caller })
          } else if (caller === 'clientFunctionEdit') {
            await ClientFunctionService.deleteClientFunction(
              client[0]?.id,
              selectedRow.toString(),
            )
            displaySuccess('Client Function deletado com sucesso!')
            window.location.reload()
          } else if (caller === 'clientService') {
            await ClientServiceTable.deleteClientService(
              client[0]?.id,
              selectedRow.toString(),
            )
            displaySuccess('Client Service deletado com sucesso!')
            await fetchData({ caller: caller })
          }
        } catch (error) {
          displayError('Erro ao deletar!')
          console.error('Erro ao deletar os itens editados:', error)
        }
      }
    } else {
      setDeleteRowIndex(null)
    }
    setDeleteMode(!deleteMode)
  }

  const handleCancel = () => {
    setSelectedRow(null)
    setDeleteRowIndex(null)
    setDeleteMode(false)
  }

  const handleAdd = () => {
    if (workflowList.length > 0) {
      const firstItem = workflowList[0]

      const newItem = Object.keys(firstItem).reduce((obj: any, key) => {
        obj[key] = undefined
        return obj
      }, {})

      newItem.isNew = true

      setWorkflowList([...workflowList, newItem])
    }
  }

  const handleDuplicate = () => {
    if (selectedRow === null) {
      return
    }

    const selectedItem = workflowList.find((item) => item.id === selectedRow)
    if (selectedItem) {
      const newItem = { ...selectedItem, id: uuidv4(), isNew: true }
      setWorkflowList([...workflowList, newItem])
    }
  }

  const handleAtt = () => {
    window.location.reload()
  }

  useEffect(() => {
    let list = [...workflowList]
    if (filter) {
      list = list.filter((item) =>
        Array.isArray(filter.value)
          ? filter.value.some((fv) =>
              String(item[filter.field])
                .trim()
                .toLowerCase()
                .includes(fv.trim().toLowerCase()),
            )
          : String(item[filter.field])
              .trim()
              .toLowerCase()
              .includes(filter.value.trim().toLowerCase()),
      )
    }
    setFilteredWorkflowList(list)
  }, [workflowList, filter, fetchData])

  useEffect(() => {
    if (caller === 'workflowGroupItems') {
      const fetchWorkflowGroups = async () => {
        const response = await WorkflowGroupService.getWorkflowsGroup()
        setWorkflowGroups(response.data)
      }

      fetchWorkflowGroups()
    } else if (caller === 'workflowStep') {
      const fetchWorkflow = async () => {
        const response = await WorkflowService.getWorkflows()
        setWorkflow(response.data)
      }

      fetchWorkflow()
    } else if (caller === 'workflowStepForm') {
      const fetchWorkflow = async () => {
        const response = await WorkflowService.getWorkflows()
        setWorkflow(response.data)
      }

      const fetchWorkflowStep = async () => {
        if (!workflowId) {
          return
        }
        const response = await WorkflowStepService.getWorkflowStep(workflowId)
        setWorkflowStep(response.data)
      }

      fetchWorkflow()
      fetchWorkflowStep()
    } else if (caller === 'workflowForm') {
      const fetchWorkflow = async () => {
        const response = await WorkflowService.getWorkflows()
        setWorkflow(response.data)
      }

      const fetchWorkflowStep = async () => {
        if (!workflowId) {
          return
        }
        const response = await WorkflowStepService.getWorkflowStep(workflowId)
        setWorkflowStep(response.data)
      }

      fetchWorkflow()
      fetchWorkflowStep()
    } else if (caller === 'workflowFormGroup') {
      const fetchWorkflow = async () => {
        const response = await WorkflowService.getWorkflows()
        setWorkflow(response.data)
      }

      const fetchWorkflowForm = async () => {
        const response = await WorkflowFormService.getWorkflowForm()
        setWorkflowForm(response.data)
      }

      fetchWorkflow()
      fetchWorkflowForm()
    } else if (caller === 'clientProductRequestId') {
      const fetchClient = async () => {
        const response =
          await ClientProductRequestService.getClientProductRequest(
            client[0]?.id.toString(),
          )
        setClientProductRequestEdit(response.data)
      }

      fetchClient()
    } else if (caller === 'clientFunctionEdit') {
      const fetchClient = async () => {
        const response = await ClientFunctionService.getClientFunction(
          client[0]?.id.toString(),
        )
        setClientFunctionEdit(response.data)
      }

      fetchClient()
    }
  }, [workflowGroupId, caller, workflowId, workflowStepId, fetchData, client])

  useEffect(() => {
    if (workflowStepId) {
      if (caller === 'workflowStepForm') {
        fetchData({ caller: 'workflowStepForm' })
      } else if (caller === 'workflowForm') {
        fetchData({ caller: 'workflowForm' })
      }
    } else if (workflowFormId) {
      if (caller === 'workflowFormGroup') {
        if (workflowFormId) {
          fetchData({ caller: 'workflowFormGroup' })
        }
      }
    }
  }, [workflowStepId, caller, workflowFormId, fetchData])

  return (
    <aside className={style.AsideContainer}>
      <div className={style.containerTable}>
        <div className={style.menuFiltro}>
          <span className={style.filterLabel}>
            {caller === 'workflowGroupItems'
              ? 'Workflow Group Items'
              : caller === 'workflowGroup'
                ? 'Workflow Group'
                : caller === 'workflow'
                  ? 'Workflow'
                  : caller === 'workflowProduct'
                    ? 'Workflow Product'
                    : caller === 'workflowStep'
                      ? 'Workflow Step'
                      : caller === 'workflowStepForm'
                        ? 'Workflow Step Form'
                        : caller === 'workflowForm'
                          ? 'Workflow Form'
                          : caller === 'workflowFormGroup'
                            ? 'Workflow Form Group'
                            : caller === 'clientProductRequest'
                              ? 'Client Product Request'
                              : caller === 'clientProductRequestId'
                                ? 'Client Product Request'
                                : caller === 'clientFunction'
                                  ? 'Client Function'
                                  : caller === 'clientFunctionEdit'
                                    ? 'Client Function'
                                    : caller === 'clientService'
                                      ? 'Client Service'
                                      : caller === 'techData'
                                        ? 'Tech Data'
                                        : ''}
          </span>
          <input
            className={style.filterText}
            type='text'
            onKeyDown={handleKeyDown}
            placeholder=''
          />
        </div>
        {caller === 'workflowGroupItems' && (
          <>
            <div className={style.AsideSelectMainworkflowStepForm}>
              <div className={style.AsideSelectworkflowStepForm}>
                <span className={style.filterLabelRota}>WORKFLOW GROUP</span>
                <CreatableSelect
                  className={style.AsideSelectGroupId}
                  options={workflowGroups.map((group) => ({
                    value: group.id,
                    label: `${group.id} - ${group.title}`,
                  }))}
                  isSearchable
                  onChange={(selectedOption) =>
                    selectedOption
                      ? setworkflowGroupId(selectedOption.value)
                      : null
                  }
                  placeholder='Selecione um grupo para fazer a busca dos items'
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: 650, // ou qualquer outro valor que você queira
                    }),
                  }}
                />
              </div>
            </div>
          </>
        )}
        {caller === 'workflowStep' && (
          <>
            <div className={style.AsideSelectMainworkflowStepForm}>
              <div className={style.AsideSelectworkflowStepForm}>
                <span className={style.filterLabelRota}>WORKFLOW</span>
                <CreatableSelect
                  className={style.AsideSelectGroupId}
                  options={workflow.map((wf) => ({
                    value: wf.id,
                    label: `${wf.id} - ${wf.title}`,
                  }))}
                  isSearchable
                  onChange={(selectedOption) =>
                    selectedOption ? setWorkflowId(selectedOption.value) : null
                  }
                  placeholder='Selecione um workflow para fazer a busca'
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: 650, // ou qualquer outro valor que você queira
                    }),
                  }}
                />
              </div>
            </div>
          </>
        )}
        {caller === 'workflowStepForm' && (
          <>
            <div className={style.AsideSelectMainworkflowStepForm}>
              <div className={style.AsideSelectworkflowStepForm}>
                <span className={style.filterLabelRota}>WORKFLOW</span>

                <CreatableSelect
                  className={style.AsideSelectGroupId}
                  options={workflow.map((wf) => ({
                    value: wf.id,
                    label: `${wf.id} - ${wf.title}`,
                  }))}
                  isSearchable
                  onChange={(selectedOption) =>
                    selectedOption ? setWorkflowId(selectedOption.value) : null
                  }
                  placeholder='Selecione um workflow para fazer a busca'
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: 650, // ou qualquer outro valor que você queira
                    }),
                  }}
                />
              </div>

              <div className={style.AsideSelectworkflowStepForm}>
                <span className={style.filterLabelRota}>WORKFLOW STEP</span>

                <CreatableSelect
                  className={style.AsideSelectGroupId}
                  options={workflowStep.map((step) => ({
                    value: step.id,
                    label: `${step.id} - ${step.title}`,
                  }))}
                  isSearchable
                  onChange={(selectedOption) =>
                    selectedOption
                      ? setWorkflowStepId(selectedOption.value)
                      : null
                  }
                  placeholder='Selecione um workflow Step para fazer a busca'
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: 650, // ou qualquer outro valor que você queira
                    }),
                  }}
                />
              </div>
            </div>
          </>
        )}
        {caller === 'workflowFormGroup' && (
          <>
            <div className={style.AsideSelectMainworkflowStepForm}>
              <div className={style.AsideSelectworkflowStepForm}>
                <span className={style.filterLabelRota}>WORKFLOW FORM</span>

                <CreatableSelect
                  className={style.AsideSelectGroupId}
                  options={workflowForm.map((form) => ({
                    value: form.id,
                    label: `${form.id} - ${form.title}`,
                  }))}
                  isSearchable
                  onChange={(selectedOption) =>
                    selectedOption
                      ? setWorkflowFormId(selectedOption.value)
                      : null
                  }
                  placeholder='Selecione um workflow Form para fazer a busca'
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: 650,
                    }),
                  }}
                />
              </div>
              <div className={style.AsideSelectworkflowStepForm}>
                <span className={style.filterLabelRota}>WORKFLOW</span>

                <CreatableSelect
                  className={style.AsideSelectGroupId}
                  options={workflow.map((wf) => ({
                    value: wf.id,
                    label: `${wf.id} - ${wf.title}`,
                  }))}
                  isSearchable
                  onChange={(selectedOption) =>
                    selectedOption ? setWorkflowId(selectedOption.value) : null
                  }
                  placeholder='Selecione um workflow para fazer a busca'
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: 650,
                    }),
                  }}
                />
              </div>
            </div>
          </>
        )}
        {caller === 'clientProductRequestId' && (
          <>
            <div className={style.AsideSelectMainworkflowStepForm}>
              <div className={style.AsideSelectworkflowStepForm}>
                <span className={style.filterLabelRota}>
                  CLIENT PRODUCT REQUEST
                </span>

                <CreatableSelect
                  className={style.AsideSelectGroupId}
                  options={clientProductRequestEdit.map((cli) => ({
                    value: cli.id,
                    label: `${cli.id}- ${cli.product_key}`,
                  }))}
                  isSearchable
                  onChange={(selectedOption) =>
                    selectedOption
                      ? setClientProductRequestEditId(selectedOption.value)
                      : null
                  }
                  placeholder='Selecione um cliente product request para fazer a busca'
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: 650,
                    }),
                  }}
                />
              </div>
            </div>
          </>
        )}
        {caller === 'clientFunctionEdit' && (
          <>
            <div className={style.AsideSelectMainworkflowStepForm}>
              <div className={style.AsideSelectworkflowStepForm}>
                <span className={style.filterLabelRota}>CLIENT FUNCTION</span>

                <CreatableSelect
                  className={style.AsideSelectGroupId}
                  options={clientFunctionEdit.map((cli) => ({
                    value: cli.id,
                    label: `${cli.id}- ${cli.title}`,
                  }))}
                  isSearchable
                  onChange={(selectedOption) =>
                    selectedOption
                      ? setClientFunctionEditId(selectedOption.value)
                      : null
                  }
                  placeholder='Selecione um cliente function para fazer a busca'
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: 650,
                    }),
                  }}
                />
              </div>
            </div>
          </>
        )}
        <div className={style.containerTableTwo}>
          <Table columnOrder={columnOrder}>
            <TableRow
              filteredWorkflowList={filteredWorkflowList}
              setWorkflowList={setWorkflowList}
              columnOrder={columnOrder}
              setChanges={setChanges}
              changes={changes}
              setSelectedRow={setSelectedRow}
              deleteMode={deleteMode}
              deleteRowIndex={deleteRowIndex}
              setDeleteRowIndex={setDeleteRowIndex}
              editedItems={editedItems}
              setEditedItems={setEditedItems}
              selectedRow={selectedRow ? selectedRow.toString() : null}
            />
          </Table>
          <div className={style.espaço} />
        </div>
        <div className={style.buttonContainer}>
          <button
            className={`style.buttonSave ${caller === 'clientService' ? style.buttonDisabled : style.buttonSave}`}
            onClick={handleSave}
            disabled={caller === 'clientService'}
          >
            <FiSave />
          </button>
          <button
            className={`style.buttonAtualizar ${caller === 'clientService' ? style.buttonDisabled : style.buttonAtualizar}`}
            onClick={handleAtt}
            disabled={caller === 'clientService'}
          >
            <FiRefreshCcw />
          </button>
          <button
            className={`style.buttonDeletar ${caller === 'clientService' ? style.buttonDisabled : style.buttonDeletar}`}
            onClick={handleDeleteOrConfirm}
            disabled={caller === 'clientService'}
          >
            {deleteMode ? 'Confirmar' : <VscRemove />}
          </button>
          {deleteMode && (
            <button
              className={`style.buttonCancelar ${caller === 'clientService' ? style.buttonDisabled : style.buttonCancelar}`}
              onClick={handleCancel}
              disabled={caller === 'clientService'}
            >
              Cancelar
            </button>
          )}
          <button
            className={`style.buttonAdd ${caller === 'clientService' ? style.buttonDisabled : style.buttonAdd}`}
            onClick={handleAdd}
            disabled={caller === 'clientService'}
          >
            <IoMdAdd />
          </button>
          <button
            className={`style.buttonAdd ${caller === 'clientService' ? style.buttonDisabled : style.buttonAdd}`}
            onClick={handleDuplicate}
            disabled={caller === 'clientService'}
          >
            <BiAddToQueue />
          </button>
        </div>
      </div>
    </aside>
  )
}
