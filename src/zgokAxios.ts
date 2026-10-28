import {
  ZgokConfig,
  ZgokMethodReq,
  ZgokMethodRes,
  ZgokSchema,
} from "@zgok-api/zgok-core";
import { AxiosHeaderValue, AxiosInstance } from "axios";
import type { z } from "zod";

type Opts = { headers?: { [key: string]: AxiosHeaderValue } };

/** req スキーマがあれば (data, opts?)、無ければ (opts?) で呼べる */
type Args<S extends ZgokSchema> = S extends { req: z.ZodType<any> }
  ? [data: ZgokMethodReq<S>, opts?: Opts]
  : [opts?: Opts];

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
      ...args: Args<T[N][K]>
    ) => Promise<ZgokMethodRes<T[N][K]>>;
  };
} {
  const apiMethods: any = {};
  for (const namespace in apiConfig) {
    apiMethods[namespace] = {};
    for (const key in apiConfig[namespace]) {
      const config = apiConfig[namespace][key];
      apiMethods[namespace][key] = async (...args: any[]) => {
        // req が無い API は第1引数が opts
        const [reqData, opts]: [any, Opts | undefined] = config.req
          ? [args[0], args[1]]
          : [undefined, args[0]];
        const reqParsed = config.req ? config.req.parse(reqData) : undefined;
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
