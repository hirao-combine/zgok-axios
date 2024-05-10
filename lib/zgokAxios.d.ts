import { ZgokConfig, ZgokMethod } from "@zgok-api/zgok-core";
import { AxiosInstance } from "axios";
export declare function ZgokAxios<T extends ZgokConfig>(axios: AxiosInstance, apiConfig: T): {
    [N in keyof T]: {
        [K in keyof T[N]]: (data: ZgokMethod<T[N][K]>["req"]) => Promise<ZgokMethod<T[N][K]>["res"]>;
    };
};
//# sourceMappingURL=zgokAxios.d.ts.map