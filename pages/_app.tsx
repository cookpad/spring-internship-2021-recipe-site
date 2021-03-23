import { AppProps } from "next/app";
import "../styles/globals.css";

function RecipeSiteApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default RecipeSiteApp;
