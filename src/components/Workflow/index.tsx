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
import { useAuthContext } from '@/hooks/useAuth'

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
  const [workflowFormData, setWorkflowFormData] = useState<WorkflowData[]>([])
  const [workflowForm, setWorkflowForm] = useState<WorkflowData[]>([])
  const [workflowFormId, setWorkflowFormId] = useState<string>('')
  const [client, setClient] = useState<WorkflowData[]>([])

  const { user } = useAuthContext()

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
  }

  const fetchData = useCallback(
    async ({ caller }: WorkflowProtocolProps) => {
      const { service, setter } = serviceMap[caller]
      let data: WorkflowData[] = []
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
        case 'workflowForm':
          break
        default:
          break
      }

      if (!shouldFetch) return

      const response = await service(...params)
      data = response.data || []

      if (caller === 'workflowStep') {
        setWorkflowId('')
      } else if (caller === 'workflowForm') {
        setWorkflowFormData(data)
      }

      if (data.length > 0) {
        setter(data)
        setWorkflowList(data)
      }
    },
    [workflowGroupId, workflowId, workflowStepId, workflowFormId, client],
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
          item.workflow_form_fields = item.workflow_form_fields.map(
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
          if (item.isNew) {
            resultworkflow = WorkflowService.postWorkflows(item)
          } else {
            resultworkflow = WorkflowService.putWorkflows(item, item.id)
          }
          displaySuccess('workflow salvo com sucesso!')
          return resultworkflow
        } else if (caller === 'workflowGroup') {
          let resultworkflowGroup
          if (item.isNew) {
            resultworkflowGroup = WorkflowGroupService.postWorkflowsGroup(item)
          } else {
            resultworkflowGroup = WorkflowGroupService.putWorkflowsGroup(
              item,
              item.id,
            )
          }
          displaySuccess('workflow Group salvo com sucesso!')
          return resultworkflowGroup
        } else if (caller === 'workflowGroupItems') {
          let resultworkflowGroupItem
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
          displaySuccess('workflow Group Item salvo com sucesso!')
          return resultworkflowGroupItem
        } else if (caller === 'workflowProduct') {
          let resultworkflowProduct
          if (item.isNew) {
            resultworkflowProduct =
              WorkflowProductService.postWorkflowsProduct(item)
          } else {
            resultworkflowProduct = WorkflowProductService.putWorkflowsProduct(
              item,
              item.id,
            )
          }
          displaySuccess('workflow Product salvo com sucesso!')
          return resultworkflowProduct
        } else if (caller === 'workflowStep') {
          let resultworkflowStep
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
          displaySuccess('workflow Step salvo com sucesso!')
          return resultworkflowStep
        } else if (caller === 'workflowStepForm') {
          if (!workflowId || !workflowStepId) {
            console.error('workflowId ou workflowStepId não estão definidos')
            return
          }
          let resultworkflowStepForm
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
          displaySuccess('workflow Step Form salvo com sucesso!')
          return resultworkflowStepForm
        } else if (caller === 'workflowForm') {
          let resultworkflowForm
          if (item.isNew) {
            resultworkflowForm = WorkflowFormService.postWorkflowForm(item)
          } else {
            resultworkflowForm = WorkflowFormService.putWorkflowForm(
              item,
              item.id,
            )
          }
          displaySuccess('workflow Form salvo com sucesso!')
          return resultworkflowForm
        } else if (caller === 'clientProductRequest') {
          const clientName = user?.client || ''

          const clientIds: Record<string, string> = {
            tradicao: '61a21c71-44b3-4169-8bb1-d94c34aab8cc',
            porto: 'eb864cba-03fc-4969-bc51-d388f3b465f0',
            allianz: 'e59fd743-9c7b-4a82-9140-cc034caa55ab',
            tech: '3e2cc5c6-d2da-4974-8812-fa9162b88098',
            serviceit: 'd6c163b9-631e-402e-adcf-0f3f8f114c74',
            bradesco: 'e9b99e04-8881-4fb5-9bbc-e90462237d0c',
            portorh: '2e7fb57f-ce07-4fa3-8570-b8e90e4190b9',
            unifisa: '5af88692-85bd-41e4-b868-7ac0790014be',
            allan: '24900439-5195-42e7-ba12-b4424a104501',
            'feature-test': 'bae5a966-9fb6-4ae5-9d6e-03a690f0426c',
            mapfre: '8034dc19-f93c-4be6-9629-a16ac59b3861',
            canopus: '8fc11063-2db3-4746-9795-0b1865a7b759',
            gustey: 'e9cd217c-7fe0-4fbc-9607-f5fadd573f10',
            test: '37a60585-c2db-4ae4-8f7f-85f85f6f3193',
          }

          const client_id = clientIds[clientName] || ''
          let resultClientProductRequest
          if (item.isNew) {
            resultClientProductRequest =
              ClientProductRequestService.postClientProductRequest(
                item,
                client_id,
              )
          } else {
            resultClientProductRequest =
              ClientProductRequestService.putClientProductRequest(
                item,
                client_id,
                item.id,
              )
          }
          displaySuccess('Client Product Request salvo com sucesso!')
          return resultClientProductRequest
        }
      })
      await Promise.all(promises)

      fetchData({ caller: caller })

      setEditedItems([])
    } catch (error) {
      displayError('Erro ao salvar!')
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
            const clientName = user?.client || ''

            const clientIds: Record<string, string> = {
              tradicao: '61a21c71-44b3-4169-8bb1-d94c34aab8cc',
              porto: 'eb864cba-03fc-4969-bc51-d388f3b465f0',
              allianz: 'e59fd743-9c7b-4a82-9140-cc034caa55ab',
              tech: '3e2cc5c6-d2da-4974-8812-fa9162b88098',
              serviceit: 'd6c163b9-631e-402e-adcf-0f3f8f114c74',
              bradesco: 'e9b99e04-8881-4fb5-9bbc-e90462237d0c',
              portorh: '2e7fb57f-ce07-4fa3-8570-b8e90e4190b9',
              unifisa: '5af88692-85bd-41e4-b868-7ac0790014be',
              allan: '24900439-5195-42e7-ba12-b4424a104501',
              mapfre: '8034dc19-f93c-4be6-9629-a16ac59b3861',
              canopus: '8fc11063-2db3-4746-9795-0b1865a7b759',
              gustey: 'e9cd217c-7fe0-4fbc-9607-f5fadd573f10',
              test: '37a60585-c2db-4ae4-8f7f-85f85f6f3193',
            }

            const client_id = clientIds[clientName] || ''
            await ClientProductRequestService.deleteClientProductRequest(
              client_id,
              selectedRow.toString(),
            )
            displaySuccess('Client Product Request deletado com sucesso!')
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
    }
  }, [workflowGroupId, caller, workflowId, workflowStepId, fetchData])

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
          <button className={style.buttonSave} onClick={handleSave}>
            <FiSave />
          </button>
          <button className={style.buttonAtualizar} onClick={handleAtt}>
            <FiRefreshCcw />
          </button>
          <button
            className={style.buttonDeletar}
            onClick={handleDeleteOrConfirm}
          >
            {deleteMode ? 'Confirmar' : <VscRemove />}
          </button>
          {deleteMode && (
            <button className={style.buttonCancelar} onClick={handleCancel}>
              Cancelar
            </button>
          )}
          <button className={style.buttonAdd} onClick={handleAdd}>
            <IoMdAdd />
          </button>
          <button className={style.buttonAdd} onClick={handleDuplicate}>
            <BiAddToQueue />
          </button>
        </div>
      </div>
    </aside>
  )
}
