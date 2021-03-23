import React, { FC } from "react";

type Props = { steps: string[] };

const Steps: FC<Props> = (props) => {
    return (
        <ol>
            {props.steps.map((step, i) => (
                <li key={i}>{step}</li>
            ))}
        </ol>
    );
};

export default Steps;
