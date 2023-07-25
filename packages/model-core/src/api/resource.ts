import { request, Response } from '../service';

export const R_getAllWallpapers = async () => {
  return await request.get<Response<{ result: number; wallpapers: string[] }>>(
    '/resources/wallpapers'
  );
};

export interface ApplicationDesc {
  _id: string;
  name: string;
  icon: string;
  desc: '';
  downloadlink: string;
}

export const R_getAllApplications = async () => {
  return await request.get<Response<{ apps: ApplicationDesc[]; result: number }>>(
    '/resources/applications'
  );
};
