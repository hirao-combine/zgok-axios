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
    myTest: {
        postTest: (0, zgok_core_1.postFunction)({
            req: zod_1.z.object({ id: zod_1.z.string(), date1: (0, zgok_core_1.zgokDate)() }),
            res: zod_1.z.object({ postRes: zod_1.z.string(), date2: (0, zgok_core_1.zgokDate)() }),
        }),
    },
};
const axios = axios_1.default.create({ baseURL: "http://localhost:3000" });
const zgokAxios = (0, __1.ZgokAxios)(axios, schema);
const headers = { Authorization: "Bearer token123" };
describe("zgokAxios post test", () => {
    it("should perform a POST request and return data", () => __awaiter(void 0, void 0, void 0, function* () {
        const mock = new axios_mock_adapter_1.default(axios);
        const date1s = "2024-07-15T10:42:21.070Z";
        const date1 = new Date(date1s);
        const date2 = new Date();
        date2.setMonth(date2.getMonth() + 2);
        const url = "http://localhost:3000/myTest/postTest";
        // Axios への呼び出しをモックして、リクエストのヘッダーを検証
        mock.onPost(url).reply((req) => {
            var _a;
            const data = JSON.parse(req.data);
            console.log("req", { data });
            expect(data.date1).toEqual(date1s);
            expect((_a = req.headers) === null || _a === void 0 ? void 0 : _a["Authorization"]).toEqual(headers["Authorization"]);
            return [200, { postRes: "2", date2 }];
        });
        const res = yield zgokAxios.myTest.postTest({ id: "1", date1 }, { headers });
        console.log("res", res);
        expect(res.date2).toEqual(date2);
    }));
});
