import { Workflow } from '@/services/Workflow/dto/WorkflowDto'
import { WorkflowData } from '../Workflow'
import style from '../Workflow/styles.module.scss'
import TableItem from './TableItem'

export type OptionsFlags<T> = {
  [key in keyof T]: keyof unknown
}

interface TableRowProps {
  columnOrder: string[]
  setChanges: (changes: unknown[]) => void
  changes: unknown[]
  deleteMode: boolean
  editedItems: unknown[]
  setEditedItems: React.Dispatch<React.SetStateAction<unknown[]>>
  selectedRow: number | null
  setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>
  deleteRowIndex: number | null
  setDeleteRowIndex: React.Dispatch<React.SetStateAction<number | null>>
  filteredWorkflowList?: Workflow[]
  setWorkflowList: React.Dispatch<React.SetStateAction<WorkflowData[]>>
}

export default function TableRow({
  filteredWorkflowList,
  setWorkflowList,
  columnOrder,
  setChanges,
  changes,
  setSelectedRow,
  deleteMode,
  deleteRowIndex,
  setDeleteRowIndex,
  editedItems,
  setEditedItems,
  selectedRow,
}: TableRowProps) {
  const handleRowClick = (index: number) => {
    setSelectedRow(index)
    setDeleteRowIndex(index)
  }

  return filteredWorkflowList?.map((item: WorkflowData, index: number) => (
    <tr
      key={`item-${item?.id}-${index}`}
      className={`${index === selectedRow ? style.selectedRow : ''} ${
        index === deleteRowIndex ? style.deleteMode : ''
      } ${item.isNew ? style.newId : ''}`}
      onClick={() => handleRowClick(index)}
    >
      <td>{item.id ? index + 1 : ''}</td>

      {columnOrder?.map((column, position: number) => (
        <td key={`row-${Math.random()}-${position}`}>
          <TableItem
            item={item}
            keyName={column as keyof Workflow}
            className={style.body_td}
            setChanges={setChanges}
            changes={changes}
            deleteMode={deleteMode}
            setDeleteRowIndex={setDeleteRowIndex}
            editedItems={editedItems}
            setEditedItems={setEditedItems}
            notValue={item[column as keyof Workflow]}
            setWorkflowList={setWorkflowList}
          />
        </td>
      ))}
    </tr>
  ))
}
