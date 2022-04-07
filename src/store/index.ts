import { enableStaticRendering } from 'mobx-react';
import { useMemo } from 'react';

import { isServer } from 'utils/isServer';
import AuthStore, { AUTH_STORE_NAME } from 'logic/auth/authStore';
import UserStore, { USER_STORE_NAME } from 'logic/user/userStore';

enableStaticRendering(isServer);

let store: any;

class RootStore {
  [USER_STORE_NAME]: UserStore;
  [AUTH_STORE_NAME]: AuthStore;

  constructor() {
    this[USER_STORE_NAME] = new UserStore();
    this[AUTH_STORE_NAME] = new AuthStore(this[USER_STORE_NAME]);
  }
}

function initializeStore(initialData = null) {
  const _store = store ?? new RootStore();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState: any) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}
