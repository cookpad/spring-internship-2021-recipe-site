import { APIResponse } from "../@types/recipe-api/getRecipesId";
import { fetchApi } from "./util";

export const getRecipe = async (id: number): Promise<APIResponse> => {
  const res = await fetchApi("GET", "/recipes/" + id.toString(), {});
  if (res.status === 404) return "NOT_FOUND";

  const json = await res.json();
  return json as APIResponse;
};
