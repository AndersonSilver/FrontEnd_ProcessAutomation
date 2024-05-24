import { ChangeEvent, useState } from 'react'
import ReactModal from 'react-modal'

interface TableItemProps {
  item: any
  keyName: string
  className: string
  setChanges: (changes: any[]) => void
  changes: any[]
  deleteMode: boolean
  setDeleteRowIndex: (index: number | null) => void
  editedItems: any[]
  setEditedItems: React.Dispatch<React.SetStateAction<any[]>>
  notValue: unknown | undefined
}

export default function TableItem({
  item,
  keyName,
  className,
  setChanges,
  changes,
  editedItems,
  setEditedItems,
  deleteMode,
  notValue,
}: TableItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState<any>('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalInputValue, setModalInputValue] = useState('')

  const [editedItem, setEditedItem] = useState<any>([])

  // useEffect(() => {
  //   if (item) {
  //     setValue(item[keyName])
  //   }
  // }, [item, keyName])

  const handleDoubleClick = () => {
    // if (keyName !== 'id') {
    //   setModalIsOpen(true)
    //   setModalInputValue(value)
    // }
  }

  const handleModalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setModalInputValue(event.target.value)
  }

  const handleModalClose = () => {
    // setModalIsOpen(false)
    // if (modalInputValue) {
    //   setValue(modalInputValue)
    // }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // const updatedItem = { ...item, [keyName]: event.target.value }
    // setValue(event.target.value)
    // setEditedItem((prev) => {
    //   const itemIndex = prev?.find((i) => i.id === updatedItem.id)
    //   if (itemIndex) {
    //     setEditedItem({ ...item, [keyName]: event.target.value })
    //   } else {
    //     return [...prev, updatedItem]
    //   }
    // })
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
        {value &&
        (typeof value === 'object' ? JSON.stringify(value) : value.toString())
          .length > 80
          ? (typeof value === 'object'
              ? JSON.stringify(value)
              : value.toString()
            ).substring(0, 80) + '...'
          : typeof value === 'object'
          ? JSON.stringify(value)
          : value.toString()}
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
            typeof modalInputValue === 'object'
              ? JSON.stringify(modalInputValue, null, 2)
              : String(modalInputValue)
          }
          onChange={(e) => handleBlur(e)}
          style={{
            backgroundColor: '#1E1E1E',
            color: '#D4D4D4',
            fontFamily: 'Courier New, Monaco, monospace',
            padding: '10px',
            width: '500px',
            height: '450px',
            marginBottom: '20px',
            border: 'none',
            outline: 'none',
          }}
        />
      </ReactModal>

      {renderItemValue()}
    </div>
  )
}
