"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZgokAxios = void 0;
const actions = {
    get: (axios, url, data) => axios.get(url, { params: data ? { q: JSON.stringify(data) } : null }),
    post: (axios, url, data) => axios.post(url, data),
    put: (axios, url, data) => axios.put(url, data),
    patch: (axios, url, data) => axios.patch(url, data),
    delete: (axios, url, data) => axios.delete(url, { params: data ? { q: JSON.stringify(data) } : null }),
};
function ZgokAxios(axios, apiConfig) {
    const apiMethods = {};
    for (const namespace in apiConfig) {
        apiMethods[namespace] = {};
        for (const key in apiConfig[namespace]) {
            const config = apiConfig[namespace][key];
            apiMethods[namespace][key] = (reqData) => __awaiter(this, void 0, void 0, function* () {
                const reqParsed = config.req.parse(reqData);
                const { data: resData } = yield actions[config.method](axios, `${namespace}/${key}`, reqParsed);
                return config.res.parse(resData);
            });
        }
    }
    return apiMethods;
}
exports.ZgokAxios = ZgokAxios;
