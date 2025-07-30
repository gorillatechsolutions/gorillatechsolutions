
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth, User, UserRole } from '@/contexts/auth-context';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faImage, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendMessageDialog } from '@/components/admin/send-message-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
                    Change Avatar Image
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

function UserCard({ user, isSelected, onSelect, onDelete }: { user: User, isSelected: boolean, onSelect: (email: string, checked: boolean) => void, onDelete: (email: string) => void }) {
    const { user: currentUser } = useAuth();
    return (
        <Card className={cn("flex flex-col overflow-hidden transition-all duration-300", isSelected ? "ring-2 ring-primary" : "border-border/80")}>
            <CardHeader className="flex flex-row items-start gap-4 p-4 bg-secondary/40">
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => onSelect(user.email, !!checked)}
                    aria-label={`Select user ${user.name}`}
                    className="mt-1"
                />
                <Avatar className="h-12 w-12 border-2 border-primary/50">
                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="google logo" />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h3 className="font-semibold">{user.name} {currentUser?.email === user.email && <span className="text-muted-foreground font-normal">(You)</span>}</h3>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <Badge 
                        variant={roleBadgeVariant[user.role]} 
                        className={cn("capitalize mt-2 text-xs", roleBadgeClass[user.role])}
                    >
                        {user.role}
                    </Badge>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FontAwesomeIcon icon={faEllipsisV} className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                         <DropdownMenuItem asChild>
                           <SendMessageDialog recipient={user} />
                         </DropdownMenuItem>
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                     <span className="text-destructive">Delete User</span>
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>This action will permanently delete the user {user.name}.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => onDelete(user.email)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 text-sm flex-1">
                <div className="space-y-2">
                    <div>
                        <p className="font-medium text-muted-foreground">Username</p>
                        <p className="font-mono text-xs bg-muted p-1 rounded-md">{user.username}</p>
                    </div>
                     <div>
                        <p className="font-medium text-muted-foreground">Password</p>
                        <p className="font-mono text-xs bg-muted p-1 rounded-md">{user.password}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function AdminUsersPage() {
    const { users, user: currentUser, deleteUsers } = useAuth();
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const { toast } = useToast();
    const router = useRouter();

    const nonAdminUsers = users.filter(user => user.role !== 'admin' || user.email === currentUser?.email);

    const handleSelectAll = (checked: boolean | 'indeterminate') => {
        if (checked === true) {
            setSelectedUsers(users.filter(u => u.email !== currentUser?.email).map(u => u.email));
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
            
            <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Checkbox
                        id="select-all"
                        checked={selectedUsers.length > 0 && selectedUsers.length === users.filter(u => u.role !== 'admin').length ? true : (selectedUsers.length > 0 ? 'indeterminate' : false)}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all non-admin users"
                    />
                    <label htmlFor="select-all" className="text-sm font-medium">Select All</label>
                </div>
                 {selectedUsers.length > 0 && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
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
                          <AlertDialogAction onClick={() => handleDelete(selectedUsers)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <UserCard 
                        key={user.email} 
                        user={user} 
                        isSelected={selectedUsers.includes(user.email)} 
                        onSelect={handleSelectUser}
                        onDelete={(email) => handleDelete([email])}
                    />
                ))}
            </div>
        </div>
    );
}
