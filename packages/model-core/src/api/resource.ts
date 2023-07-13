import { ResponseWithToken, request, Response } from '../service';

export const R_getAllWallpapers = () => {
  return request.get<Response<{ result: number; wallpapers: string[] }>>('/resources/wallpapers');
};
