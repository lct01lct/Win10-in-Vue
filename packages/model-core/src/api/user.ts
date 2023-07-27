import { Response, request } from '../service';

export const R_AddDownloadedApp = async (id: string) => {
  return await request.put<Response<{ downloadedApp: string[] }>>(`/users/downloadedApps/${id}`);
};

export const R_RemoveDownloadedApp = async (id: string) => {
  return await request.delete<Response<{ downloadedApp: string[] }>>(`/users/downloadedApps/${id}`);
};
