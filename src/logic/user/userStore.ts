import { makeAutoObservable } from 'mobx';

import { IUser } from './interfaces';

export const USER_STORE_NAME = 'userStore';

class UserStore {
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: IUser) {
    this.user = user;
  }
}

export default UserStore;
