import { QueryParameter, APIResponse } from "../@types/recipe-api/getSearch";
import { fetchApi } from "./util";

export const searchRecipes = async (
  parameter: QueryParameter
): Promise<APIResponse> => {
  const res = await fetchApi("GET", "/search", { parameter: parameter });
  const json = await res.json();
  return json as APIResponse;
};
