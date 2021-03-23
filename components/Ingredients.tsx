import React, { FC } from "react";

type Props = { ingredients: { name: string; quantity: string }[] };

export const Ingredients: FC<Props> = (props) => {
  return (
    <div className="recipeSubsection">
      <h2>材料</h2>
      <ul>
        {props.ingredients.map((ingredient, i) => (
          <li key={i}>
            {ingredient.name} {ingredient.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};
