import { ZgokConfig, ZgokMethod } from "@zgok-api/zgok-core";
import { AxiosHeaderValue, AxiosInstance } from "axios";

type Opts = { headers?: { [key: string]: AxiosHeaderValue } };

const actions = {
  get: (axios: AxiosInstance, url: string, data: any, opts?: Opts) => {
    return axios.get(url, {
      params: data ? { q: JSON.stringify(data) } : null,
      headers: opts?.headers,
    });
  },
  post: (axios: AxiosInstance, url: string, data: any, opts?: Opts) => {
    return axios.post(url, data, { headers: opts?.headers });
  },
  put: (axios: AxiosInstance, url: string, data: any, opts?: Opts) => {
    return axios.put(url, data, { headers: opts?.headers });
  },
  patch: (axios: AxiosInstance, url: string, data: any, opts?: Opts) => {
    return axios.patch(url, data, { headers: opts?.headers });
  },
  delete: (axios: AxiosInstance, url: string, data: any, opts?: Opts) => {
    return axios.delete(url, {
      params: data ? { q: JSON.stringify(data) } : null,
      headers: opts?.headers,
    });
  },
};

export function ZgokAxios<T extends ZgokConfig>(
  axios: AxiosInstance,
  apiConfig: T
): {
  [N in keyof T]: {
    [K in keyof T[N]]: (
      data: ZgokMethod<T[N][K]>["req"],
      opts?: Opts
    ) => Promise<ZgokMethod<T[N][K]>["res"]>;
  };
} {
  const apiMethods: any = {};
  for (const namespace in apiConfig) {
    apiMethods[namespace] = {};
    for (const key in apiConfig[namespace]) {
      const config = apiConfig[namespace][key];
      apiMethods[namespace][key] = async (reqData: any, opts?: Opts) => {
        const reqParsed = config.req.parse(reqData);
        const { data: resData } = await actions[config.method](
          axios,
          `${namespace}/${key}`,
          reqParsed,
          opts
        );
        return config.res.parse(resData);
      };
    }
  }
  return apiMethods;
}
