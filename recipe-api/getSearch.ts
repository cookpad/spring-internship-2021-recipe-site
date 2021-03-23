import { QueryParameter, APIResponse } from "../@types/recipe-api/getSearch";
import { fetchApi } from "./util";

export const searchRecipes = async (
  parameter: QueryParameter
): Promise<APIResponse> => {
  const res = await fetchApi("GET", "/search", { parameter: parameter });
  if (res.status === 404) return "NOT_FOUND";
  if (res.status !== 200) throw new Error();

  const json = await res.json();
  return json as APIResponse;
};
