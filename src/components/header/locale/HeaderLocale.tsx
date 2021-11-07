/* eslint-disable */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu } from '@headlessui/react';
import { i18n } from 'next-i18next';

import CountryFlag from '_ui/country-flag/CountryFlag';
import UiTransition from '_ui/transition/UiTransition';

import { LOCALES_LIST, DEFAULT_LOCALE } from 'constants/locales';

function HeaderLocale() {
  const { pathname } = useRouter();
  const currentLocale = i18n?.language || DEFAULT_LOCALE;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {/* eslint-disable-next-line max-len */}
        <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <CountryFlag code={currentLocale} styleClassName="w-5 h-5 text-violet-200 hover:text-violet-100" />
        </Menu.Button>
      </div>
      <UiTransition>
        {/* eslint-disable-next-line max-len */}
        <Menu.Items className="absolute right-1 mt-1 origin-top-right bg-gray-800 divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          {LOCALES_LIST.map((locale) => (
            <Menu.Item key={locale}>
              <Link href={`/${locale}${pathname}`} locale={false}>
                <a
                  className={`${currentLocale === locale ? 'bg-white' : ''} flex items-center px-2 py-2 hover:bg-white`}
                >
                  <CountryFlag code={locale} styleClassName="w-5 h-5" />
                </a>
              </Link>
            </Menu.Item>
          ))}
        </Menu.Items>
      </UiTransition>
    </Menu>
  );
}

export default HeaderLocale;
