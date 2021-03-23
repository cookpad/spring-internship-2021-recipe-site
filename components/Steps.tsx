import React, { FC } from "react";

type Props = { steps: string[] };

export const Steps: FC<Props> = (props) => {
  return (
    <div className="recipeSubsection">
      <h2>手順</h2>
      <ol>
        {props.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
};
