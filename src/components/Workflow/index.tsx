'use client'

import { useAuthContext } from '@/src/hooks/auth'
import WorkflowService from '@/src/services/Workflow/WorkflowService'
import { Workflow } from '@/src/services/Workflow/dto/WorkflowDto'
import { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react'
import Table from '../Table/Table'
import TableRow from '../Table/TableRow'
import style from './styles.module.scss'
import { BiAddToQueue } from "react-icons/bi";
import { FiRefreshCcw, FiSave  } from "react-icons/fi";
import { VscRemove } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import { displayError, displaySuccess } from '../../utils/functions/messageToast'


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
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);


  useEffect(() => {
    const fetchCacheKeys = async () => {
      if (typeof window !== 'undefined' && window.caches) {
        const keys = await window.caches.keys();
        setCacheKeys(keys);
      }
    };
  
    fetchCacheKeys();
  }, []);
  
  useEffect(() => {
    const clearCache = async () => {
      if (typeof window !== 'undefined' && window.caches && cacheKeys.length > 0) {
        await Promise.all(cacheKeys.map((key) => window.caches.delete(key)));
        window.location.reload();
      }
    };
  
    clearCache();
  }, [cacheKeys]);
  

  const columnOrder = useMemo(
    () => Object?.keys?.(workflowList?.[0] ?? {}),
    [workflowList]
  )

  const fetchData = useCallback(async () => {
    if (user) {
      const { data } = await WorkflowService.getWorkflows()

      setWorkflowList(data as WorkflowData[])
    }
  }, [user])

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
      const promises = editedItems.map(item => {
        delete item.sla;
        delete item.customer_view_form_id;  
        for (const key in item) {
          if (item[key] === null) {
            delete item[key];
          }
        }
  
        if (item.filters && typeof item.filters === 'string') {
          try {
            item.filters = JSON.parse(item.filters);
          } catch (error) {
            console.error('Erro ao converter item.filters para objeto:', error);
          }
        }
  
        if (item.isNew) {
          return WorkflowService.postWorkflows(item);
        } else {
          return WorkflowService.putWorkflows(item, item.id);
        }
      });
  
      console.log("promises", promises)
  
      await Promise.all(promises);
  
      fetchData();
  
      setEditedItems([]);
      displaySuccess('workflow salvo com sucesso!')
    } catch (error) {
      displayError('Erro ao salvar o workflow!')
      console.error("Erro ao salvar os itens editados:", error);
    }
  };

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
        obj[key] = undefined
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
            <FiSave  />
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
          <button className={style.buttonAdd}>
            <BiAddToQueue />
          </button>
        </div>
      </div>
    </aside>
  )
}
