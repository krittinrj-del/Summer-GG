export const roles = ['admin', 'staff', 'viewer'] as const;
export type Role = (typeof roles)[number];
export type Permission = 'read' | 'editContent' | 'manageSettings' | 'manageRoles';
export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && roles.some((role) => role === value);
}
export function can(role: unknown, permission: Permission): boolean {
  if (!isRole(role)) return false;
  if (permission === 'read') return true;
  if (permission === 'editContent') return role === 'admin' || role === 'staff';
  return role === 'admin';
}
