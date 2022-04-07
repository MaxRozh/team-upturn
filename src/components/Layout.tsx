import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';

import Header from 'components/header/Header';
import PageLoadingIndicator from 'components/page-loading-indicator/PageLoadingIndicator';
import Footer from 'components/footer/Footer';

import AuthStore, { AUTH_STORE_NAME } from 'logic/auth/authStore';

type PropsType = {
  authStore: AuthStore;
  children: JSX.Element;
};

function Layout({ children, authStore }: PropsType) {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== '/sign-in' && router.asPath !== '/sign-up') {
      authStore.fetchCurrentUser();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <PageLoadingIndicator />
      <main className="flex-grow" style={{ minHeight: 'calc(100vh - 239px)' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default inject(AUTH_STORE_NAME)(observer(Layout));
