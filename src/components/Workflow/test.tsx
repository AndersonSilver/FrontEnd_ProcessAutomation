import style from "./styles.module.scss";
import { useEffect, useState, useContext, ChangeEvent, KeyboardEvent } from "react";
import { AuthContext } from "../../context/AuthContext";

type EditableCellProps = {
  item: any;
  keyName: string;
  className: string;
};

const EditableCell = ({ item, keyName, className }: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item[keyName] || '\u00A0');

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Here you can update the value in your data source
  };

  return (
    <td className={className} onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input type="text" value={value} onChange={handleChange} onBlur={handleBlur} autoFocus />
      ) : (
        String(value)
      )}
    </td>
  );
};

export function Workflow() {
  const { workflow } = useContext(AuthContext);

  const [workflowList, setWorkflowList] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("");


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
      const client = "tradicao";
      const clientServices = "consorcio";

      const result = await workflow({ client, clientServices });
      setWorkflowList(result);
    };

    fetchData();
  }, [workflow]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const match = event.currentTarget.value.match(/id\s*=\s*'([^']*)'/);
      setFilter(match ? match[1] : '');
    }
  };

  let filteredWorkflowList = workflowList;
  if (filter) {
    filteredWorkflowList = workflowList.filter((item) => item.id === filter);
  }

  while (filteredWorkflowList.length < workflowList.length) {
    filteredWorkflowList.push({});
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
  
        {workflowList.length > 0 && (
          <table className={style.table} id="tableWorkflow">
            <thead className={style.titleTable}>
              <tr>
                {columnOrder.map((key, index) => (
                  <th key={index} className={style.titleTableCell}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              {filteredWorkflowList.map((item: any, index: number) => (
                <tr key={index}>
                  {columnOrder.map((key, i) => (
                    <td key={i} className={style.body_td}>
                      {item[key] ? String(item[key]) : '\u00A0'}  {/* Use empty string if the property does not exist */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </aside>
  );
}
