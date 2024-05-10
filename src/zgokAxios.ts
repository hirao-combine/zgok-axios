import { ZgokConfig, ZgokMethod } from "@zgok-api/zgok-core";
import { AxiosInstance } from "axios";

const actions = {
  get: (axios: AxiosInstance, url: string, data: any) =>
    axios.get(url, { params: data ? { q: JSON.stringify(data) } : null }),
  post: (axios: AxiosInstance, url: string, data: any) => axios.post(url, data),
  put: (axios: AxiosInstance, url: string, data: any) => axios.put(url, data),
  patch: (axios: AxiosInstance, url: string, data: any) =>
    axios.patch(url, data),
  delete: (axios: AxiosInstance, url: string, data: any) =>
    axios.delete(url, { params: data ? { q: JSON.stringify(data) } : null }),
};

export function ZgokAxios<T extends ZgokConfig>(
  axios: AxiosInstance,
  apiConfig: T
): {
  [N in keyof T]: {
    [K in keyof T[N]]: (
      data: ZgokMethod<T[N][K]>["req"]
    ) => Promise<ZgokMethod<T[N][K]>["res"]>;
  };
} {
  const apiMethods: any = {};
  for (const namespace in apiConfig) {
    apiMethods[namespace] = {};
    for (const key in apiConfig[namespace]) {
      const config = apiConfig[namespace][key];
      apiMethods[namespace][key] = async (reqData: any) => {
        const reqParsed = config.req.parse(reqData);
        const { data: resData } = await actions[config.method](
          axios,
          `${namespace}/${key}`,
          reqParsed
        );
        return config.res.parse(resData);
      };
    }
  }
  return apiMethods;
}
