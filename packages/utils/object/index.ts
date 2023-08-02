export const filterObject = <T extends object>(obj: T, ...fields: (keyof T)[]) => {
  fields.forEach((field) => {
    delete obj[field];
  });

  return obj;
};
