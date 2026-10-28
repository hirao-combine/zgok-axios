import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { z, ZodError } from "zod";
import { ZgokAxios } from "..";
import { deleteFunction, getFunction, postFunction } from "@zgok-api/zgok-core";

const schema = {
  v: {
    get1: getFunction({
      req: z.object({ id: z.number() }),
      res: z.object({ name: z.string() }),
    }),
    delete1: deleteFunction({
      req: z.object({ id: z.number() }),
      res: z.object({ name: z.string() }),
    }),
    post1: postFunction({
      req: z.object({ id: z.number() }),
      res: z.object({ name: z.string() }),
    }),
  },
};
const axios = Axios.create({ baseURL: "http://localhost:3000" });
const zgokAxios = ZgokAxios(axios, schema);
const base = "http://localhost:3000/v";

describe("zgokAxios validation", () => {
  it("GET encodes the request as ?q=<JSON>", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${base}/get1`).reply((config) => {
      expect(config.params).toEqual({ q: JSON.stringify({ id: 1 }) });
      return [200, { name: "ok" }];
    });
    expect(await zgokAxios.v.get1({ id: 1 })).toEqual({ name: "ok" });
  });

  it("DELETE encodes the request as ?q=<JSON>", async () => {
    const mock = new MockAdapter(axios);
    mock.onDelete(`${base}/delete1`).reply((config) => {
      expect(config.params).toEqual({ q: JSON.stringify({ id: 2 }) });
      return [200, { name: "ok" }];
    });
    expect(await zgokAxios.v.delete1({ id: 2 })).toEqual({ name: "ok" });
  });

  it("invalid request throws ZodError before sending", async () => {
    const mock = new MockAdapter(axios);
    let called = false;
    mock.onPost(`${base}/post1`).reply(() => {
      called = true;
      return [200, { name: "ok" }];
    });
    await expect(zgokAxios.v.post1({ id: "1" } as any)).rejects.toBeInstanceOf(
      ZodError
    );
    expect(called).toBe(false);
  });

  it("invalid response throws ZodError", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(`${base}/post1`).reply(200, { name: 123 });
    await expect(zgokAxios.v.post1({ id: 1 })).rejects.toBeInstanceOf(ZodError);
  });

  it("response is the parsed data (unknown keys stripped)", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(`${base}/post1`).reply(200, { name: "ok", extra: "x" });
    expect(await zgokAxios.v.post1({ id: 1 })).toEqual({ name: "ok" });
  });

  it("HTTP error from axios is propagated", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(`${base}/post1`).reply(500, { message: "boom" });
    await expect(zgokAxios.v.post1({ id: 1 })).rejects.toMatchObject({
      response: { status: 500 },
    });
  });
});
