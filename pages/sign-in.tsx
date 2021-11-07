import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SignInBlock from 'components/_block/sign-in/SignInBlock';

export default function SignInPage() {
  return <SignInBlock />;
}

export async function getServerSideProps({ locale, locales }: { locale: string; locales: Array<string> }) {
  return {
    props: {
      locale,
      locales,
      ...(await serverSideTranslations(locale, ['sign-in']))
    }
  };
}
