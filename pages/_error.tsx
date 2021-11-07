import React from 'react';
import NextErrorComponent from 'next/error';
import * as Sentry from '@sentry/nextjs';

interface PropsType {
  statusCode: number;
  hasGetInitialPropsRun: boolean;
  err: any;
}
interface GetInitialPropsType {
  res: Response;
  err: any;
  asPath: string;
  locale: string;
  locales: Array<string>;
}

function Error({ statusCode, hasGetInitialPropsRun, err }: PropsType) {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
}

Error.getInitialProps = async ({ res, err, asPath, locale, locales }: GetInitialPropsType) => {
  // @ts-ignore
  const errorInitialProps: any = await NextErrorComponent.getInitialProps({ res, err });

  // @ts-ignore
  Sentry.captureException(err || new Error(`_error.js getInitialProps missing data at path: ${asPath}`));
  await Sentry.flush(2000);

  return {
    ...errorInitialProps,
    hasGetInitialPropsRun: true,
    locale
  };
};

export default Error;
