import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const count = ref<number>(0);

  return {
    count,
  };
});
