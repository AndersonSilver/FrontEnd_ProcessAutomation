import style from '../Workflow/styles.module.scss'
import TableItem from './TableItem'

interface TableRowProps {}

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
}: any) {
  const handleRowClick = (index: number) => {
    setSelectedRow(index)
    setDeleteRowIndex(index)
  }
  return filteredWorkflowList.map((item: any, index: number) => (
    <tr
      key={`item-${item?.id}-${index}`}
      className={`${index === selectedRow ? style.selectedRow : ''} ${
        index === deleteRowIndex ? style.deleteMode : ''
      } ${item.isNew ? style.newId : ''}`}
      onClick={() => handleRowClick(index)}
    >
      <td>{item.id ? index + 1 : ''}</td>

      {columnOrder?.map((column: any, position: number) => (
        <td key={`row-${Math.random()}-${position}`}>
          <TableItem
            item={item}
            setWorkflowList={setWorkflowList}
            keyName={column}
            className={style.body_td}
            setChanges={setChanges}
            changes={changes}
            deleteMode={deleteMode}
            setDeleteRowIndex={setDeleteRowIndex}
            editedItems={editedItems}
            setEditedItems={setEditedItems}
            notValue={item[column]}
          />
        </td>
      ))}
    </tr>
  ))
}
