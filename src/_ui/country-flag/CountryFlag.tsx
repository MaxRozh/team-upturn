import React from 'react';
import dynamic from 'next/dynamic';

interface PropsType {
  styleClassName?: string;
  code: string;
}

function CountryFlag({ styleClassName, code }: PropsType): JSX.Element | null {
  if (!code) return null;
  const Comp = dynamic(() => import(`@svg/countries/${code}.svg`));
  // @ts-ignore
  return <Comp className={styleClassName} />;
}

export default CountryFlag;
