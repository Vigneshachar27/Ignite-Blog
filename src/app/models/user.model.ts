export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  status: 'ENABLED' | 'DISABLED';
  createdAt: string; // ISO date string
}
