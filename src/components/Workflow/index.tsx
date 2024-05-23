import { useAuthContext } from '@/src/hooks/auth';
import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState
} from 'react';
import ReactModal from 'react-modal';
import { AuthContext } from '../../context/AuthContext';
import style from './styles.module.scss';

type EditableCellProps = {
  item: any;
  keyName: string;
  className: string;
  setChanges: (changes: any[]) => void;
  changes: any[];
  deleteMode: boolean;
  setDeleteRowIndex: (index: number | null) => void;
  editedItems: any[];
  setEditedItems: React.Dispatch<React.SetStateAction<any[]>>;
  notValue: unknown | undefined;
};

interface Filter {
  field: string;
  value: string | string[];
}
const EditableCell = ({
  item,
  keyName,
  className,
  setChanges,
  changes,
  editedItems,
  setEditedItems,
  deleteMode,
  notValue
}: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<any>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState('');

  const [editedItem, setEditedItem] = useState<any>([]);
  console.log("editedItem", editedItem);

  useEffect(() => {
    if (item) {
      setValue(item[keyName]);
    }
  }, [item, keyName]);

  const handleDoubleClick = () => {

    if (keyName !== 'id') {
      setModalIsOpen(true);
      setModalInputValue(value);
    }
  };

  const handleModalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModalInputValue(event.target.value);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    if (modalInputValue) {
      setValue(modalInputValue);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedItem = { ...item, [keyName]: event.target.value };
    setValue(event.target.value);
    
    setEditedItem(prev => {
      const itemIndex = prev?.find(i => i.id === updatedItem.id);

      if (itemIndex){
        setEditedItem({ ...item, [keyName]: event.target.value });
      }else{
        return [ ...prev, updatedItem ];
      }

    });
  };


  const handleBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log("handleBlur")
    setValue(event.target.value);
    // event.preventDefault();

    // setIsEditing(false);
    if (item) {
      
      const newChanges = [...changes, { keyName, value }];
      
      // setChanges(newChanges);
      console.log("newChanges", newChanges);
      const itemIndex = editedItems.findIndex(i => i.id === updatedItem.id);

      // if (itemIndex !== -1) {
      //   setEditedItem((prevItems: any[]) =>
      //     prevItems?.map((item, index) =>
      //       index === itemIndex ? updatedItem : item
      //     )
      //   );
      //   console.log('Item Atualizado', updatedItem);
      // } else {
      //   // setEditedItem((prevItems: any[]) => [...prevItems, updatedItem]);
      //   console.log('Item nao Atualizado', updatedItem);
      // }
    }
  };

  const renderItemValue = () => {
    if (!notValue) return '---';
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
    );
  };

  return (
    <div className={className} onDoubleClick={handleDoubleClick}>
      <ReactModal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleModalClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000
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
            borderRadius: '20px'
          }
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
            outline: 'none'
          }}
        />
      </ReactModal>
      {isEditing ? (
        console.log("isEditing"),
        <input
          type="text"
          value={value}
          // onChange={handleBlur}
          // onBlur={handleBlur}
          autoFocus
          className={style.inputEdit}
        />
      ) : (
        renderItemValue()
      )}
    </div>
  );
};

export function Workflow() {
  const { Workflow } = useContext(AuthContext);

  const [workflowList, setWorkflowList] = useState<any[]>([]);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [filteredWorkflowList, setFilteredWorkflowList] = useState<any[]>([]);
  const [changes, setChanges] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteRowIndex, setDeleteRowIndex] = useState<number | null>(null);
  const [editedItems, setEditedItems] = useState<any[]>([]);

  const columnOrder = Object.keys(workflowList[0] || {});

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      if (user && Workflow) {
        const webApp = JSON.stringify(user);

        const webAppObject = JSON.parse(webApp);
        const client = webAppObject?.client;
        const clientServices = webAppObject?.clientServices;
        const token = webAppObject?.acess_token;

        const result = await Workflow(client, clientServices, token);

        setWorkflowList(result);
      }
    };
    fetchData();
  }, [Workflow, user]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setFilter(null);
      const match = event.currentTarget.value.match(/(\w+)\s*=\s*'([^']*)'/);
      if (match) {
        const values = match[2].split(',').map(value => value.trim());
        setFilter({ field: match[1], value: values });
      }
    }
  };

  useEffect(() => {
    let list = [...workflowList];
    if (filter) {
      list = list.filter(item =>
        Array.isArray(filter.value)
          ? filter.value.some(fv =>
              String(item[filter.field])
                .trim()
                .toLowerCase()
                .includes(fv.trim().toLowerCase())
            )
          : String(item[filter.field])
              .trim()
              .toLowerCase()
              .includes(filter.value.trim().toLowerCase())
      );
      while (list.length < workflowList.length) {
        list.push({});
      }
    }
    setFilteredWorkflowList(list);
  }, [workflowList, filter]);

  const handleSave = () => {
    const newList = [...workflowList];

    changes.forEach(change => {
      const item = newList.find(item => item.isNew);
      if (item) {
        item[change.keyName] = change.value;
      }
    });
    setWorkflowList(newList);
    setChanges([]);
  };

  const handleDeleteOrConfirm = () => {
    if (deleteMode) {
      setDeleteRowIndex(selectedRow);
    } else {
      setDeleteRowIndex(null);
    }
    setDeleteMode(!deleteMode);
  };

  const handleCancel = () => {
    setSelectedRow(null);
    setDeleteRowIndex(null);
    setDeleteMode(false);
  };

  const handleAdd = () => {
    if (workflowList.length > 0) {
      const firstItem = workflowList[0];

      const newItem: { isNew: boolean; rowIndex: number; [key: string]: any } =
        Object.keys(firstItem).reduce((obj: any, key) => {
          obj[key] = '---';
          return obj;
        }, {});

      newItem.isNew = true;

      setWorkflowList([...workflowList, newItem]);
    }
  };

  const handleAtt = () => {
    window.location.reload();
  }

  return (
    <aside className={style.AsideContainer}>
      <div className={style.containerTable}>
        <div className={style.menuFiltro}>
          <span className={style.filterLabel}>WORKFLOW</span>
          <input
            className={style.filterText}
            type="text"
            onKeyDown={handleKeyDown}
            placeholder=""
          />
        </div>
        <div className={style.containerTableTwo}>
          {workflowList.length > 0 && (
            <table className={style.table} id="tableWorkflow">
              <thead className={style.titleTable}>
                <tr>
                  <th className={style.titleTableCell}></th>
                  {columnOrder.map((key, index) => (
                    <th key={index} className={style.titleTableCell}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={style.tableBody}>
                <ListWorkflow
                  filteredWorkflowList={filteredWorkflowList}
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
              </tbody>
            </table>
          )}
          <div className={style.espaço}></div>
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
  );
}

function ListWorkflow({
  filteredWorkflowList,
  columnOrder,
  setChanges,
  changes,
  setSelectedRow,
  deleteMode,
  deleteRowIndex,
  setDeleteRowIndex,
  editedItems,
  setEditedItems,
  selectedRow
}: any) {
  const handleRowClick = (index: number) => {
    setSelectedRow(index);
    setDeleteRowIndex(index);
  };

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
          <EditableCell
            item={item}
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
  ));
}
