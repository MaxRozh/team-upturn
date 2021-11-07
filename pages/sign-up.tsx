import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SignUpBlock from 'components/_block/sign-up/SignUpBlock';

export default function SignUpPage() {
  return <SignUpBlock />;
}

export async function getServerSideProps({ locale, locales }: { locale: string, locales: Array<string> }) {
  return {
    props: {
      locale,
      locales,
      ...(await serverSideTranslations(locale, ['sign-in']))
    }
  };
}
