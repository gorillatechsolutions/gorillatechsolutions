
import type { User, UserRole, UserStatus } from '@/types/user';

export const demoUsers: User[] = [
    { 
        id: 'usr-admin-01',
        name: 'Admin User', 
        email: 'admin@example.com',
        username: 'admin_user',
        role: 'admin',
        password: 'password123',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'person glasses',
        status: 'active',
        joined: '2023-01-15T10:00:00Z',
        lastSeen: new Date().toISOString()
    },
    { 
        id: 'usr-user-01',
        name: 'Mary Jacob',
        email: 'user@example.com',
        username: 'maryj',
        phone: '123-456-7890',
        role: 'user',
        country: 'USA',
        password: 'password123',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'woman smiling',
        status: 'active',
        joined: '2023-03-22T14:30:00Z',
        lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
    },
    {
        id: 'usr-editor-01',
        name: 'John Smith',
        email: 'john.smith@example.com',
        username: 'johns',
        phone: '987-654-3210',
        role: 'editor',
        country: 'Canada',
        password: 'password123',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'man professional',
        status: 'active',
        joined: '2023-02-10T09:00:00Z',
        lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() // 3 days ago
    },
    {
        id: 'usr-invited-01',
        name: 'Alice Johnson',
        email: 'alice.j@example.com',
        username: 'alicej',
        role: 'user',
        password: 'password123',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'woman portrait',
        status: 'invited',
        joined: '2024-05-01T11:00:00Z',
        lastSeen: null
    },
    {
        id: 'usr-archived-01',
        name: 'Bob Brown',
        email: 'bob.brown@example.com',
        username: 'bobb',
        role: 'user',
        password: 'password123',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'man friendly',
        status: 'archived',
        joined: '2022-11-18T16:45:00Z',
        lastSeen: new Date('2023-12-01T10:00:00Z').toISOString()
    }
];
