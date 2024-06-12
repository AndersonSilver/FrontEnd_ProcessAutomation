'use client'

import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'
import ReactModal from 'react-modal'
import { WorkflowData } from '../Workflow'
import { styles } from './styles'
import { useEffect } from 'react';

interface TableItemProps {
  item: any
  keyName: string
  className: string
  setChanges: (changes: any[]) => void
  changes: any[]
  deleteMode: boolean
  setDeleteRowIndex?: (index: number | null) => void
  editedItems: any[]
  setEditedItems: React.Dispatch<React.SetStateAction<any[]>>
  notValue: unknown | undefined
  setWorkflowList: Dispatch<SetStateAction<WorkflowData[]>>
}

export default function TableItem({
  item,
  keyName,
  className,
  editedItems,
  setEditedItems,
  notValue,
  setWorkflowList,
}: TableItemProps) {
  const [value, setValue] = useState<string>()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const currentValue = useMemo(() => value ?? item?.[keyName], [value])



  const handleEdit = (newItem: any) => {

    const existingItemIndex = editedItems.findIndex((item) => item.id === newItem.id);

    if (existingItemIndex !== -1) {

      setEditedItems((prevItems) =>
        prevItems.map((item, index) => (index === existingItemIndex ? newItem : item))
      );
    } else {

      setEditedItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const handleDoubleClick = () => {
    if (keyName !== 'id') {
      setModalIsOpen(true)
    }
  }


  const handleModalClose = () => {
    setWorkflowList((prevState) => {
      const newArray = prevState?.map((state) => {
        if (state?.id === item?.id) {
          const updatedItem = { ...state, [keyName]: value };
          handleEdit(updatedItem);
          return updatedItem;
        } else {
          return state;
        }
      });
  
      return newArray;
    });
  
    setModalIsOpen(false);
  };

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
