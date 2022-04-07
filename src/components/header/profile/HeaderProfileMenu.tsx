import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Menu } from '@headlessui/react';
import { inject, observer } from 'mobx-react';

import UserSvg from '@svg/user.svg';
import UiTransition from '_ui/transition/UiTransition';

import { PROFILE_MENU_LIST } from 'constants/profileMenu';
import UserStore, { USER_STORE_NAME } from 'logic/user/userStore';
import AuthStore, { AUTH_STORE_NAME } from 'logic/auth/authStore';

type PropsType = {
  userStore: UserStore;
  authStore: AuthStore;
  t: Function;
};

function HeaderProfileMenu({ userStore, authStore, t }: PropsType) {
  const { user } = userStore;

  return authStore?.isAuthenticated && user ? (
    <Menu as="div" className="ml-3 relative">
      <div>
        {/* eslint-disable-next-line max-len */}
        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          {user.img ? (
            <img className="h-8 w-8 rounded-full" src={user.img} alt="Profile avatar" />
          ) : (
            <UserSvg className="h-8 w-8 rounded-full bg-gray-800" />
          )}
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
          <Menu.Item>
            {() => (
              <button className={classNames('block px-4 py-2 text-sm text-gray-700')} onClick={authStore.logout}>
                {t('sign_out')}
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </UiTransition>
    </Menu>
  ) : (
    <div className="ml-3 relative">
      <a href="/sign-in" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
        {t('sign_in')}
      </a>
    </div>
  );
}

export default inject(USER_STORE_NAME, AUTH_STORE_NAME)(observer(HeaderProfileMenu));
