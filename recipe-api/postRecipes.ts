import { RequestBody, APIResponse } from "../@types/recipe-api/postRecipes";
import { fetchApi } from "./util";

export const postRecipe = async (body: RequestBody): Promise<APIResponse> => {
  const res = await fetchApi("POST", "/recipes", { body: body });
  const json = await res.json();
  return json as APIResponse;
};
