import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { z } from "zod";
import { ZgokAxios } from "..";
import { postFunction, zgokDate } from "@zgok-api/zgok-core";

const schema = {
  myTest: {
    postTest: postFunction({
      req: z.object({ id: z.string(), date1: zgokDate() }),
      res: z.object({ postRes: z.string(), date2: zgokDate() }),
    }),
  },
};
const axios = Axios.create({ baseURL: "http://localhost:3000" });
const zgokAxios = ZgokAxios(axios, schema);
const headers = { Authorization: "Bearer token123" };

describe("zgokAxios post test", () => {
  it("should perform a POST request and return data", async () => {
    const mock = new MockAdapter(axios);
    const date1s = "2024-07-15T10:42:21.070Z";
    const date1 = new Date(date1s);
    const date2 = new Date();
    date2.setMonth(date2.getMonth() + 2);
    const url = "http://localhost:3000/myTest/postTest";

    // Axios への呼び出しをモックして、リクエストのヘッダーを検証
    mock.onPost(url).reply((req) => {
      const data = JSON.parse(req.data);
      console.log("req", { data });
      expect(data.date1).toEqual(date1s);
      expect(req.headers?.["Authorization"]).toEqual(headers["Authorization"]);
      return [200, { postRes: "2", date2 }];
    });
    const res = await zgokAxios.myTest.postTest(
      { id: "1", date1 },
      { headers }
    );
    console.log("res", res);
    expect(res.date2).toEqual(date2);
  });
});
