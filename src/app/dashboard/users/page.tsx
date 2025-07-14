
import { UsersTable } from '@/components/users-table';
import type { User } from '@/types/user';
import { addDays, subDays } from 'date-fns';

const now = new Date();

const demoUsers: User[] = [
  {
    id: 'usr-001',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    role: 'admin',
    status: 'active',
    joined: subDays(now, 5).toISOString(),
    lastSeen: subDays(now, 1).toISOString(),
  },
  {
    id: 'usr-002',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man professional',
    role: 'user',
    status: 'active',
    joined: subDays(now, 10).toISOString(),
    lastSeen: subDays(now, 2).toISOString(),
  },
  {
    id: 'usr-003',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man smiling',
    role: 'user',
    status: 'invited',
    joined: subDays(now, 2).toISOString(),
    lastSeen: null,
  },
  {
    id: 'usr-004',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman professional',
    role: 'user',
    status: 'active',
    joined: subDays(now, 30).toISOString(),
    lastSeen: subDays(now, 5).toISOString(),
  },
  {
    id: 'usr-005',
    name: 'Ethan Hunt',
    email: 'ethan.h@example.com',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man action',
    role: 'user',
    status: 'archived',
    joined: subDays(now, 90).toISOString(),
    lastSeen: subDays(now, 60).toISOString(),
  },
  {
    id: 'usr-006',
    name: 'Fiona Glenanne',
    email: 'fiona.g@example.com',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman action',
    role: 'admin',
    status: 'active',
    joined: subDays(now, 15).toISOString(),
    lastSeen: subDays(now, 1).toISOString(),
  },
  {
    id: 'usr-007',
    name: 'George Costanza',
    email: 'george.c@example.com',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man funny',
    role: 'user',
    status: 'active',
    joined: subDays(now, 45).toISOString(),
    lastSeen: subDays(now, 10).toISOString(),
  },
  {
    id: 'usr-008',
    name: 'Hannah Abbott',
    email: 'hannah.a@example.com',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman student',
    role: 'user',
    status: 'invited',
    joined: subDays(now, 1).toISOString(),
    lastSeen: null,
  },
  {
    id: 'usr-009',
    name: 'Ian Malcolm',
    email: 'ian.m@example.com',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man scientist',
    role: 'user',
    status: 'active',
    joined: subDays(now, 200).toISOString(),
    lastSeen: subDays(now, 25).toISOString(),
  },
  {
    id: 'usr-010',
    name: 'Jane Smith',
    email: 'jane.s@example.com',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman smiling',
    role: 'user',
    status: 'active',
    joined: subDays(now, 120).toISOString(),
    lastSeen: subDays(now, 8).toISOString(),
  },
];


export default function UsersPage() {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold font-headline">User Management</h1>
                <p className="text-muted-foreground">View, search, and manage all users on the platform.</p>
            </header>
            <UsersTable users={demoUsers} />
        </div>
    )
}
