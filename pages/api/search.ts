import { NextApiRequest, NextApiResponse } from "next";
import { ORIGIN_API_ENDPOINT_SEARCH } from "../../lib/constants";
import api from "../../lib/server/api-client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const requestURL = `${ORIGIN_API_ENDPOINT_SEARCH}?${new URLSearchParams(
    req.query as { [key: string]: string }
  )}`;
  const json = await (await api(requestURL)).json();
  res.json(json);
}
