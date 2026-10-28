import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { z } from "zod";
import { ZgokAxios } from "..";
import { getFunction, postFunction } from "@zgok-api/zgok-core";

const schema = {
  noReq: {
    getTest: getFunction({
      res: z.object({ name: z.string() }),
    }),
    postTest: postFunction({
      res: z.object({ name: z.string() }),
    }),
  },
};
const axios = Axios.create({ baseURL: "http://localhost:3000" });
const zgokAxios = ZgokAxios(axios, schema);
const headers = { Authorization: "Bearer token123" };

describe("zgokAxios without req", () => {
  it("GET with no arguments sends no q param", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/noReq/getTest").reply((config) => {
      expect(config.params).toBeNull();
      return [200, { name: "get" }];
    });
    const res = await zgokAxios.noReq.getTest();
    expect(res).toEqual({ name: "get" });
  });

  it("GET with opts only passes headers", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/noReq/getTest").reply((config) => {
      expect(config.headers?.["Authorization"]).toEqual(headers.Authorization);
      return [200, { name: "get" }];
    });
    await zgokAxios.noReq.getTest({ headers });
  });

  it("POST with no arguments sends no body", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost("http://localhost:3000/noReq/postTest").reply((config) => {
      expect(config.data).toBeUndefined();
      return [200, { name: "post" }];
    });
    const res = await zgokAxios.noReq.postTest();
    expect(res).toEqual({ name: "post" });
  });

  it("type check: no data argument allowed", () => {
    const _typeCheck = () => {
      // @ts-expect-error req が無い API にデータは渡せない
      zgokAxios.noReq.getTest({ id: 1 }, { headers });
    };
    expect(typeof _typeCheck).toBe("function");
  });
});
