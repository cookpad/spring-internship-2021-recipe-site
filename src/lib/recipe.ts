import { Recipe, Response } from '../types/recipe'

const URL = 'https://internship-recipe-api.ckpd.co/'
const apiKey = process.env.NEXT_PUBLIC_API_KEY

export async function getRecipeList(url: string | null): Promise<Response> {
  if (!apiKey) throw new Error('no api key')
  const headers = {
    'X-Api-Key': apiKey,
  }
  const res = await fetch(url ? url : URL + 'recipes', {
    headers: headers,
  })
  const response: Response = await res.json()
  return response
}

export async function getRecipe(id: number): Promise<Recipe | null> {
  if (!apiKey) throw new Error('no api key')
  const res = await fetch(URL + 'recipes/' + id.toString(), {
    headers: {
      'X-Api-Key': apiKey,
    },
  })
  const recipe: Recipe = await res.json()
  return recipe
}
