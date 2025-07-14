
'use client';

import { useState, useEffect } from 'react';
import { UsersTable } from '@/components/users-table';
import type { User, UserRole } from '@/types/user';
import { useToast } from '@/hooks/use-toast';
import { demoUsers } from '@/lib/demo-data';

export default function UsersPage() {
    const [userList, setUserList] = useState<User[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        try {
            let storedUsers = localStorage.getItem('users');
            if (!storedUsers || JSON.parse(storedUsers).length === 0) {
                localStorage.setItem('users', JSON.stringify(demoUsers));
                storedUsers = JSON.stringify(demoUsers);
            }
            setUserList(JSON.parse(storedUsers));
        } catch (error) {
            console.error("Failed to parse users from localStorage", error);
            localStorage.setItem('users', JSON.stringify(demoUsers));
            setUserList(demoUsers);
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

    const handleDeleteMultipleUsers = (userIds: string[]) => {
        const updatedUsers = userList.filter(user => !userIds.includes(user.id));
        updateUserList(updatedUsers);
        toast({
            title: `${userIds.length} Users Deleted`,
            description: 'The selected users have been permanently deleted.',
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

    const handleUpdateUser = (userId: string, updates: Partial<User>) => {
        const updatedUsers = userList.map(user => 
            user.id === userId ? { ...user, ...updates } : user
        );
        updateUserList(updatedUsers);
        toast({
            title: 'User Updated',
            description: 'The user details have been successfully updated.',
        });
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
                onDeleteMultipleUsers={handleDeleteMultipleUsers}
                onAddUser={handleAddUser}
                onUpdateUser={handleUpdateUser}
            />
        </div>
    )
}
