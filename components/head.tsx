import { default as NHead } from "next/head";
import { FC } from "react";

type Props = {
  title: string;
  description: string;
  image: string;
  url: string;
};

const Head: FC<Props> = (props) => {
  return (
    <NHead>
      <title>{props.title}</title>

      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={props.url} />
      <meta property="og:image" content={props.image} />
      <meta property="og:site_name" content={props.title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
      <link rel="canonical" href={props.url} />
    </NHead>
  );
};

export default Head;
