import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'
import ReactModal from 'react-modal'
import { WorkflowData } from '../Workflow'
import { styles } from './styles'

interface TableItemProps {
  item: unknown
  keyName: string
  className: string
  setChanges: (changes: unknown[]) => void
  changes: unknown[]
  deleteMode: boolean
  setDeleteRowIndex?: (index: number | null) => void
  editedItems: unknown[]
  setEditedItems: React.Dispatch<React.SetStateAction<unknown[]>>
  notValue: unknown | undefined
  setWorkflowList: Dispatch<SetStateAction<WorkflowData[]>>
}

export default function TableItem({
  item,
  keyName,
  className,
  notValue,
  setWorkflowList,
}: TableItemProps) {
  const [value, setValue] = useState<string>()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const currentValue = useMemo(() => value ?? item?.[keyName], [value])

  const handleDoubleClick = () => {
    if (keyName !== 'id') {
      setModalIsOpen(true)
    }
  }

  const handleModalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setModalInputValue(event.target.value)
  }

  const handleModalClose = () => {
    setWorkflowList((prevState) => {
      const newArray = prevState?.map((state) => {
        if (state?.id === item?.id) return { ...state, [keyName]: value }
        else return state
      })

      return newArray
    })

    setModalIsOpen(false)
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event?.preventDefault()

    setValue(event?.target?.value)
  }

  const handleBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // console.log('handleBlur')
    // setValue(event.target.value)
    // // event.preventDefault();
    // // setIsEditing(false);
    // if (item) {
    //   const newChanges = [...changes, { keyName, value }]
    //   // setChanges(newChanges);
    //   console.log('newChanges', newChanges)
    //   const itemIndex = editedItems.findIndex((i) => i.id === updatedItem.id)
    //   // if (itemIndex !== -1) {
    //   //   setEditedItem((prevItems: any[]) =>
    //   //     prevItems?.map((item, index) =>
    //   //       index === itemIndex ? updatedItem : item
    //   //     )
    //   //   );
    //   //   console.log('Item Atualizado', updatedItem);
    //   // } else {
    //   //   // setEditedItem((prevItems: any[]) => [...prevItems, updatedItem]);
    //   //   console.log('Item nao Atualizado', updatedItem);
    //   // }
    // }
  }

  const renderItemValue = () => {
    if (!notValue) return '---'

    return (
      <span>
        {currentValue &&
        (typeof currentValue === 'object'
          ? JSON.stringify(currentValue)
          : currentValue?.toString()
        ).length > 80
          ? (typeof currentValue === 'object'
              ? JSON.stringify(currentValue)
              : currentValue?.toString()
            ).substring(0, 80) + '...'
          : typeof currentValue === 'object'
            ? JSON.stringify(currentValue)
            : currentValue?.toString()}
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
            width: '550px',
            height: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '100px',
            textAlign: 'center',
            lineHeight: '200px',
            overflow: 'hidden',
            borderRadius: '20px',
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
