import axios, { AxiosError } from "axios";
import { AuthTokenError } from "./errors/authTokenError";

export function apiGetLoginAuthorizationRA(ctx = undefined, authContext: any) {
  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("AuthorizationRA");
  }

  const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    maxBodyLength: Infinity,
  });
  
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function setupApiGetAuthorization(ctx = undefined, authContext: any) {
    let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("AuthorizationRA");
  }

  const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    maxBodyLength: Infinity,
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function apiGetLoginWebApp(ctx?: any, authContext?: any) {
  
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });


  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function apiGetLogin(ctx = undefined, authContext: any) {
  console.log('apiGetLogin');
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });


  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function apiGetAllFluxo(ctx = undefined, authContext: any) {
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  api.interceptors.request.use(request => {
    let token = localStorage.getItem('AuthorizationRA');
    if (token) {
      token = token.replace(/"/g, '');
    }
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function apiGetFluxo(ctx = undefined, authContext: any) {
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  api.interceptors.request.use(request => {
    let token = localStorage.getItem('AuthorizationRA');
    if (token) {
      token = token.replace(/"/g, '');
    }
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function apiTriggers(ctx = undefined, authContext: any) {
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  api.interceptors.request.use(request => {
    let token = localStorage.getItem('AuthorizationRA');
    if (token) {
      token = token.replace(/"/g, '');
    }
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function apiHabs(ctx = undefined, authContext: any) {
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  api.interceptors.request.use(request => {
    let token = localStorage.getItem('Authorization');
    if (token) {
      token = token.replace(/"/g, '');
    }
    console.log(token);
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function apiTabs(ctx = undefined, authContext: any) {
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  api.interceptors.request.use(request => {
    let token = localStorage.getItem('Authorization');
    if (token) {
      token = token.replace(/"/g, '');
    }
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function apiSaveTriggers(ctx = undefined, authContext: any) {
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  api.interceptors.request.use(request => {
    let token = localStorage.getItem('AuthorizationRA');
    if (token) {
      token = token.replace(/"/g, '');
    }
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function verifyHabilidades(ctx = undefined, authContext: any) {
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  api.interceptors.request.use(request => {
    let token = localStorage.getItem('Authorization');
    if (token) {
      token = token.replace(/"/g, '');
    }
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function verifyTabulacoes(ctx = undefined, authContext: any) {
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  api.interceptors.request.use(request => {
    let token = localStorage.getItem('Authorization');
    if (token) {
      token = token.replace(/"/g, '');
    }
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export function workflow(ctx = undefined, authContext: any) {
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  api.interceptors.request.use(request => {
    const webApp = localStorage.getItem('WebApp');
    let token;
    if (webApp) {
      const webAppObject = JSON.parse(webApp);
      token = webAppObject[0]?.acess_token;
    }
    if (token) {
      token = token.replace(/"/g, '');
    }
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          authContext.signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
