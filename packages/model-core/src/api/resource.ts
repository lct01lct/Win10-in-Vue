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
  downloadLink: string;
  rating: number;
}

export const R_getAllApplications = async () => {
  return await request.get<Response<{ apps: ApplicationDesc[]; result: number }>>(
    '/resources/applications'
  );
};

export const R_getApplicationById = async (id: string) => {
  return await request.get<Response<{ app: ApplicationDesc }>>(`/resources/applications/${id}`);
};
