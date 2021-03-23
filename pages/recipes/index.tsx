import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as RecipeAPI from "../../recipe-api/getRecipes"
import { Recipe } from "../../@types/recipe-api/recipe";
import Steps from "./Steps";
import Ingredients from "./Ingredients";

type State
    = {
        type: 'LOADING'
    } | {
        type: 'LOADED',
        recipes: Recipe[]
    };


const SearchPage: FC = () => {
    const router = useRouter();
    const [state, setState] = useState<State>({ type: "LOADING" });

    useEffect(() => {
        (async () => {
            try {
                const res = await RecipeAPI.getRecipes();
                setState({ type: "LOADED", recipes: res.recipes });
            } catch (error) {
                console.error(error);
            }
        })();
    }, [router.query.id]);

    switch (state.type) {
        case 'LOADING':
            return <h1>Loading</h1>;
        case 'LOADED':
            return (
                <ul>{state.recipes.map((recipe, i) => (
                    <li>
                        {recipe.image_url && (<img src={recipe.image_url} alt="レシピ画像" />)}

                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                    </li>
                ))}</ul>
            );
        default: {
            const _exhaustiveCheck: never = state;
            return _exhaustiveCheck;
        }
    }
};

export default SearchPage;
