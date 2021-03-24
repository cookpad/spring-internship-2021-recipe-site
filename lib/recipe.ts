export type Recipe = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  author: {
    user_name: string;
  };
  published_at: string;
  steps: string[];
  ingredients: {
    name: string;
    quantity: string;
  }[];
  related_recipes: number[];
};

export type Response = {
  recipes: Recipe[];
  links: Links;
};

export type Links = {
  prev?: string;
  next?: string;
}

export async function getRecipes(): Promise<Response> {
  const response = await fetch('https://internship-recipe-api.ckpd.co/recipes', {
    headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY }
  });
  const result = await response.json();
  return result as Response;
}

export async function getOtherRecipes(link: string): Promise<Response> {
  const response = await fetch(link, {
    headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY }
  });
  const result = await response.json();
  return result as Response;
}

export async function getRecipe(id: number): Promise<Recipe> {
  const response = await fetch(`https://internship-recipe-api.ckpd.co/recipes/${id}`, {
    headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY }
  });
  const recipe = await response.json();
  return recipe as Recipe;
}

export async function searchRecipes(keyword: string): Promise<Response> {
  const response = await fetch(`https://internship-recipe-api.ckpd.co/search?keyword=${keyword}`, {
    headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY }
  });
  const result = await response.json();
  return result as Response;
}
