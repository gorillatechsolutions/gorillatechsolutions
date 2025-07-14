
'use client';

import { useState } from 'react';
import { UsersTable } from '@/components/users-table';
import type { User } from '@/types/user';
import { addDays, subDays } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const now = new Date();

const initialUsers: User[] = [
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
    phone: '111-222-3333',
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
    phone: '222-333-4444',
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
    phone: '444-555-6666',
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
    phone: '666-777-8888',
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
    phone: '888-999-0000',
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
    phone: '000-111-2222',
  },
];


export default function UsersPage() {
    const [userList, setUserList] = useState<User[]>(initialUsers);
    const { toast } = useToast();

    const handleDeleteUser = (userId: string) => {
        // In a real app, this would be an API call.
        setUserList(prevUsers => prevUsers.filter(user => user.id !== userId));
        toast({
            title: 'User Deleted',
            description: 'The user has been permanently deleted.',
        });
    };
  
    const handleAddUser = (newUser: Omit<User, 'id' | 'avatar' | 'dataAiHint' | 'status' | 'lastSeen' | 'joined'> & {password: string}) => {
        const userToAdd: User = {
            id: `usr-${Math.random().toString(36).substr(2, 9)}`,
            ...newUser,
            avatar: 'https://placehold.co/100x100.png',
            dataAiHint: 'person',
            status: 'invited',
            joined: new Date().toISOString(),
            lastSeen: null,
        };
        setUserList(prev => [userToAdd, ...prev]);
    }

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold font-headline">User Management</h1>
                <p className="text-muted-foreground">View, search, and manage all users on the platform.</p>
            </header>
            <UsersTable 
                users={userList} 
                onDeleteUser={handleDeleteUser}
                onAddUser={handleAddUser}
            />
        </div>
    )
}
