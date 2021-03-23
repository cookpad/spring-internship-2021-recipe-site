import { fetchApi } from "./util";

export const deleteRecipe = async (id: number): Promise<void> => {
  const res = await fetchApi("DELETE", "/recipes/" + id.toString(), {});
  if (res.status == 204) {
    return;
  } else {
    throw Error();
  }
};
