export const handleBackendPath = (path: string) => {
  // @ts-ignore
  return import.meta.env.VITE_BACKEND_ROOT + path;
};
