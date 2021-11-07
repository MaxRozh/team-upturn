import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { MENU_LIST } from 'constants/menu';

const FOOTER_ADDITIONAL_MENU = [
  { name: 'faq', href: '/doc' },
  { name: 'privacy', href: '/privacy' },
  { name: 'term_of_use', href: '/term-of-use' }
];

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:w-full md:px-24 lg:px-32 bg-gray-800">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <a href="/" aria-label="Go home" title="Company" className="inline-flex items-center">
            <span className="text-xl font-bold tracking-wide text-white uppercase">Team Upturn</span>
          </a>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-gray-400">{t('footer_desc_1')}</p>
            <p className="mt-4 text-sm text-gray-400">{t('footer_desc_2')}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <span className="text-base font-bold tracking-wide text-gray-200">{t('menu')}</span>
          {MENU_LIST.map(({ name, href }) => (
            <div className="flex" key={name}>
              <Link href={href}>
                <a
                  aria-label={name}
                  title={name}
                  className="transition-colors duration-300 text-gray-400 hover:text-white"
                >
                  {t(name)}
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <span className="text-base font-bold tracking-wide text-gray-200">{t('social')}</span>
          {/*<div className="flex items-center mt-1 space-x-3">*/}
          {/*  {SOCIALS_LIST.map((item) => (*/}
          {/*    <a*/}
          {/*      href={item.href}*/}
          {/*      className="text-gray-500 transition-colors duration-300 hover:text-white"*/}
          {/*      key={item.name}*/}
          {/*    >*/}
          {/*      <Svg icon={item.icon} styleClassName="w-5 h-5" />*/}
          {/*    </a>*/}
          {/*  ))}*/}
          {/*</div>*/}
          <p className="mt-4 text-sm text-gray-400">{t('social_desc')}</p>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
        <p className="text-sm text-gray-400">
          © Copyright {new Date().getUTCFullYear()} Team Upturn. All rights reserved.
        </p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          {FOOTER_ADDITIONAL_MENU.map(({ name, href }) => (
            <li key={name}>
              <Link href={href}>
                <a className="text-sm text-gray-400 transition-colors duration-300 hover:text-white">{t(name)}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
