interface OptionalConfig {
  after_protocol_creation_flow: string
  always_show_pending_forms: boolean
  commentary: Commentary
  duplicate_protocol_action: boolean
  get_main_user_by_products: boolean
  rating: Commentary
  steps: Commentary
  terms: Terms
}

interface Terms {
  finish: Finish
}

interface Finish {
  buttons: Buttons
  icon: string
  subtitle: string
  title: string
}

interface Buttons {
  cancel: Cancel
  confirm: Cancel
}

interface Cancel {
  labelButton: string
}

interface Commentary {
  backoffice: boolean
  broker: boolean
  clerk: boolean
  company: boolean
  person: boolean
  seller: boolean
}

interface Filters {
  consult: Consult
  create: Consult
}

interface Consult {
  person: boolean
  system: boolean
}

interface ClientService {
  client_id: string
  id: string
  name: string
  service_key: string
}

export interface Filter {
  field: string
  value: string | string[]
}

export interface Workflow {
  acceptance_term: null
  alternative_title: string
  bottom_custom_section_protocol_function: null
  client_product_key: null
  client_product_request_id: null
  client_service: ClientService
  client_service_id: string
  company_data_form_id: null
  created_at: string
  custom_filters: null
  custom_section_protocol_function: null
  customer_view_form_id: null
  deleted_at: null
  description: string
  enabled: boolean
  execute_before_create_workflow_protocol_in_batch_function_id: null
  filters: Filters
  flow_form_id: string
  get_faq_data_function: null
  get_faq_data_function_id: null
  get_workflow_protocol_batch_file_function_id: null
  id: string
  index: number
  item: null
  is_preview_opening: boolean
  only_owner_can_edit_protocol: boolean
  optional_config: OptionalConfig
  pendency_custom_filters: null
  personal_data_form_id: null
  protocol_provider: string
  should_use_attended_assembly_filter: boolean
  should_use_has_person_contact_data_filter: boolean
  show_before_create_protocol_function: null
  show_before_create_protocol_function_id: null
  sla: null
  title: string
  top_custom_section_protocol_function: null
  update_workflow_protocol_function_id: null
  updated_at: string
  workflow_group_id: null
  workflow_key: string
  workflow_protocol_duplicity_rule_function_id: null
}

export interface ListWorkflowData {
  data: Workflow[]
  last_page: number
  page: number
  record_count: number
}

export interface PutWorkflowData {
  data: Workflow[]
  last_page: number
  page: number
  record_count: number
}

export interface PostWorkflowData {
  data: Workflow[]
  last_page: number
  page: number
  record_count: number
}

export interface DeleteWorkflowData {
  data: Workflow[]
  last_page: number
  page: number
  record_count: number
}

export interface WorkflowRequestBody {
  name: string
  description: string
}
export interface WorkflowItem {
  id: string
  [key: string]: unknown
}

export interface ListClientData {
  data: Workflow[]
  last_page: number
  page: number
  record_count: number
}

export interface PostClientData {
  data: Workflow[]
  last_page: number
  page: number
  record_count: number
}

export interface DeleteClientData {
  data: Workflow[]
  last_page: number
  page: number
  record_count: number
}
