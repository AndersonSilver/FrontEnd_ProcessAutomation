import {
  setupApiGetAuthorization,
  apiGetLogin,
  workflow,
} from "./setupApis";
// import { setupApiAuthenticated } from "./setupApis";

//@ts-ignore :todo
export const ApiGetLogin = apiGetLogin();
//@ts-ignore :todo
export const ApiAuthenticated = setupApiGetAuthorization();
//@ts-ignore :todo
export const Workflow = workflow();
