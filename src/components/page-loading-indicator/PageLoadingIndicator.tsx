// @flow

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import style from './ProgressBar.module.css';

const PageLoadingIndicator = () => {
  const router = useRouter();
  const [isLoad, setLoad] = useState(false);
  const handleRouteChangeStart = () => {
    setLoad(true);
  };
  const handleRouteChangeComplete = () => {
    setLoad(false);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  if (!isLoad) return null;

  return (
    <div className="w-full overflow-hidden fixed top-12">
      <div
        className={classNames('w-1/2 inline-block relative fluentProgressBar-waiting', style.fluentProgressBarNormal)}
      />
    </div>
  );
};

export default PageLoadingIndicator;
