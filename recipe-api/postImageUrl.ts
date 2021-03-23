import * as PostImageUrl from "../@types/recipe-api/postImageUrl";
import { fetchApi } from "./util";

export const postImageUrl = async (): Promise<PostImageUrl.APIResponse> => {
  const res = await fetchApi("POST", "/recipes", {});
  const json = await res.json();
  return json as PostImageUrl.APIResponse;
};
