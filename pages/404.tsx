import React from 'react';
import Error from 'next/error';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Custom404() {
  return <Error statusCode={404} />;
}

export async function getStaticProps({ locale, locales }: { locale: string; locales: Array<string> }) {
  return {
    props: {
      locales,
      locale,
      ...(await serverSideTranslations(locale, ['error']))
    }
  };
}
