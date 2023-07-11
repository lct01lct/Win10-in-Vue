import { ResponseWithToken, request, Response } from '../service';
import { User } from '../types';
import { createFormData } from './utils';

interface LoginDto {
  username: string;
  password: string;
}

export const R_login = async (data: LoginDto) => {
  return await request.post<ResponseWithToken<{ user: User }>>('/auth/login', data);
};

export const R_logout = async () => {
  return await request.get<Response>('/auth/logout');
};

export const R_getMe = async () => {
  return await request.get<Response<{ user: User }>>('/users/me');
};

export type UpdateMeDto = Partial<Omit<User, 'avatar' | 'wallpaper'>> & {
  avatar?: File;
  wallpaper?: File;
};

export const R_updateMe = async (updateMeDto: UpdateMeDto) => {
  const form = createFormData(updateMeDto);
  return await request.patch<Response<{ user: User }>>('/users/me', form, 'form');
};
