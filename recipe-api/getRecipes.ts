import { APIResponse } from "../@types/recipe-api/getRecipes";
import { fetchApi } from "./util";

export const getRecipes = async (): Promise<APIResponse> => {
  const res = await fetchApi("GET", "/recipes", {});
  const json = await res.json();
  return json as APIResponse;
};
