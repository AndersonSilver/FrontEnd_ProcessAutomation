'use client'

import { useAuthContext } from '@/src/hooks/auth'
import WorkflowService from '@/src/services/Workflow/WorkflowService'
import { Workflow } from '@/src/services/Workflow/dto/WorkflowDto'
import { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react'
import Table from '../Table/Table'
import TableRow from '../Table/TableRow'
import style from './styles.module.scss'

interface Filter {
  field: string
  value: string | string[]
}

export type WorkflowData = { isNew?: boolean } & Workflow & { [key: string]: any }

export function WorkflowComponent() {
  const { user } = useAuthContext()

  const [workflowList, setWorkflowList] = useState<WorkflowData[]>([])
  const [filter, setFilter] = useState<Filter | null>(null)
  const [filteredWorkflowList, setFilteredWorkflowList] = useState<any[]>([])
  const [changes, setChanges] = useState<any[]>([])
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [deleteMode, setDeleteMode] = useState(false)
  const [deleteRowIndex, setDeleteRowIndex] = useState<number | null>(null)
  const [editedItems, setEditedItems] = useState<any[]>([])
  

  const columnOrder = useMemo(
    () => Object?.keys?.(workflowList?.[0] ?? {}),
    [workflowList]
  )

  const fetchData = useCallback(async () => {
    if (user) {
      const { data } = await WorkflowService.getWorkflows(
        user?.client as string,
        user?.clientServices as string
      )

      setWorkflowList(data as WorkflowData[])
    }
  }, [user])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log("APERTOU ENTER")
  
      const match = event.currentTarget.value.match(/(\w+)\s*=\s*'([^']*)'/)
      console.log("MATCH", match)
      if (match) {
        const values = match[2].split(',').map((value) => value.trim())
        setFilter({ field: match[1], value: values })
        console.log("filter", filter)
      } else {
        setFilter(null)
        console.log("filter", filter)
      }
    }
  }

  const handleSave = () => {
    const newList = [...workflowList]

    changes.forEach((change: any) => {
      let item = newList.find((item) => item?.isNew)

      if (item) {
        const key = change?.keyName

        // item?.[key] = change?.value
      }
    })
    setWorkflowList(newList)
    setChanges([])
  }

  const handleDeleteOrConfirm = () => {
    if (deleteMode) {
      setDeleteRowIndex(selectedRow)
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
        obj[key] = '---'
        return obj
      }, {})

      newItem.isNew = true

      setWorkflowList([...workflowList, newItem])
    }
  }

  const handleAtt = () => {
    window.location.reload()
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    let list = [...workflowList]
    if (filter) {
      list = list.filter((item) =>
        Array.isArray(filter.value)
          ? filter.value.some((fv) =>
              String(item[filter.field])
                .trim()
                .toLowerCase()
                .includes(fv.trim().toLowerCase())
            )
          : String(item[filter.field])
              .trim()
              .toLowerCase()
              .includes(filter.value.trim().toLowerCase())
      )
    }
    console.log("list", list)
    setFilteredWorkflowList(list)
  }, [workflowList, filter])

  return (
    <aside className={style.AsideContainer}>
      <div className={style.containerTable}>
        <div className={style.menuFiltro}>
          <span className={style.filterLabel}>WORKFLOW</span>
          <input
            className={style.filterText}
            type='text'
            onKeyDown={handleKeyDown}
            placeholder='Campo de pesquisa'
            autoFocus
          />
        </div>
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
              selectedRow={selectedRow}
            />
          </Table>
          <div className={style.espaço} />
        </div>
        <div className={style.buttonContainer}>
          <button className={style.buttonSave} onClick={handleSave}>
            Salvar
          </button>
          <button className={style.buttonAtualizar} onClick={handleAtt}>
            Atualizar
          </button>
          <button
            className={style.buttonDeletar}
            onClick={handleDeleteOrConfirm}
          >
            {deleteMode ? 'Confirmar' : '-'}
          </button>
          {deleteMode && (
            <button className={style.buttonCancelar} onClick={handleCancel}>
              Cancelar
            </button>
          )}
          <button className={style.buttonAdd} onClick={handleAdd}>
            +
          </button>
        </div>
      </div>
    </aside>
  )
}
