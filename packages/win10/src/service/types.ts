export interface Response<T = any> {
  status: 'failed' | 'success';
  message?: any;
  data?: T;
}

export interface ResponseError {
  status: 'failed';
  message?: any;
}

export type ResponseWithToken<T> = Response<T> & { token?: string };
