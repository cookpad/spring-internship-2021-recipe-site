import React, { FC } from "react";

type Props = {
  previous?: () => void;
  next?: () => void;
};

export const Page: FC<Props> = (props) => {
  const isPreviousExists = props.previous != null;
  const isNextExists = props.next != null;
  return (
    <div className="footer">
      <button onClick={props.previous} disabled={!isPreviousExists}>
        前へ
      </button>
      <button onClick={props.next} disabled={!isNextExists}>
        次へ
      </button>
    </div>
  );
};
