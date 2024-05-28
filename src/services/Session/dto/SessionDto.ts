interface Modules {
  authentication: Authentication
  client: Authentication
  common: Authentication
  communication: Authentication
  consortium: Authentication
  protocol: Authentication
  tech: Authentication
  techforms: Authentication
}

interface Authentication {
  access_profile_module_configuration: null
  access_rules_keys: string[]
}

export interface Session {
  access_session_id: string
  access_token: string
  is_beta_tester: boolean
  modules: Modules
  profile_id: string
  profile_name: string
  user_account_id: string
  user_account_name: string
  user_account_type: string
  user_account_type_settings: null
}
