/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useAuthContext } from '@/hooks/useAuth'
import WorkflowService from '@/services/Workflow/WorkflowService'
import WorkflowGroupService from '@/services/WorkflowGroup/WorkflowGroupService'
import WorkflowGroupItemService from '@/services/WorkflowGroupItem/WorkflowGroupItemService'
import WorkflowProductService from '@/services/WorkflowProduct/WorkflowProductService'
import WorkflowStepService from '@/services/WorkflowStep/WorkflowStepService'
import WorkflowStepFormService from '@/services/WorkflowStepForm/WorkflowStepFormService'
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

type WorkflowProtocolProps = {
  caller:
    | 'workflow'
    | 'workflowGroup'
    | 'workflowGroupItems'
    | 'workflowProduct'
    | 'workflowStep'
    | 'workflowStepForm'
}

export type WorkflowData = { isNew?: boolean; id?: string } & Workflow & {
    [key: string]: any
  }

export function WorkflowComponent({ caller }: WorkflowProtocolProps) {
  // const { user } = useAuthContext()
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
  }

  const fetchData = useCallback(
    async ({ caller }: WorkflowProtocolProps) => {
      const { service, setter } = serviceMap[caller]
      let data

      if (caller === 'workflowGroupItems') {
        if (!workflowGroupId) {
          return
        }
        const response = await service(workflowGroupId, '')
        data = response.data
      } else if (caller === 'workflowStep') {
        if (!workflowId) {
          return
        }
        const response = await service(workflowId, '')
        data = response.data
        setWorkflowId('')
      } else if (caller === 'workflowStepForm') {
        if (!workflowStepId || !workflowId) {
          return
        }
        const response = await service(workflowId, workflowStepId)
        data = response.data
        // setWorkflowStepId('')
        // setWorkflowId('')
      } else {
        const response = await service('', '')
        data = response.data
      }
      setter(data)
      setWorkflowList(data as WorkflowData[])
    },
    [workflowGroupId, workflowId, workflowStepId],
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
  }, [workflowList, filter])

  useEffect(() => {
    console.log('workflowId:', workflowId)
    console.log('workflowStepId:', workflowStepId)
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
    }
  }, [workflowGroupId, caller, workflowId, workflowStepId])

  useEffect(() => {
    if (workflowStepId) {
      fetchData({ caller: 'workflowStepForm' })
    }
  }, [workflowStepId])

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
            <span className={style.filterLabelRota}>
              Selecione um grupo para fazer a busca dos items
            </span>
            <select
              className={style.AsideSelectGroupId}
              onChange={(e) => setworkflowGroupId(e.target.value)}
            >
              <option value='' className={style.selectOption}>
                Selecione um grupo para fazer a busca dos items
              </option>
              {workflowGroups.map((workflowGroup) => (
                <option
                  key={workflowGroup.id}
                  value={workflowGroup.id}
                  className={style.selectOption}
                >
                  {`${workflowGroup.id} - ${workflowGroup.title}`}
                </option>
              ))}
            </select>
          </>
        )}
        {caller === 'workflowStep' && (
          <>
            <span className={style.filterLabelRota}>
              Selecione um workflow para fazer a busca dos items
            </span>
            <select
              className={style.AsideSelectGroupId}
              onChange={(e) => setWorkflowId(e.target.value)}
            >
              <option value=''>Selecione um workflow para fazer a busca</option>
              {workflow.map((workflow) => (
                <option key={workflow.id} value={workflow.id}>
                  {`${workflow.id} - ${workflow.title}`}
                </option>
              ))}
            </select>
          </>
        )}
        {caller === 'workflowStepForm' && (
          <>
            <div className={style.AsideSelectMainworkflowStepForm}>
              <div className={style.AsideSelectworkflowStepForm}>
                <span className={style.filterLabelRota}>WORKFLOW</span>

                <select
                  className={style.AsideSelectGroupId}
                  onChange={(e) => setWorkflowId(e.target.value)}
                >
                  <option value=''>
                    Selecione um workflow para fazer a busca
                  </option>
                  {workflow.map((workflow) => (
                    <option key={workflow.id} value={workflow.id}>
                      {`${workflow.id} - ${workflow.title}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className={style.AsideSelectworkflowStepForm}>
                <span className={style.filterLabelRota}>WORKFLOW STEP</span>

                <select
                  className={style.AsideSelectGroupId}
                  onChange={(e) => setWorkflowStepId(e.target.value)}
                >
                  <option value=''>
                    Selecione um workflow Step para fazer a busca
                  </option>
                  {workflowStep.map((workflowStep) => (
                    <option key={workflowStep.id} value={workflowStep.id}>
                      {`${workflowStep.id} - ${workflowStep.title}`}
                    </option>
                  ))}
                </select>
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
