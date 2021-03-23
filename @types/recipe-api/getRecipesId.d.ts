import { Recipe } from "./recipe"
import { NotFound } from "./notFound";

// Request
// リクエストパラメータはなし。

// Response
export type APIResponse = Recipe | NotFound;
