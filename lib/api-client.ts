import { ORIGIN_API_HEADER_X_API_KEY } from "./constants";

/**
 * レシピ取得 API 等を利用する際に環境変数として指定されている API キーを利用して HTTP リクエストを行います。
 * @param input `fetch` 関数で利用する引数
 * @param init `fetch` 関数で利用する引数
 * @returns API キーをヘッダに含めて fetch した際に生成される Promise オブジェクト
 */
export default function api(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  let headers = {};
  if (init) headers = init.headers;

  headers[ORIGIN_API_HEADER_X_API_KEY] = process.env.API_HEADER_X_API_KEY;

  return fetch(input, { ...init, headers });
}
