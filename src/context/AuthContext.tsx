import { createContext, ReactNode, useState } from "react";
import {
  ApiGetLogin,
  ApiAuthenticated,
  ApiGetAllFluxo,
  ApiGetFluxo,
  ApiTriggers,
  ApiSaveTrigger,
} from "../services/apiClient";
import { toast, Zoom } from "react-toastify";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";
import { parseCookies } from "nookies";

type AuthContextData = {
  user: UserProps;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  getFluxo: (flowId: any) => Promise<any>;
  getAllFluxo: () => Promise<any>;
  trigger: (validate: boolean) => void;
  getHabs: (habs: any, validate: boolean) => Promise<any>;
  getTabs : (tabs: any, validate: boolean) => Promise<any>;
  saveTrigger: () => void;
  verifyHabilidades: () => Promise<any>;
  verifyTabulacoes: () => Promise<any>;
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

type AuthProviderProps = {
  children: ReactNode;
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

      setCookie(
        undefined,
        "@nextAuth.Authorization",
        response.data.tokens.Authorization,
        {
          maxAge: 24 * 60 * 60,
          path: "/",
        }
      );

      setCookie(
        undefined,
        "@nextAuth.AuthorizationRA",
        response.data.tokens.AuthorizationRA,
        {
          maxAge: 24 * 60 * 60,
          path: "/",
        }
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
    } catch (error) {
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
      destroyCookie(undefined, "@nextAuth.token");
      Router.push("/");
    } catch (error) {
      console.log("Erro ao deslogar");
    }
  }
  async function getAllFluxo() {
    try {
      const response = await ApiGetAllFluxo.get("/search-all-flows");
      localStorage.setItem(
        "All_Flows",
        JSON.stringify(response.data)
      );
      return response.data;
    } catch (error) {
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
        "Get_One_Flows",
        JSON.stringify(response.data)
      );

      return response.data;
    } catch (error) {
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
      }else{
        console.log("GOl");
        const response = await ApiGetFluxo.get("/search-trigger", {});
        
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
    } catch (error) {
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
      if(validate === false){
        throw new Error("Habilidades não informadas")
      }else{
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


    } catch (error) {
      return error.message;
    }
  }
  async function getTabs(tabs: string, validate: boolean) {
    try {

      if(validate === false){
        throw new Error("Tabulaçoes não informadas")
      }else{
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

    } catch (error) {
      return error.message;
    }
  }
  async function saveTrigger() {

    try {
      const response = await ApiGetFluxo.put("/save-trigger", {});
      
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
    } catch (error) {
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
      const response = await ApiGetFluxo.get("/get-habs", {});
      localStorage.setItem(
        "Habilidades existentes na instância",
        JSON.stringify(response.data)
      ); 
      return response.data;
    } catch (error) {
      console.log("Erro ao acessar habilidades");
    }
  }
  async function verifyTabulacoes() {
    try {
      const response = await ApiGetFluxo.get("/get-tabs", {});
      localStorage.setItem(
        "Tabulações existentes na instância",
        JSON.stringify(response.data)
      ); 
      return response.data;
    } catch (error) {
      console.log("Erro ao acessar tabulações");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
