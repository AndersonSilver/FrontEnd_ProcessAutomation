import style from "./styles.module.scss";
import {
  useEffect,
  useState,
  useContext,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { AuthContext } from "../../context/AuthContext";

type EditableCellProps = {
  item: any;
  keyName: string;
  className: string;
  setChanges: (changes: any[]) => void;
  changes: any[];
  deleteMode: boolean;
  setDeleteRowIndex: (index: number | null) => void;
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
  deleteMode,
}: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<any>("");

  useEffect(() => {
    setValue(item[keyName]);
  }, [item, keyName]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    item[keyName] = value;
    const newChanges = [...changes, { keyName, value }];
    setChanges(newChanges);
  };

  return (
    <td className={className} onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          className={style.inputEdit}
        />
      ) : (
        String(value)
      )}
    </td>
  );
};

export function Workflow() {
  const { workflow } = useContext(AuthContext);

  const [workflowList, setWorkflowList] = useState<any[]>([]);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [filteredWorkflowList, setFilteredWorkflowList] = useState<any[]>([]);
  const [changes, setChanges] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteRowIndex, setDeleteRowIndex] = useState<number | null>(null);

  const columnOrder = [
    "id",
    "title",
    "description",
    "alternative_title",
    "workflow_key",
    "filters",
    "sla",
    "created_at",
    "updated_at",
    "index",
    "flow_form_id",
    "client_service_id",
    "client_product_key",
    "optional_config",
    "workflow_group_id",
    "execute_before_create_protocol",
    "client_product_request_id",
    "get_external_identification_function",
    "execute_filter_workflow_protocols_before_create_draft",
    "get_main_user_account_data_function",
    "format_products_field_function",
    "update_workflow_protocol_function_id",
    "workflow_protocol_duplicity_rule_function_id",
  ];
  useEffect(() => {
    const fetchData = async () => {
      const webApp = localStorage.getItem("WebApp");

      if (webApp !== null) {
        const webAppObject = JSON.parse(webApp);
        const client = webAppObject[0]?.client;
        const clientServices = webAppObject[0]?.clientServices;

        const result = await workflow({ client, clientServices });
        setWorkflowList(result);
      }
    };

    fetchData();
  }, [workflow]);
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setFilter(null);
      const match = event.currentTarget.value.match(/(\w+)\s*=\s*'([^']*)'/);
      if (match) {
        const values = match[2].split(",").map((value) => value.trim());
        setFilter({ field: match[1], value: values });
      }
    }
  };

  useEffect(() => {
    let list = [...workflowList];
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
      );
      while (list.length < workflowList.length) {
        list.push({});
      }
    }
    setFilteredWorkflowList(list);
  }, [workflowList, filter]);

  const handleSave = () => {
    const newList = [...workflowList];
    changes.forEach((change) => {
      const item = newList.find(
        (item) => item[change.keyName] === change.value
      );
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
    setSelectedRow(null); // Desmarcar a linha
    window.location.reload();
  };

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
          <button
            className={style.buttonDeletar}
            onClick={handleDeleteOrConfirm}
          >
            {deleteMode ? "Confirmar" : "Deletar"}
          </button>
          {deleteMode && (
            <button className={style.buttonCancelar} onClick={handleCancel}>
              Cancelar
            </button>
          )}
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
}: any) {
  const [selectedRow, setSelectedRowLocal] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedRowLocal(index);
    setSelectedRow(index);
    setDeleteRowIndex(index);
  };

  return (
    <>
      {filteredWorkflowList.map((item: any, index: number) => (
        <tr
          key={index}
          onClick={() => handleRowClick(index)}
          className={`${index === selectedRow ? style.selectedRow : ""} ${
            index === deleteRowIndex ? style.deleteMode : ""
          }`}
        >
          <td>{item.id ? index + 1 : ""}</td>
          {columnOrder.map((key: any, i: any) =>
            item.id ? (
              <EditableCell
                key={i}
                item={item}
                keyName={key}
                className={style.body_td}
                setChanges={setChanges}
                changes={changes}
                deleteMode={deleteMode}
                setDeleteRowIndex={setDeleteRowIndex}
              />
            ) : (
              <td className={`${style.body_td} ${style.body_td_empty}`}></td>
            )
          )}
        </tr>
      ))}
    </>
  );
}
