import React, { FC } from "react";

type Props = { ingredients: { name: string, quantity: string }[] };

const Ingredients: FC<Props> = (props) => {
    return (
        <ul>
            {props.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient.name} {ingredient.quantity}</li>
            ))}
        </ul>
    );
};

export default Ingredients;
