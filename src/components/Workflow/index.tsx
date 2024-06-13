/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthContext } from '@/hooks/useAuth'
import WorkflowService from '@/services/Workflow/WorkflowService'
import { Workflow } from '@/services/Workflow/dto/WorkflowDto'
import { useQuery } from '@tanstack/react-query'
import { KeyboardEvent, useMemo, useState } from 'react'
import Table from '../Table/Table'
import TableRow from '../Table/TableRow'
import style from './styles.module.scss'

interface Filter {
  field: string
  value: string | string[]
}

export type WorkflowData = { isNew?: boolean } & Workflow

export function WorkflowComponent() {
  const { user } = useAuthContext()

  const [filter, setFilter] = useState<Filter | null>(null)
  const [filteredWorkflowList, setFilteredWorkflowList] = useState<unknown[]>(
    [],
  )
  const [changes, setChanges] = useState<unknown[]>([])
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [deleteMode, setDeleteMode] = useState(false)
  const [deleteRowIndex, setDeleteRowIndex] = useState<number | null>(null)
  const [editedItems, setEditedItems] = useState<unknown[]>([])

  const { data: workflowList } = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      const { data } = await WorkflowService.getWorkflows()

      return data
    },
    enabled: !!user,
  })

  const columnOrder = useMemo(
    () => Object?.keys?.(workflowList?.[0] ?? {}),
    [workflowList],
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setFilter(null)
      const match = event.currentTarget.value.match(/(\w+)\s*=\s*'([^']*)'/)
      if (match) {
        const values = match[2].split(',').map((value) => value.trim())
        setFilter({ field: match[1], value: values })
      }
    }
  }

  const handleSave = () => {
    const newList: WorkflowData[] = [...(workflowList ?? [])]

    // changes.forEach((change: unknown) => {
    //   const item = newList?.find((item) => item?.isNew)

    //   if (item) {
    //     const key = (change as any)?.keyName as keyof WorkflowData
    //     const value = (change as any)?.value

    //     (item as any)[key] = value
    //   }
    // })
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
    if (workflowList && workflowList?.length > 0) {
      const firstItem = workflowList[0]

      const newItem = Object.keys(firstItem).reduce((obj: any, key) => {
        obj[key] = '---'
        return obj
      }, {})

      newItem.isNew = true
    }
  }

  const handleAtt = () => {
    // window.location.reload()
  }

  return (
    <aside className={style.AsideContainer}>
      <div className={style.containerTable}>
        <div className={style.menuFiltro}>
          <span className={style.filterLabel}>WORKFLOW</span>
          <input
            className={style.filterText}
            type='text'
            onKeyDown={handleKeyDown}
            placeholder=''
          />
        </div>
        <div className={style.containerTableTwo}>
          <Table columnOrder={columnOrder}>
            <TableRow
              filteredWorkflowList={workflowList}
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
