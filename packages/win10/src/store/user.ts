import { User } from '@/types';
import { defineStore } from 'pinia';

const TOKEN_KEY = 'token';

export default defineStore('user', () => {
  const username = ref<string>('user');
  const password = ref<string>('123456789');
  const user = ref<User | null>(null);
  const token = ref<string>('');

  const setToken = (_token: string) => {
    token.value = _token;
    localStorage.setItem(TOKEN_KEY, _token);
  };

  const getToken = () => {
    return token.value || localStorage.getItem(TOKEN_KEY);
  };

  return { username, password, user, token, setToken, getToken };
});
