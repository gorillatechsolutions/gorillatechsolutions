
'use client';

import { useState } from 'react';
import { UsersTable } from '@/components/users-table';
import type { User } from '@/types/user';
import { addDays, subDays } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const now = new Date();

const initialUsers: User[] = [];


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
