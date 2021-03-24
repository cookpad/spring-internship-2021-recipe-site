import { useRouter } from "next/dist/client/router";
import { default as NHead } from "next/head";
import { FC } from "react";
import getCurrentFullUrl from "../lib/current-full-url";

type Props = {
  title: string;
  description: string;
  image: string;
};

const Head: FC<Props> = (props) => {
  let { title, description, image } = props;
  if (!image) image = "https://placehold.jp/1200x630.png";
  const url = getCurrentFullUrl();

  return (
    <NHead>
      <title>{props.title}</title>

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </NHead>
  );
};

export default Head;
