
'use client';

import { useState, useEffect } from 'react';
import { UsersTable } from '@/components/users-table';
import type { User } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

export default function UsersPage() {
    const [userList, setUserList] = useState<User[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedUsers = localStorage.getItem('users');
            if (storedUsers) {
                setUserList(JSON.parse(storedUsers));
            }
        } catch (error) {
            console.error("Failed to parse users from localStorage", error);
            localStorage.removeItem('users');
        }
    }, []);

    const updateUserList = (newList: User[]) => {
        setUserList(newList);
        localStorage.setItem('users', JSON.stringify(newList));
    };

    const handleDeleteUser = (userId: string) => {
        const updatedUsers = userList.filter(user => user.id !== userId);
        updateUserList(updatedUsers);
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
        const updatedUsers = [userToAdd, ...userList];
        updateUserList(updatedUsers);
    };

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
