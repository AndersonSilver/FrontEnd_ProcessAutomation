// import { useQueryClientManual } from '@/hooks/useQueryClientManual'
import { Workflow } from '@/services/Workflow/dto/WorkflowDto'
import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'
import ReactModal from 'react-modal'
import { styles } from './styles'
import { WorkflowData } from '../Workflow'

interface TableItemProps {
  item: Workflow
  keyName: keyof Workflow
  className: string
  setChanges: (changes: Workflow[]) => void
  changes: Workflow[]
  deleteMode: boolean
  setDeleteRowIndex?: (id: string | null) => void
  editedItems: Workflow[]
  setEditedItems: React.Dispatch<React.SetStateAction<Workflow[]>>
  notValue: Workflow | string | number | boolean | null | undefined | object
  setWorkflowList: Dispatch<SetStateAction<WorkflowData[]>>
}

export default function TableItem({
  item,
  keyName,
  className,
  notValue,
  editedItems,
  setEditedItems,
  setWorkflowList,
}: TableItemProps) {
  const [value, setValue] = useState<string>()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const currentValue = useMemo(
    () => value ?? item?.[keyName as keyof Workflow],
    [keyName, item, value],
  )

  const handleEdit = (newItem: Workflow) => {
    const existingItemIndex = editedItems.findIndex(
      (item: Workflow) => item.id === newItem.id,
    )

    if (existingItemIndex !== -1) {
      setEditedItems((prevItems) =>
        prevItems.map((item, index) =>
          index === existingItemIndex ? newItem : item,
        ),
      )
    } else {
      setEditedItems((prevItems) => [...prevItems, newItem])
    }
  }

  const handleDoubleClick = () => {
    setValue(item[keyName as keyof Workflow] as string)
    setModalIsOpen(true)
  }

  const handleModalClose = () => {
    setWorkflowList((prevState: WorkflowData[]) => {
      const newArray = prevState?.map((state: Workflow) => {
        if (state?.id === item?.id) {
          const updatedItem = { ...state, [keyName]: value }
          if (JSON.stringify(state) !== JSON.stringify(updatedItem)) {
            handleEdit(updatedItem)
          }
          return updatedItem
        } else {
          return state
        }
      })

      return newArray
    })

    setValue('') // Reset o valor aqui
    setModalIsOpen(false)
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event?.preventDefault()

    setValue(event?.target?.value)
  }

  const renderItemValue = () => {
    if (!notValue) return '---'

    return (
      <span>
        {currentValue &&
        (typeof currentValue === 'object'
          ? JSON.stringify(currentValue)
          : (currentValue as string).toString()
        ).length > 80
          ? (typeof currentValue === 'object'
              ? JSON.stringify(currentValue)
              : (currentValue as string).toString()
            ).substring(0, 80) + '...'
          : typeof currentValue === 'object'
            ? JSON.stringify(currentValue)
            : (currentValue as string).toString()}
      </span>
    )
  }

  return (
    <div className={className} onDoubleClick={handleDoubleClick}>
      <ReactModal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleModalClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
          },
          content: {
            color: '#fff',
            backgroundColor: '#1E1E1E',
            width: '700px',
            height: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '100px',
            textAlign: 'center',
            lineHeight: '20px',
            overflow: 'hidden',
            borderRadius: '15px',
            boxShadow: '5px 5px 5px rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        <textarea
          value={
            typeof currentValue === 'object'
              ? JSON.stringify(currentValue, null, 2)
              : String(currentValue)
          }
          onChange={handleChange}
          style={styles.tableItem}
        />
      </ReactModal>

      {renderItemValue()}
    </div>
  )
}
