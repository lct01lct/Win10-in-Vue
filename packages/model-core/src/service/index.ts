export * from './types';
import { router } from '../router';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { useUserStore } from '../store/user';

const http = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/v1',
  timeout: 2000,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    const statusCode = err.response.status;
    const userStore = useUserStore();

    switch (statusCode) {
      case 401:
      case 403:
        router.push('/');
        userStore.user = null;
        userStore.setToken('Invalid token');

        break;
    }
    return Promise.reject(err);
  }
);

const requestMethods = ['get', 'post', 'delete', 'patch', 'put'] as const;

type BaseMethodRequestFnType = <Data>(
  url: string,
  data?: any,
  anyConfig?: AxiosRequestConfig
) => Promise<Data | null>;

type FormatRequestFnType = <Data>(
  url: string,
  data?: any,
  type?: 'json' | 'form',
  anyConfig?: AxiosRequestConfig
) => Promise<Data | null>;

export interface RequestFn {
  <Data = any, Config = any>(params: AxiosRequestConfig<Config>): Promise<Data | null>;
  get: FormatRequestFnType;
  post: FormatRequestFnType;
  delete: FormatRequestFnType;
  patch: FormatRequestFnType;
  put: FormatRequestFnType;
}

// @ts-ignore
export const request: RequestFn = <Data = any, Config = any>(
  params: AxiosRequestConfig<Config>
) => {
  if (import.meta.env.MODE === 'development') {
    return new Promise<Data>((resolve) => {
      http(params)
        .then((res) => resolve(res.data))
        .catch((err) => {
          return resolve(err.response?.data);
        });
    });
  }

  return Promise.resolve(null);
};

requestMethods.forEach((method) => {
  request[method] = (url, data, type, config) => {
    const headers = config?.headers || {};
    if (type === 'form') headers['Content-Type'] = 'multipart/form-data';
    return request({ method, url, data, ...{ ...config, headers } });
  };
});
