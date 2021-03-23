import { QueryParameter, APIResponse } from "../@types/recipe-api/getRecipes";
import { fetchApi } from "./util";

export const getRecipes = async (
  query: QueryParameter
): Promise<APIResponse> => {
  const res = await fetchApi("GET", "/recipes", { parameter: query });
  const json = await res.json();
  return json as APIResponse;
};
