import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { appWithTranslation } from 'next-i18next';

// import MetaTags from 'components/meta-tags/MetaTags';
import Layout from 'components/Layout';
// import apolloClient from '../apollo-client';

import { useApollo } from 'libs/apollo';
// import theme from 'styles/theme';

// import 'styles/normalize.css';
import 'tailwindcss/tailwind.css';

interface PropsType {
  Component: any;
  pageProps: any;
  router: Object;
  err: string | Object;
}

function MyApp({ Component, pageProps, router, err }: PropsType) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      {/*<MetaTags*/}
      {/*  title="some title"*/}
      {/*  description="some desc"*/}
      {/*  image=""*/}
      {/*  url="https://domain"*/}
      {/*>*/}
      {/*  <>*/}
      {/*    <meta name="viewport" content="width=device-width, initial-scale=1" />*/}
      {/*    <meta property="og:site_name" content="some site name" />*/}
      {/*    <meta property="og:type" content="website" />*/}
      {/*  </>*/}
      {/*</MetaTags>*/}
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Team Upturn</title>
        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Layout>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component router={router} err={err} {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}

// @ts-ignore
export default withRouter(appWithTranslation(MyApp));
