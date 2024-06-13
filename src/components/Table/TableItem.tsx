import { useQueryClientManual } from '@/hooks/useQueryClientManual'
import { Workflow } from '@/services/Workflow/dto/WorkflowDto'
import { ChangeEvent, useMemo, useState } from 'react'
import ReactModal from 'react-modal'
import { styles } from './styles'

interface TableItemProps {
  item: Workflow
  keyName: keyof Workflow
  className: string
  setChanges: (changes: unknown[]) => void
  changes: unknown[]
  deleteMode: boolean
  setDeleteRowIndex?: (index: number | null) => void
  editedItems: unknown[]
  setEditedItems: React.Dispatch<React.SetStateAction<unknown[]>>
  notValue: unknown | undefined
}

export default function TableItem({
  item,
  keyName,
  className,
  notValue,
}: TableItemProps) {
  const { getQuery, updateQuery } = useQueryClientManual()

  const [value, setValue] = useState<string>()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const currentValue = useMemo(
    () => value ?? item?.[keyName as keyof Workflow],
    [keyName, item, value],
  )

  const handleDoubleClick = () => {
    if (keyName !== 'id') {
      setModalIsOpen(true)
    }
  }

  const handleModalClose = () => {
    const currentList = getQuery(['workflows']) as Workflow[]

    const updateItem = currentList?.map((state: Workflow) => {
      if (state?.id === item?.id) return { ...state, [keyName]: value }
      else return state
    })

    updateQuery(['workflows'], updateItem)

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
