import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Menu } from '@headlessui/react';

import UiTransition from '_ui/transition/UiTransition';

import { PROFILE_MENU_LIST } from 'constants/profileMenu';

type PropsType = {
  isLogged: boolean;
  profileInfo: {
    img: string;
  };
  t: Function;
};

function HeaderProfileMenu({ isLogged, profileInfo, t }: PropsType) {
  return isLogged ? (
    <Menu as="div" className="ml-3 relative">
      <div>
        {/* eslint-disable-next-line max-len */}
        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={profileInfo.img} alt="Profile avatar" />
        </Menu.Button>
      </div>
      <UiTransition>
        {/* eslint-disable-next-line max-len */}
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {PROFILE_MENU_LIST.map(({ name, href }) => (
            <Menu.Item key={name}>
              {({ active }) => (
                <Link href={href}>
                  <a className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                    {t(name)}
                  </a>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </UiTransition>
    </Menu>
  ) : (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <a href="/sign-in" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
        {t('sign_in')}
      </a>
      <a
        href="/sign-out"
        // eslint-disable-next-line max-len
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {t('sign_up')}
      </a>
    </div>
  );
}

export default HeaderProfileMenu;
