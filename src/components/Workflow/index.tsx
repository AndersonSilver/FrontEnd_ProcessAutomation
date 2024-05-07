import style from "./styles.module.scss";
import { useEffect, FormEvent, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { toast, Zoom } from "react-toastify";
import { Button } from "../ui/Button";
type ButtonProps = {
  // outras props aqui...
  onClick?: () => void | Promise<void>; // adicione esta linha
};

export function Workflow() {
  const { workflow } = useContext(AuthContext);
  // const [client, setClient] = useState('');
  // const [clientServices, setClientServices] = useState('');

  // const [workflowList, setWorkflowList] = useState<any>();

  const client = "tradicao";
  const clientServices = "consorcio";

  const handleClick = async () => {
    await workflow({ client, clientServices });
  };

  const workflowList = [
    {
      "id": "1aae68e0-19cf-4b86-880f-379f21a2e0a7",
      "created_at": "2024-02-08T17:52:14.901Z",
      "updated_at": "2024-02-08T17:52:14.901Z",
      "title": "Quitação de financiamento",
      "alternative_title": "Quitação de financiamento",
      "should_use_has_person_contact_data_filter": false,
      "should_use_attended_assembly_filter": false,
      "is_preview_opening": false,
      "only_owner_can_edit_protocol": false,
      "description": "Quitação de financiamento",
      "acceptance_term": null,
      "enabled": true,
      "customer_view_form_id": null,
      "flow_form_id": "3b99446a-fecc-4d24-84d4-dd50107a5fa9",
      "company_data_form_id": null,
      "personal_data_form_id": null,
      "custom_filters": null,
      "pendency_custom_filters": null,
      "workflow_group_id": null,
      "protocol_provider": "flow",
      "index": 0,
      "filters": {
        "create": {
          "person": true,
          "seller": true,
          "system": true,
          "company": false,
          "backoffice": false
        },
        "consult": {
          "person": true,
          "seller": true,
          "system": true,
          "company": false,
          "backoffice": true
        }
      },
      "optional_config": {
        "steps": {
          "clerk": false,
          "broker": false,
          "person": false,
          "seller": false,
          "company": false,
          "backoffice": false
        },
        "terms": {
          "finish": {
            "icon": "/assets/icons/success.svg",
            "title": "Ticket criado com sucesso!",
            "buttons": {
              "cancel": { "labelButton": "Voltar para o início" },
              "confirm": { "labelButton": "Nova solicitação" }
            },
            "subtitle": "Esse atendimento passará por uma análise."
          }
        },
        "rating": {
          "clerk": false,
          "broker": false,
          "person": false,
          "seller": false,
          "company": false,
          "backoffice": false
        },
        "commentary": {
          "clerk": false,
          "broker": false,
          "person": false,
          "seller": false,
          "company": false,
          "backoffice": false
        },
        "always_show_pending_forms": true,
        "duplicate_protocol_action": true,
        "get_main_user_by_products": true,
        "after_protocol_creation_flow": "finish"
      },
      "sla": null,
      "workflow_key": "quitacao_de_financiamento_pf",
      "client_service_id": "8b0352a4-c154-4df1-8e51-aadfe3bc821d",
      "custom_section_protocol_function": null,
      "bottom_custom_section_protocol_function": null,
      "top_custom_section_protocol_function": null,
      "client_service": {
        "id": "8b0352a4-c154-4df1-8e51-aadfe3bc821d",
        "name": "Consórcio",
        "service_key": "consorcio",
        "client_id": "61a21c71-44b3-4169-8bb1-d94c34aab8cc"
      },
      "client_product_key": "quotas",
      "client_product_request_id": "8489848a-2e28-4458-8256-595f5f4b4319",
      "update_workflow_protocol_function_id": null,
      "workflow_protocol_duplicity_rule_function_id": null,
      "get_workflow_protocol_batch_file_function_id": null,
      "show_before_create_protocol_function_id": null,
      "show_before_create_protocol_function": null,
      "get_faq_data_function_id": null,
      "get_faq_data_function": null,
      "execute_before_create_workflow_protocol_in_batch_function_id": null,
      "deleted_at": null
    },
    {
      "id": "3e61e199-36e1-4254-9058-942b2b1269c5",
      "created_at": "2024-01-04T19:54:04.062Z",
      "updated_at": "2024-01-04T19:54:04.062Z",
      "title": "Aquisição de imóvel urbano",
      "alternative_title": "Aquisição de imóvel urbano",
      "should_use_has_person_contact_data_filter": false,
      "should_use_attended_assembly_filter": false,
      "is_preview_opening": false,
      "only_owner_can_edit_protocol": false,
      "description": "Aquisição de imóvel urbano",
      "acceptance_term": null,
      "enabled": true,
      "customer_view_form_id": null,
      "flow_form_id": "3b99446a-fecc-4d24-84d4-dd50107a5fa9",
      "company_data_form_id": null,
      "personal_data_form_id": null,
      "custom_filters": null,
      "pendency_custom_filters": null,
      "workflow_group_id": null,
      "protocol_provider": "flow",
      "index": 0,
      "filters": {
        "create": {
          "person": true,
          "seller": true,
          "system": true,
          "company": false,
          "backoffice": false
        },
        "consult": {
          "person": true,
          "seller": true,
          "system": true,
          "company": false,
          "backoffice": true
        }
      },
      "optional_config": {
        "steps": {
          "clerk": false,
          "broker": false,
          "person": false,
          "seller": false,
          "company": false,
          "backoffice": false
        },
        "terms": {
          "finish": {
            "icon": "/assets/icons/success.svg",
            "title": "Ticket criado com sucesso!",
            "buttons": {
              "cancel": { "labelButton": "Voltar para o início" },
              "confirm": { "labelButton": "Nova solicitação" }
            },
            "subtitle": "Esse atendimento passará por uma análise."
          }
        },
        "rating": {
          "clerk": false,
          "broker": false,
          "person": false,
          "seller": false,
          "company": false,
          "backoffice": false
        },
        "commentary": {
          "clerk": false,
          "broker": false,
          "person": false,
          "seller": false,
          "company": false,
          "backoffice": false
        },
        "always_show_pending_forms": true,
        "duplicate_protocol_action": true,
        "get_main_user_by_products": true,
        "after_protocol_creation_flow": "finish"
      },
      "sla": null,
      "workflow_key": "aquisição_de_imóvel_urbano_pf",
      "client_service_id": "8b0352a4-c154-4df1-8e51-aadfe3bc821d",
      "custom_section_protocol_function": null,
      "bottom_custom_section_protocol_function": null,
      "top_custom_section_protocol_function": null,
      "client_service": {
        "id": "8b0352a4-c154-4df1-8e51-aadfe3bc821d",
        "name": "Consórcio",
        "service_key": "consorcio",
        "client_id": "61a21c71-44b3-4169-8bb1-d94c34aab8cc"
      },
      "client_product_key": "quotas",
      "client_product_request_id": "8489848a-2e28-4458-8256-595f5f4b4319",
      "update_workflow_protocol_function_id": null,
      "workflow_protocol_duplicity_rule_function_id": null,
      "get_workflow_protocol_batch_file_function_id": null,
      "show_before_create_protocol_function_id": null,
      "show_before_create_protocol_function": null,
      "get_faq_data_function_id": null,
      "get_faq_data_function": null,
      "execute_before_create_workflow_protocol_in_batch_function_id": null,
      "deleted_at": null
    }
  ]
  // useEffect(() => {
  //   setWorkflowList(localStorage.getItem("Workflow") || []);
  // }, []);

  // console.log(workflowList);

  return (
    <aside className={style.AsideContainer}>
      <div onClick={handleClick}>
        <Button>List Workflow</Button>

        <div className={style.containerTable}>

          <table className={style.table} id="tableClassification">
            <thead className={style.titleTable}>
              <tr>
                <th className={style.titleTableCell}>id</th>
                <th className={style.titleTableCell}>created_at</th>
                <th className={style.titleTableCell}>updated_at</th>
                <th className={style.titleTableCell}>title</th>
                <th className={style.titleTableCell}>alternative_title</th>
                <th className={style.titleTableCell}>should_use_has_person_contact_data_filter</th>
                <th className={style.titleTableCell}>should_use_attended_assembly_filter</th>
                <th className={style.titleTableCell}>is_preview_opening</th>
                <th className={style.titleTableCell}>only_owner_can_edit_protocol</th>
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              {workflowList.map((item: any, index: number) => (
                <tr>
                  <td className={style.body_td}>{item.id}</td>
                  <td className={style.body_td}>{item.created_at}</td>
                  <td className={style.body_td}>{item.updated_at}</td>
                  <td className={style.body_td}>{item.title}</td>
                  <td className={style.body_td}>{item.alternative_title}</td>
                  <td className={style.body_td}>{item.should_use_has_person_contact_data_filter}</td>
                  <td className={style.body_td}>{item.should_use_attended_assembly_filter}</td>
                  <td className={style.body_td}>{item.is_preview_opening}</td>
                  <td className={style.body_td}>{item.only_owner_can_edit_protocol}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </aside>
  );
}
