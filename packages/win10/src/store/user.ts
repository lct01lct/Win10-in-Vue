import { defineStore } from 'pinia';

export default defineStore('user', () => {
  const username = ref<string>('user');
  const password = ref<string>('123456');

  return { username, password };
});
