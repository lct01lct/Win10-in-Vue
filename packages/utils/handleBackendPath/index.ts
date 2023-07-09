export const handleBackendPath = (path: string) => {
  const env = import.meta.env;
  return env.MODE === 'development' ? env.VITE_BACKEND_ROOT + path : path;
};
