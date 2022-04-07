import { makeAutoObservable, flow } from 'mobx';
import { i18n } from 'next-i18next';

import apiFetch from 'libs/apiFetch';

import { IFormData } from './constants';
import UserStore from '../user/userStore';

export const AUTH_STORE_NAME = 'authStore';

class AuthStore {
  userStore: UserStore;
  isPending = true;
  isAuthenticated = false;

  constructor(userStore: UserStore) {
    makeAutoObservable(this, { userStore: false });
    this.userStore = userStore;
  }

  register = flow(function* (body: IFormData) {
    const { isOk } = yield apiFetch(
      { url: 'auth/register', locale: i18n?.language || 'en' },
      {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      }
    );
    if (isOk) {
      window.location.href = `${window.location.origin}/`;
    }
  });

  login = flow(function* (body: Pick<IFormData, 'name'>) {
    const { isOk } = yield apiFetch(
      { url: 'auth/login', locale: i18n?.language || 'en' },
      {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      }
    );
    if (isOk) {
      window.location.href = `${window.location.origin}/`;
    }
  });

  logout = flow(function* () {
    const { isOk } = yield apiFetch({ url: 'auth/logout', locale: 'en' }, { credentials: 'include', method: 'POST' });
    if (isOk) {
      window.location.href = `${window.location.origin}/`;
    }
  });

  fetchCurrentUser = flow(function* (this: AuthStore) {
    const { isOk, data } = yield apiFetch(
      { url: 'auth/current_user', locale: i18n?.language || 'en' },
      { credentials: 'include' }
    );
    if (isOk) {
      this.userStore.setUser(data);
    }
    this.isPending = false;
    this.isAuthenticated = isOk;
  });
}

export default AuthStore;
