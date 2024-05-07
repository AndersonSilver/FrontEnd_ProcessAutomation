import { createContext, ReactNode, useState } from "react";
import {
  ApiGetTab,
  ApiGetLogin,
  ApiAuthenticated,
  ApiGetAllFluxo,
  ApiGetFluxo,
  ApiTriggers,
  ApiHabs,
  ApiTabs,
  ApiSaveTrigger,
  Workflow,
} from "../services/apiClient";
import { toast, Zoom } from "react-toastify";
import Router from "next/router";

type AuthContextData = {
  user: UserProps;
  signIn: (credentials: SignInProps) => Promise<void>;
  signInWebApp: (credentials: SignInPropsWebApp) => Promise<void>;
  signOut: () => void;
  getFluxo: (flowId: any) => Promise<any>;
  getAllFluxo: () => Promise<any>;
  trigger: (validate: boolean) => void;
  getHabs: (habs: any, validate: boolean) => Promise<any>;
  getTabs: (tabs: any, validate: boolean) => Promise<any>;
  saveTrigger: () => void;
  verifyHabilidades: () => Promise<any>;
  verifyTabulacoes: () => Promise<any>;
  workflow: (credentials: WorkflowPropsWebApp) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  companyId: string;
  companyName: string;
};

type SignInProps = {
  slug: string;
  email: string;
  password: string;
};

type SignInPropsWebApp = {
  client: string;
  clientServices: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type WorkflowPropsWebApp = {
  client: string;
  clientServices: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    companyId: "",
    companyName: "",
  });



  async function signInWebApp(credentials: SignInPropsWebApp) {
    try {
      const response = await ApiGetLogin.post("/auth-user-webapp", {}, {
        params: {
          client: credentials.client,
          client_services: credentials.clientServices,
          email: credentials.email,
          password: credentials.password,
        }
      });

      const result = [{
        client: credentials.client,
        clientServices: credentials.clientServices,
        password: credentials.password,
        acess_token: response.data.acess_token,
      }];

      localStorage.setItem(
        "WebApp",
        JSON.stringify(result)
      );

      toast.success("Logado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Zoom,
      });

    } catch (error: any) {
      throw new Error("Erro ao acessar!");
    }
  }

  async function signIn(credentials: SignInProps) {
    try {
      const response = await ApiGetLogin.post("/auth-user", {
        slug: credentials.slug,
        email: credentials.email,
        password: credentials.password,
      });

      const userData = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        companyId: response.data.company.id,
        companyName: response.data.company.name,
      };

      localStorage.setItem(
        "Authorization",
        JSON.stringify(response.data.tokens.Authorization)
      );

      localStorage.setItem(
        "AuthorizationRA",
        JSON.stringify(response.data.tokens.AuthorizationRA)
      );
      setUser(userData);

      ApiAuthenticated.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data.tokens.AuthorizationRA}`;

      toast.success("Logado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Zoom,
      });

      Router.push(`/dashboard?clientId=${response.data.company.id}`);
    } catch (error: any) {
      toast.error("Erro ao acessar!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  }

  async function signOut() {
    try {
      localStorage.removeItem("Authorization");
      localStorage.removeItem("AuthorizationRA");
      Router.push("/");
    } catch (error) {
      console.log("Erro ao deslogar");
    }
  }

  async function getAllFluxo() {
    try {
      const response = await ApiGetAllFluxo.get("/search-all-flows");
      localStorage.setItem(
        "Todos Fluxos",
        JSON.stringify(response.data)
      );
      return response.data;
    } catch (error: any) {
      console.log("Erro ao acessar o fluxo");
    }
  }

  async function getFluxo(flowId: string) {
    try {
      const response = await ApiGetFluxo.get("/search-flow", {
        params: {
          flowId: flowId,
        },
      });
      localStorage.setItem(
        "Fluxo Selecionado",
        JSON.stringify(response.data)
      );

      return response.data;
    } catch (error: any) {
      console.log("Erro ao acessar o fluxo", error);
    }
  }

  async function trigger(validate: boolean) {
    try {
      if (validate === false) {
        return toast.error("Habilidade ou tabulação não informadas!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        const response = await ApiGetFluxo.get("/search-trigger", {});
        localStorage.setItem(
          "Trigger",
          JSON.stringify(response.data)
        );
        toast.success("Salvo com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Zoom,
        });
        localStorage.setItem(
          "Json Salvo",
          JSON.stringify(response.data)
        );
        return response.data;
      }
    } catch (error: any) {
      toast.error("Algo deu errado!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      toast.error("Esses id's não existe sua MULA!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  }

  async function getHabs(habs: string, validate: boolean) {
    try {
      if (validate === false) {
        throw new Error("Habilidades não informadas")
      } else {
        const response = await ApiGetFluxo.get("/search-habs", {
          params: {
            habs: habs,
          },
        });
        localStorage.setItem(
          "Habilidades Informadas",
          JSON.stringify(response.data)
        );
        return response.data;
      }


    } catch (error: any) {
      return error.message;
    }
  }

  async function getTabs(tabs: string, validate: boolean) {
    try {

      if (validate === false) {
        throw new Error("Tabulaçoes não informadas")
      } else {
        const response = await ApiGetFluxo.get("/search-tabs", {
          params: {
            tabs: tabs,
          },
        });
        localStorage.setItem(
          "Tabulações Informadas",
          JSON.stringify(response.data)
        );
        return response.data;
      }

    } catch (error: any) {
      return error.message;
    }
  }

  async function saveTrigger() {

    try {
      const response = await ApiGetFluxo.put("/save-trigger", {});
      localStorage.setItem(
        "Trigger Salvo",
        JSON.stringify(response.data)
      );
      toast.success("Publicado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Zoom,
      });
      return response.data;
    } catch (error: any) {
      toast.error("Erro ao publicar!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  }

  async function verifyHabilidades() {
    try {
      const response = await ApiHabs.get("/get-habs", {});
      localStorage.setItem(
        "Habilidades existentes na instância",
        JSON.stringify(response.data)
      );
      return response.data;
    } catch (error: any) {
      console.log("Erro ao acessar habilidades");
    }
  }

  async function verifyTabulacoes() {
    try {
      const response = await ApiTabs.get("/get-tabs", {});
      localStorage.setItem(
        "Tabulações existentes na instância",
        JSON.stringify(response.data)
      );
      return response.data;
    } catch (error: any) {
      console.log("Erro ao acessar tabulações");
    }
  }

  async function workflow(credentials: WorkflowPropsWebApp) {
    try {
      const response = await Workflow.get("/search-workflow-webapp", {
        params: {
          client: credentials.client,
          client_services: credentials.clientServices,
        }
      });

      const result = response.data.data
      
      localStorage.setItem(
        "Workflow",
        JSON.stringify(result)
      );
    } catch (error: any) {
      throw new Error("Erro ao trazer os Workflows!");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        getAllFluxo,
        getFluxo,
        trigger,
        getHabs,
        getTabs,
        saveTrigger,
        verifyHabilidades,
        verifyTabulacoes,
        signInWebApp,
        workflow,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
