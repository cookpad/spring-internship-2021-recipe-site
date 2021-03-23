import { Response } from '../types/recipe'
const URL = 'https://internship-recipe-api.ckpd.co/'
const apiKey = process.env.NEXT_PUBLIC_API_KEY

export async function search(keyword: string): Promise<Response> {
  if (!apiKey) throw new Error('no api key')
  const headers = {
    'X-Api-Key': apiKey,
  }

  const res = await fetch(URL + 'search?keyword=' + keyword, {
    headers: headers,
  })
  const response: Response = await res.json()
  return response
}
