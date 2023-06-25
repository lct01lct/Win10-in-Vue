export const roles = ['user', 'admin'] as const;
export type Role = (typeof roles)[number];
