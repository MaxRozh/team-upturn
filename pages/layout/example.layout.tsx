import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import checkIsSmallDevice from 'utils/checkIsSmallDevice';

function LayoutExample() {
  return (
    <div>
      <h1>Layout example</h1>
    </div>
  );
}

export async function getServerSideProps({ req, locale }: { req: any; locale: string }) {
  const isSmallDevice = req && req.headers ? checkIsSmallDevice(req.headers['user-agent']) : false;

  return {
    props: {
      locale,
      isSmallDevice,
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

export default LayoutExample;
