import React from 'react';
import Link from 'next/link';

type PropsType = {
  isSignIn: boolean;
  children: JSX.Element | JSX.Element[];
  t: Function;
};

function LoginForm({ isSignIn, children, t }: PropsType) {
  return (
    <div className="w-5/6 sm:w-2/3 md:w-1/2 my-24 py-6 px-6 shadow mx-auto rounded-sm">
      <form className="w-full mx-auto text-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{t('welcome')}</h2>
          <p className="mt-3 text-gray-800">
            {t(isSignIn ? 'newly' : 'already_have')}{' '}
            <Link href={isSignIn ? '/sign-up' : 'sign-in'}>
              <a className="text-blue-400">{t(isSignIn ? 'sign_up' : 'sign_in')}</a>
            </Link>
          </p>
        </div>
        <div className="mt-12">
          {children}
          <div className="my-6">
            <button
              type="submit"
              // eslint-disable-next-line max-len
              className="px-12 py-4 bg-gradient-to-r from-blue-400 to-blue-800 hover:from-blue-800 tracking-wide text-white font-medium rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
            >
              {t(isSignIn ? 'sign_in' : 'sign_up')}
            </button>
          </div>
          {isSignIn && (
            <div className="text-right">
              <Link href="/reset-password">
                <a className="text-blue-400">{t('forgot')}</a>
              </Link>
            </div>
          )}
          <div className="mt-4">
            <p className="text-left text-gray-800">{t(isSignIn ? 'or_login' : 'or_sign_up')}</p>
            <div className="mt-2 grid grid-cols-2 gap-6 text-black text-1xl">
              <a
                href="#"
                // eslint-disable-next-line max-len
                className="block border border-gray-600 rounded-sm flex items-center justify-center py-3 hover:border-blue-400 hover:text-blue-400"
              >
                Facebook
              </a>
              <a
                href="#"
                // eslint-disable-next-line max-len
                className="block border border-gray-600 rounded-sm flex items-center justify-center py-3 hover:border-blue-400 hover:text-blue-400"
              >
                Google
              </a>
            </div>
          </div>
          <div className="mt-6 border-t border-b border-gray-300">
            <div className="my-6">
              <div className="w-full flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  defaultChecked
                  // eslint-disable-next-line max-len
                  className="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400"
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="ml-2 text-sm" htmlFor="rememberMe">
                  {t('remember')}
                </label>
              </div>
            </div>
          </div>
          <p className="text-sm mt-6 text-left">
            {t(isSignIn ? 'accept' : 'accept_create')}{' '}
            <Link href="/term-of-use">
              <a className="text-blue-400">{t('common:term_of_use')}</a>
            </Link>{' '}
            {t('and')}{' '}
            <Link href="/privacy">
              <a className="text-blue-400">{t('common:privacy')}</a>
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
