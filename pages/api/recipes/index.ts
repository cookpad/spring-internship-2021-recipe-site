import { NextApiRequest, NextApiResponse } from "next";
import api from "../../../lib/api-client";
import { API_ENDPOINT_RECIPES } from "../../../lib/constants";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const json = await (
    await api(
      `${API_ENDPOINT_RECIPES}?${new URLSearchParams(
        req.query as { [key: string]: string }
      )}`
    )
  ).json();
  res.json(json);
}
