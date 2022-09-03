import { IUser } from './user.interface';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUser,
  }),
  getters: {},
  actions: {
    setUser(data: IUser): void {
      this.user = data;
    },
  },
});
