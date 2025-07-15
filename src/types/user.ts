
export type UserRole = 'admin' | 'user' | 'editor';
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
  username?: string;
  password?: string;
  country?: string;
  address?: string;
  state?: string;
  zipcode?: string;
  whatsapp?: string;
}
