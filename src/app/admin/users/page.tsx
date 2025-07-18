
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth, User } from '@/contexts/auth-context';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function AdminUsersPage() {
    const { users, user: currentUser, deleteUsers } = useAuth();
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const { toast } = useToast();

    const handleSelectAll = (checked: boolean | 'indeterminate') => {
        if (checked === true) {
            setSelectedUsers(users.map(u => u.email));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (email: string, checked: boolean) => {
        if (checked) {
            setSelectedUsers(prev => [...prev, email]);
        } else {
            setSelectedUsers(prev => prev.filter(id => id !== email));
        }
    };

    const handleDelete = () => {
        const usersToDelete = selectedUsers.filter(email => email !== currentUser?.email);
        
        if (selectedUsers.includes(currentUser?.email || '')) {
             toast({
                variant: "destructive",
                title: 'Action Prevented',
                description: 'You cannot delete your own account.',
            });
        }

        if (usersToDelete.length > 0) {
            deleteUsers(usersToDelete);
            toast({
                title: 'Users Deleted',
                description: `${usersToDelete.length} user(s) have been successfully deleted.`,
            });
        }
        
        setSelectedUsers([]);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>View and manage all registered users.</CardDescription>
                    </div>
                    {selectedUsers.length > 0 && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="xs">
                              <FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" />
                              Delete Selected ({selectedUsers.length})
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete {selectedUsers.length} user(s). This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDelete}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                               <Checkbox
                                  checked={selectedUsers.length > 0 && selectedUsers.length === users.length ? true : (selectedUsers.length > 0 ? 'indeterminate' : false)}
                                  onCheckedChange={handleSelectAll}
                                  aria-label="Select all users"
                               />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.email} data-state={selectedUsers.includes(user.email) ? 'selected' : undefined}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedUsers.includes(user.email)}
                                        onCheckedChange={(checked) => handleSelectUser(user.email, !!checked)}
                                        aria-label={`Select user ${user.name}`}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="xs">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
