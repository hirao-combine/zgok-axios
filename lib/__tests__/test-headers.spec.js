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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const zod_1 = require("zod");
const __1 = require("..");
const zgok_core_1 = require("@zgok-api/zgok-core");
const schema = {
    headersTest: {
        getTest: (0, zgok_core_1.getFunction)({
            req: zod_1.z.object({ id: zod_1.z.string() }),
            res: zod_1.z.object({ id: zod_1.z.string() }),
        }),
        postTest: (0, zgok_core_1.postFunction)({
            req: zod_1.z.object({ id: zod_1.z.string() }),
            res: zod_1.z.object({ postRes: zod_1.z.string() }),
        }),
        putTest: (0, zgok_core_1.putFunction)({
            req: zod_1.z.object({ id: zod_1.z.string() }),
            res: zod_1.z.object({ putRes: zod_1.z.string() }),
        }),
        patchTest: (0, zgok_core_1.patchFunction)({
            req: zod_1.z.object({ id: zod_1.z.string() }),
            res: zod_1.z.object({ patchRes: zod_1.z.string() }),
        }),
        deleteTest: (0, zgok_core_1.deleteFunction)({
            req: zod_1.z.object({ id: zod_1.z.string() }),
            res: zod_1.z.object({ deleteRes: zod_1.z.string() }),
        }),
    },
};
const axios = axios_1.default.create({ baseURL: "http://localhost:3000" });
const zgokAxios = (0, __1.ZgokAxios)(axios, schema);
const headers = { Authorization: "Bearer token123" };
describe("zgokAxios test headers", () => {
    it("should perform a GET request and return data", () => __awaiter(void 0, void 0, void 0, function* () {
        const mock = new axios_mock_adapter_1.default(axios);
        const url = "http://localhost:3000/headersTest/getTest";
        // Axios への呼び出しをモックして、リクエストのヘッダーを検証
        mock.onGet(url, { headers }).reply((config) => {
            var _a;
            console.log("config.headers", config.headers);
            expect((_a = config.headers) === null || _a === void 0 ? void 0 : _a["Authorization"]).toEqual(headers["Authorization"]);
            return [200, { id: "2" }];
        });
        yield zgokAxios.headersTest.getTest({ id: "1" }, { headers });
    }));
    it("should perform a POST request and return data", () => __awaiter(void 0, void 0, void 0, function* () {
        const mock = new axios_mock_adapter_1.default(axios);
        const url = "http://localhost:3000/headersTest/postTest";
        // Axios への呼び出しをモックして、リクエストのヘッダーを検証
        mock.onPost(url).reply((config) => {
            var _a;
            console.log("config.headers", config.headers);
            expect((_a = config.headers) === null || _a === void 0 ? void 0 : _a["Authorization"]).toEqual(headers["Authorization"]);
            return [200, { postRes: "2" }];
        });
        yield zgokAxios.headersTest.postTest({ id: "1" }, { headers });
    }));
    it("should perform a PUT request and return data", () => __awaiter(void 0, void 0, void 0, function* () {
        const mock = new axios_mock_adapter_1.default(axios);
        const url = "http://localhost:3000/headersTest/putTest";
        // Axios への呼び出しをモックして、リクエストのヘッダーを検証
        mock.onPut(url).reply((config) => {
            var _a;
            console.log("config.headers", config.headers);
            expect((_a = config.headers) === null || _a === void 0 ? void 0 : _a["Authorization"]).toEqual(headers["Authorization"]);
            return [200, { putRes: "2" }];
        });
        yield zgokAxios.headersTest.putTest({ id: "1" }, { headers });
    }));
    it("should perform a PATCH request and return data", () => __awaiter(void 0, void 0, void 0, function* () {
        const mock = new axios_mock_adapter_1.default(axios);
        const url = "http://localhost:3000/headersTest/patchTest";
        // Axios への呼び出しをモックして、リクエストのヘッダーを検証
        mock.onPatch(url).reply((config) => {
            var _a;
            console.log("config.headers", config.headers);
            expect((_a = config.headers) === null || _a === void 0 ? void 0 : _a["Authorization"]).toEqual(headers["Authorization"]);
            return [200, { patchRes: "2" }];
        });
        yield zgokAxios.headersTest.patchTest({ id: "1" }, { headers });
    }));
    it("should perform a DELETE request and return data", () => __awaiter(void 0, void 0, void 0, function* () {
        const mock = new axios_mock_adapter_1.default(axios);
        const url = "http://localhost:3000/headersTest/deleteTest";
        // Axios への呼び出しをモックして、リクエストのヘッダーを検証
        mock.onDelete(url).reply((config) => {
            var _a;
            console.log("config.headers", config.headers);
            expect((_a = config.headers) === null || _a === void 0 ? void 0 : _a["Authorization"]).toEqual(headers["Authorization"]);
            return [200, { deleteRes: "2" }];
        });
        yield zgokAxios.headersTest.deleteTest({ id: "1" }, { headers });
    }));
});
