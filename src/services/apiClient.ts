import {
  apiGetLogin,
  setupApiGetAuthorization,
  apiGetLoginAuthorizationRA,
  apiGetAllFluxo,
  apiGetFluxo,
  apiTriggers,
  apiHabs,
  apiTabs,
  apiSaveTriggers,
  verifyHabilidades,
  verifyTabulacoes,
} from "./setupApis";
// import { setupApiAuthenticated } from "./setupApis";

//@ts-ignore :todo
export const ApiGetLogin = apiGetLogin();
//@ts-ignore :todo
export const ApiAuthenticated = setupApiGetAuthorization();
//@ts-ignore :todo
export const ApiGetTab = apiGetLoginAuthorizationRA();
//@ts-ignore :todo
export const ApiGetAllFluxo = apiGetAllFluxo();
//@ts-ignore :todo
export const ApiGetFluxo = apiGetFluxo();
//@ts-ignore :todo
export const ApiTriggers = apiTriggers();
//@ts-ignore :todo
export const ApiHabs = apiHabs();
//@ts-ignore :todo
export const ApiTabs = apiTabs();
//@ts-ignore :todo
export const ApiSaveTrigger = apiSaveTriggers();
//@ts-ignore :todo
export const VerifyHabilidades = verifyHabilidades();
//@ts-ignore :todo
export const VerifyTabulacoes = verifyTabulacoes();
