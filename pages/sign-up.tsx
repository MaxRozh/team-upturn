import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LoginForm from 'components/login/LoginForm';

export default function SignUpPage() {
  return <LoginForm isSignIn={false} />;
}

export async function getServerSideProps({ locale, locales }: { locale: string; locales: Array<string> }) {
  return {
    props: {
      locale,
      locales,
      ...(await serverSideTranslations(locale, ['sign-in', 'common']))
    }
  };
}
