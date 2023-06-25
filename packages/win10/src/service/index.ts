import axios from 'axios';
import { AxiosRequestConfig, Axios } from 'axios';

const http = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/v1',
  timeout: 2000,
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    return Promise.reject(err);
  }
);

const requestMethods = ['get', 'post', 'delete', 'patch', 'put'] as const;

type BaseMethodRequestFnType = <Data>(
  url: string,
  data?: any,
  anyConfig?: AxiosRequestConfig
) => Promise<Data>;

export interface RequestFn {
  <Data = any, Config = any>(params: AxiosRequestConfig<Config>): Promise<Data>;
  get: BaseMethodRequestFnType;
  post: BaseMethodRequestFnType;
  delete: BaseMethodRequestFnType;
  patch: BaseMethodRequestFnType;
  put: BaseMethodRequestFnType;
}

// @ts-ignore
export const request: RequestFn = <Data = any, Config = any>(
  params: AxiosRequestConfig<Config>
) => {
  if (import.meta.env.MODE === 'development') {
    return new Promise<Data>((resolve, reject) => {
      http(params)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
};

requestMethods.forEach((method) => {
  request[method] = ((url, data, config) =>
    request({ method, url, data, ...config })) as BaseMethodRequestFnType;
});
