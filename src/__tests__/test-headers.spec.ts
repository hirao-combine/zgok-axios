import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { z } from "zod";
import { ZgokAxios } from "..";
import {
  deleteFunction,
  getFunction,
  patchFunction,
  postFunction,
  putFunction,
} from "@zgok-api/zgok-core";

const schema = {
  headersTest: {
    getTest: getFunction({
      req: z.object({ id: z.string() }),
      res: z.object({ id: z.string() }),
    }),
    postTest: postFunction({
      req: z.object({ id: z.string() }),
      res: z.object({ postRes: z.string() }),
    }),
    putTest: putFunction({
      req: z.object({ id: z.string() }),
      res: z.object({ putRes: z.string() }),
    }),
    patchTest: patchFunction({
      req: z.object({ id: z.string() }),
      res: z.object({ patchRes: z.string() }),
    }),
    deleteTest: deleteFunction({
      req: z.object({ id: z.string() }),
      res: z.object({ deleteRes: z.string() }),
    }),
  },
};
const axios = Axios.create({ baseURL: "http://localhost:3000" });
const zgokAxios = ZgokAxios(axios, schema);
const headers = { Authorization: "Bearer token123" };

describe("zgokAxios test headers", () => {
  it("should perform a GET request and return data", async () => {
    const mock = new MockAdapter(axios);
    const url = "http://localhost:3000/headersTest/getTest";

    // Axios への呼び出しをモックして、リクエストのヘッダーを検証
    mock.onGet(url, { headers }).reply((config) => {
      console.log("config.headers", config.headers);
      expect(config.headers?.["Authorization"]).toEqual(
        headers["Authorization"]
      );
      return [200, { id: "2" }];
    });
    await zgokAxios.headersTest.getTest({ id: "1" }, { headers });
  });

  it("should perform a POST request and return data", async () => {
    const mock = new MockAdapter(axios);
    const url = "http://localhost:3000/headersTest/postTest";

    // Axios への呼び出しをモックして、リクエストのヘッダーを検証
    mock.onPost(url).reply((config) => {
      console.log("config.headers", config.headers);
      expect(config.headers?.["Authorization"]).toEqual(
        headers["Authorization"]
      );
      return [200, { postRes: "2" }];
    });
    await zgokAxios.headersTest.postTest({ id: "1" }, { headers });
  });

  it("should perform a PUT request and return data", async () => {
    const mock = new MockAdapter(axios);
    const url = "http://localhost:3000/headersTest/putTest";

    // Axios への呼び出しをモックして、リクエストのヘッダーを検証
    mock.onPut(url).reply((config) => {
      console.log("config.headers", config.headers);
      expect(config.headers?.["Authorization"]).toEqual(
        headers["Authorization"]
      );
      return [200, { putRes: "2" }];
    });
    await zgokAxios.headersTest.putTest({ id: "1" }, { headers });
  });

  it("should perform a PATCH request and return data", async () => {
    const mock = new MockAdapter(axios);
    const url = "http://localhost:3000/headersTest/patchTest";

    // Axios への呼び出しをモックして、リクエストのヘッダーを検証
    mock.onPatch(url).reply((config) => {
      console.log("config.headers", config.headers);
      expect(config.headers?.["Authorization"]).toEqual(
        headers["Authorization"]
      );
      return [200, { patchRes: "2" }];
    });
    await zgokAxios.headersTest.patchTest({ id: "1" }, { headers });
  });

  it("should perform a DELETE request and return data", async () => {
    const mock = new MockAdapter(axios);
    const url = "http://localhost:3000/headersTest/deleteTest";

    // Axios への呼び出しをモックして、リクエストのヘッダーを検証
    mock.onDelete(url).reply((config) => {
      console.log("config.headers", config.headers);
      expect(config.headers?.["Authorization"]).toEqual(
        headers["Authorization"]
      );
      return [200, { deleteRes: "2" }];
    });
    await zgokAxios.headersTest.deleteTest({ id: "1" }, { headers });
  });
});
