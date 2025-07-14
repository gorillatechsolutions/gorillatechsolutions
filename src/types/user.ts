
export type UserRole = 'admin' | 'user';
export type UserStatus = 'active' | 'invited' | 'archived';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dataAiHint: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  lastSeen: string | null;
  phone?: string;
}
