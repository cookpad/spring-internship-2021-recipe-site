type HttpMethod = "GET" | "POST" | "DELETE";
const Protcol = "https://";

/* eslint no-undef: 0 */
const API_ENDPOINT_HOST = process.env.NEXT_PUBLIC_API_ENDPOINT_HOST;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchApi = async (
  method: HttpMethod,
  endpoint: string,
  { parameter, body }: { parameter?: any; body?: any }
): Promise<Response> => {
  if (!API_ENDPOINT_HOST) throw new Error();
  if (!API_KEY) throw new Error();

  const parameterString = parameter
    ? "?" + new URLSearchParams(parameter).toString()
    : "";
  const url = Protcol + API_ENDPOINT_HOST + endpoint + parameterString;
  console.log(url);
  return await fetch(url, {
    method: method,
    headers: { "X-Api-Key": API_KEY },
    body: JSON.stringify(body),
  });
};
