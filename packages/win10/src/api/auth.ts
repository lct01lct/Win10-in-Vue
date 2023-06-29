import { ResponseWithToken, request, Response } from '@/service';
import { User } from '@/types';

interface LoginDto {
  username: string;
  password: string;
}

export const R_login = async (data: LoginDto) => {
  return await request.post<ResponseWithToken<{ user: User }>>('/auth/login', data);
};

export const R_getMe = async () => {
  return await request.get<Response<{ user: User }>>('/users/me');
};
