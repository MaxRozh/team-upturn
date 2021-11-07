import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { i18n } from 'next-i18next';

// import theme from 'styles/theme';

// import Favicons from 'components/favicons/Favicons';

class MyDocument extends Document {
  render() {
    return (
      <Html lang={i18n.language}>
        <Head>
          <meta charSet="utf-8" />
          <meta content="ie=edge" httpEquiv="x-ua-compatible" />
          {/*<meta name="theme-color" content={theme.palette.primary.main} />*/}
          {/*<Favicons />*/}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
