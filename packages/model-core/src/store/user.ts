import { Role, User } from '../types';
import { defineStore } from 'pinia';
import DefaultAvatar from '../assets/default/user_avatar_default.png';
import DefaultWallpaper from '../assets/default/wallpaper_default.jpg';
import { handleBackendPath } from 'utils';

const TOKEN_KEY = 'token';

export const useUserStore = defineStore('user', () => {
  const username = ref<string>('user');
  const password = ref<string>('123456789');
  const user = ref<User | null>(null);
  const token = ref<string>('');

  const setUser = (_user?: User) => {
    if (_user) {
      user.value = {
        ..._user,
        avatar: handleBackendPath(_user.avatar),
        wallpaper: handleBackendPath(_user.wallpaper),
      };
    } else {
      user.value = defaultUser;
    }
  };

  const setToken = (_token: string) => {
    token.value = _token;
    localStorage.setItem(TOKEN_KEY, _token);
  };

  const getToken = () => {
    return token.value || localStorage.getItem(TOKEN_KEY);
  };

  return { username, password, user, token, setToken, getToken, setUser };
});

export const defaultUser: User = {
  _id: String(Math.random()),
  username: 'user',
  avatar: DefaultAvatar,
  email: 'user@qq.com',
  role: Role.User,
  wallpaper: DefaultWallpaper,
};
