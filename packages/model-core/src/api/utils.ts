export const createFormData = (params: Record<string, any>) => {
  const form = new FormData();

  for (const key in params) {
    form.append(key, params[key]);
  }

  return form;
};
