
'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth, User, UserRole } from '@/contexts/auth-context';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faImage, faPaperPlane, faEdit } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendMessageDialog } from '@/components/admin/send-message-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Providers } from '@/components/providers';

const roleBadgeVariant: Record<UserRole, 'default' | 'secondary' | 'destructive'> = {
    admin: 'destructive',
    user: 'secondary',
    premium: 'default',
    gold: 'default',
    platinum: 'default'
}

const roleBadgeClass: Record<UserRole, string> = {
    admin: '',
    user: '',
    premium: 'bg-amber-600 hover:bg-amber-600/80',
    gold: 'bg-yellow-400 text-black hover:bg-yellow-400/80',
    platinum: 'bg-slate-400 hover:bg-slate-400/80',
}

function ChangeAvatarDialog() {
    const { updateAllUserAvatars } = useAuth();
    const { toast } = useToast();
    const [avatarUrl, setAvatarUrl] = useState('');
    const [open, setOpen] = useState(false);

    const handleSave = () => {
        if (!avatarUrl) {
            toast({
                variant: 'destructive',
                title: 'URL is required',
                description: 'Please enter a valid image URL.',
            });
            return;
        }
        updateAllUserAvatars(avatarUrl);
        toast({
            title: 'Avatars Updated',
            description: 'All non-admin user avatars have been updated.',
        });
        setOpen(false);
        setAvatarUrl('');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <FontAwesomeIcon icon={faImage} className="mr-2 h-4 w-4" />
                    Change User Avatars
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change User Avatars</DialogTitle>
                    <DialogDescription>
                        Enter a new image URL to update the avatar for all non-admin users. The admin's avatar will not be changed.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Label htmlFor="avatar-url">Avatar Image URL</Label>
                    <Input
                        id="avatar-url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://example.com/image.png"
                    />
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function AdminUsersPageContent() {
    const { users, user: currentUser, deleteUsers } = useAuth();
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
    const { toast } = useToast();
    const router = useRouter();

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const searchMatch = searchTerm.toLowerCase() === '' ||
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase());
            
            const roleMatch = roleFilter === 'all' || user.role === roleFilter;

            return searchMatch && roleMatch;
        });
    }, [users, searchTerm, roleFilter]);

    const handleSelectAll = (checked: boolean | 'indeterminate') => {
        if (checked === true) {
            setSelectedUsers(filteredUsers.filter(u => u.email !== currentUser?.email).map(u => u.email));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (email: string, checked: boolean) => {
        if (email === currentUser?.email) return;
        if (checked) {
            setSelectedUsers(prev => [...prev, email]);
        } else {
            setSelectedUsers(prev => prev.filter(id => id !== email));
        }
    };

    const handleDelete = (emails: string[]) => {
        const usersToDelete = emails.filter(email => email !== currentUser?.email);
        
        if (emails.includes(currentUser?.email || '')) {
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
        
        setSelectedUsers(prev => prev.filter(email => !usersToDelete.includes(email)));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">View, create, and manage your application's users.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => router.push('/admin/users/new')} size="sm">
                        <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
                        Create User
                    </Button>
                    <ChangeAvatarDialog />
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle>All Users</CardTitle>
                            <CardDescription>A list of all users in your system.</CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <Input 
                                placeholder="Search by name, email, username..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:w-64"
                            />
                            <Select value={roleFilter} onValueChange={(value: UserRole | 'all') => setRoleFilter(value)}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="premium">Premium</SelectItem>
                                    <SelectItem value="gold">Gold</SelectItem>
                                    <SelectItem value="platinum">Platinum</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                 <CardContent>
                    <div className="flex items-center justify-end mb-4">
                        {selectedUsers.length > 0 && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" />
                                  Delete Selected ({selectedUsers.length})
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <DialogHeader>
                                  <DialogTitle>Are you sure?</DialogTitle>
                                  <DialogDescription>
                                    This will permanently delete {selectedUsers.length} user(s). This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(selectedUsers)}>
                                    Continue
                                  </AlertDialogAction>
                                </DialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">
                                    <Checkbox
                                        checked={selectedUsers.length > 0 && selectedUsers.length === filteredUsers.filter(u => u.role !== 'admin').length ? true : (selectedUsers.length > 0 ? 'indeterminate' : false)}
                                        onCheckedChange={handleSelectAll}
                                        aria-label="Select all non-admin users"
                                    />
                                </TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Password</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.email} data-state={selectedUsers.includes(user.email) ? 'selected' : undefined}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedUsers.includes(user.email)}
                                            onCheckedChange={(checked) => handleSelectUser(user.email, !!checked)}
                                            aria-label={`Select user ${user.name}`}
                                            disabled={user.email === currentUser?.email}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="google logo" />
                                                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{user.name} {user.email === currentUser?.email && '(You)'}</div>
                                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={roleBadgeVariant[user.role]} 
                                            className={cn("capitalize", roleBadgeClass[user.role])}
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-mono text-xs bg-muted p-1 rounded-md">{user.username}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-mono text-xs bg-muted p-1 rounded-md">{user.password}</span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="xs" onClick={() => router.push(`/admin/users/edit/${user.email}`)} disabled={user.email === currentUser?.email}>
                                            <FontAwesomeIcon icon={faEdit} className="mr-1 h-3 w-3" />
                                            Edit
                                        </Button>
                                        <SendMessageDialog recipient={user} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No users found matching your criteria.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}


export default function AdminUsersPage() {
    return (
        <Providers>
            <AdminUsersPageContent />
        </Providers>
    )
}
