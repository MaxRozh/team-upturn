import React from 'react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';

import RingSvg from '@svg/ring.svg';
import UiTransition from '_ui/transition/UiTransition';

import { NotificationItemType } from 'constants/mocks/notifications';

type PropsType = {
  list: Array<NotificationItemType>;
  t: Function;
};

function HeaderNotifications({ list, t }: PropsType) {
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        {/* eslint-disable-next-line max-len */}
        <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">View notifications</span>
          <RingSvg className="h-6 w-6" />
        </Menu.Button>
      </div>
      <UiTransition>
        {/* eslint-disable-next-line max-len */}
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {list.map(({ id, href, img, message }) => (
            <Menu.Item key={id}>
              <Link href={href}>
                {/* eslint-disable-next-line max-len */}
                <a className="flex items-center px-4 py-3 transition-colors duration-200 transform border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700">
                  <img className="object-cover w-8 h-8 mx-1 rounded-full" src={img} alt="avatar" />
                  <p className="mx-2 text-sm text-gray-600 dark:text-white">
                    {message.map((item) => {
                      if (item.type) {
                        return (
                          <span
                            className={item.type === 'important' ? 'font-bold text-blue-500' : 'font-bold'}
                            key={item.text}
                          >
                            {item.text}
                          </span>
                        );
                      }
                      return item.text;
                    })}
                  </p>
                </a>
              </Link>
            </Menu.Item>
          ))}
          <Menu.Item>
            <Link href="/notifications">
              <a className="block py-2 font-bold text-center text-white bg-gray-800 dark:bg-gray-700 hover:underline">
                {t('see_all_notifications')}
              </a>
            </Link>
          </Menu.Item>
        </Menu.Items>
      </UiTransition>
    </Menu>
  );
}

export default HeaderNotifications;
