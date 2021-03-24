import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import {ServerStyleSheets} from "@material-ui/styles";

class CustomDocument extends Document {
  static async getInitialProps (ctx) {
    const sheets = new ServerStyleSheets()

    const originalRenderPage = ctx.renderPage({
      enhanceApp: App => props => sheets.collect()
    })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
  }
  render() {
    return (
      // 省略
    );
  }
}
export default CustomDocument;