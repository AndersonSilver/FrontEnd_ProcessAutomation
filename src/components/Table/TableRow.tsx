import { Workflow } from '@/services/Workflow/dto/WorkflowDto'
import { WorkflowData } from '../Workflow'
import style from '../Workflow/styles.module.scss'
import TableItem from './TableItem'

export type OptionsFlags<T> = {
  [key in keyof T]: keyof Workflow
}

interface TableRowProps {
  columnOrder: string[]
  setChanges: (changes: Workflow[]) => void
  changes: Workflow[]
  deleteMode: boolean
  editedItems: Workflow[]
  setEditedItems: React.Dispatch<React.SetStateAction<Workflow[]>>
  selectedRow: string | null
  setSelectedRow: React.Dispatch<React.SetStateAction<string | number | null>>
  deleteRowIndex: string | null
  setDeleteRowIndex: React.Dispatch<React.SetStateAction<string | null>>
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
  const handleRowClick = (id: string) => {
    setSelectedRow(id)
    setDeleteRowIndex(id)
  }

  return filteredWorkflowList?.map((item: WorkflowData, index: number) => (
    <tr
      key={`item-${item?.id}-${index}`}
      className={`${item.id === selectedRow ? style.selectedRow : ''} ${
        item.id === deleteRowIndex ? style.deleteMode : ''
      } ${item.isNew ? style.newId : ''}`}
      onClick={() => handleRowClick(item.id)}
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
