import { FC } from 'react';
import { Links, Recipe } from '../../lib/recipe';

import { getOtherRecipes } from "../../lib/recipe";

type ButtonProps = {
  buttonText: string;
  link?: string;
  handleClick: (recipes: Recipe[], links: Links) => void;
};

const Button: FC<ButtonProps> = ({ buttonText, link, handleClick }) => {
  const onClick = (): void => {
    (async () => {
      const result = await getOtherRecipes(link);
      const recipes = result.recipes;
      const links = result.links;
      handleClick(recipes, links);
    })();
  };

  return(
    <>
      <button onClick={onClick}>{buttonText}</button>
    </>
  )
};

export default Button;
