import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Disclosure } from '@headlessui/react';
import { TFunction, useTranslation} from 'next-i18next';

import CloseSvg from '@svg/close.svg';
import HamburgerSvg from '@svg/hamburger.svg';
import UiTransition from '_ui/transition/UiTransition';
import HeaderNotifications from 'components/header/notifications/HeaderNotifications';
import HeaderProfileMenu from 'components/header/profile/HeaderProfileMenu';
import HeaderLocale from 'components/header/locale/HeaderLocale';

import { MENU_LIST, MenuItemType } from 'constants/menu';
import { notificationsList } from 'constants/mocks/notifications';

const MenuItem = ({ item, isCurrentPage, t }: { item: MenuItemType; isCurrentPage: boolean; t: TFunction }) => (
  <Link href={item.href}>
    <a
      className={classNames(
        isCurrentPage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'px-3 py-2 rounded-md text-sm font-medium'
      )}
      aria-current={isCurrentPage ? 'page' : undefined}
    >
      {t(item.name)}
    </a>
  </Link>
);

function Header() {
  const { t } = useTranslation('common');

  return (
    <Disclosure as="header" className="bg-gray-800 fixed w-full z-30">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* eslint-disable-next-line max-len */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <CloseSvg className="h-6 w-6" /> : <HamburgerSvg className="h-6 w-6" />}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <a className="text-2xl font-bold text-white dark:text-white lg:text-3xl" href="/">
                    Team Upturn
                  </a>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {MENU_LIST.map((item) => (
                      <MenuItem item={item} isCurrentPage={false} key={item.name} t={t} />
                    ))}
                  </div>
                </div>
              </div>
              {/* eslint-disable-next-line max-len */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <HeaderLocale />
                <HeaderNotifications list={notificationsList} t={t} />
                <HeaderProfileMenu
                  isLogged
                  profileInfo={{
                    // eslint-disable-next-line max-len
                    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  }}
                  t={t}
                />
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <UiTransition>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {MENU_LIST.map((item) => (
                  <MenuItem item={item} isCurrentPage={false} key={item.name} t={t} />
                ))}
              </div>
            </UiTransition>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
