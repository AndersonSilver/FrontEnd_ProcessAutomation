import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/authTokenError";

export function apiGetLoginAuthorizationRA(ctx = undefined, authContext: any) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      Authorization: `Bearer ${cookies["@nextAuth.AuthorizationRA"]}`,
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
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      Authorization: `Bearer ${cookies["@nextAuth.Authorization"]}`,
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

export function apiGetLogin(ctx = undefined, authContext: any) {
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
    const { '@nextAuth.AuthorizationRA': token } = parseCookies(ctx);
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
    const { '@nextAuth.AuthorizationRA': token } = parseCookies(ctx);
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
    const { '@nextAuth.AuthorizationRA': token } = parseCookies(ctx);
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
    const { '@nextAuth.AuthorizationRA': token } = parseCookies(ctx);
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
    const { '@nextAuth.AuthorizationRA': token } = parseCookies(ctx);
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
    const { '@nextAuth.AuthorizationRA': token } = parseCookies(ctx);
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
    const { '@nextAuth.Authorization': token } = parseCookies(ctx);
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
    const { '@nextAuth.Authorization': token } = parseCookies(ctx);
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
