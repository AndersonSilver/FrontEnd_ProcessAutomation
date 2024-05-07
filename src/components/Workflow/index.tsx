import style from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../ui/Button";

type ButtonProps = {
  onClick?: () => void | Promise<void>;
};

export function Workflow() {
  const { workflow } = useContext(AuthContext);

  const [workflowList, setWorkflowList] = useState<any[]>([]);

  // Adicione esta linha para definir a ordem das colunas
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

  return (
    <aside className={style.AsideContainer}>
      <div className={style.containerTable}>
        {workflowList.length > 0 && (
          <table className={style.table} id="tableWorkflow">
            <thead className={style.titleTable}>
              <tr>
                {/* Mapeie a lista columnOrder em vez de Object.keys(workflowList[0]) */}
                {columnOrder.map((key, index) => (
                  <th key={index} className={style.titleTableCell}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              {workflowList.map((item: any, index: number) => (
                <tr key={index}>
                  {/* Mapeie a lista columnOrder em vez de Object.keys(item) */}
                  {columnOrder.map((key, i) => (
                    <td key={i} className={style.body_td}>
                      {String(item[key])}
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
