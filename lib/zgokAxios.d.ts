import { ZgokConfig, ZgokMethod } from "@zgok-api/zgok-core";
import { AxiosHeaderValue, AxiosInstance } from "axios";
type Opts = {
    headers?: {
        [key: string]: AxiosHeaderValue;
    };
};
export declare function ZgokAxios<T extends ZgokConfig>(axios: AxiosInstance, apiConfig: T): {
    [N in keyof T]: {
        [K in keyof T[N]]: (data: ZgokMethod<T[N][K]>["req"], opts?: Opts) => Promise<ZgokMethod<T[N][K]>["res"]>;
    };
};
export {};
//# sourceMappingURL=zgokAxios.d.ts.map