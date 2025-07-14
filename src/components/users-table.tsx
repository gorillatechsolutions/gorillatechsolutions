
'use client';

import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Search, MoreHorizontal, UserPlus, Calendar, CheckCircle, Trash2, KeyRound, Eye, EyeOff, User as UserIcon, Phone, Edit, ShieldCheck } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import type { User, UserRole, UserStatus } from '@/types/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { AddUserForm } from './add-user-form';
import { Separator } from './ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';


const statusStyles: { [key in UserStatus]: string } = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400',
  invited: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400',
  archived: 'bg-gray-100 text-gray-800 dark:bg-gray-800/40 dark:text-gray-400',
};

const roleStyles: { [key in UserRole]: string } = {
  admin: 'bg-primary/10 text-primary',
  editor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400',
  user: 'bg-secondary text-secondary-foreground',
};

const ITEMS_PER_PAGE = 8;

type UsersTableProps = {
    users: User[];
    onDeleteUser: (userId: string) => void;
    onDeleteMultipleUsers: (userIds: string[]) => void;
    onAddUser: (user: Omit<User, 'id' | 'avatar' | 'dataAiHint' | 'status' | 'lastSeen' | 'joined'> & {password: string}) => void;
    onUpdateUser: (userId: string, updates: Partial<User>) => void;
}

export function UsersTable({ users, onDeleteUser, onDeleteMultipleUsers, onAddUser, onUpdateUser }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isAddUserOpen, setAddUserOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(lowercasedTerm) ||
        user.email.toLowerCase().includes(lowercasedTerm)
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    return filtered;
  }, [users, searchTerm, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setSelectedUserIds([]);
  }, [searchTerm, roleFilter, statusFilter, currentPage]);

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedUserIds(paginatedUsers.map(user => user.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUserIds(prev => [...prev, userId]);
    } else {
      setSelectedUserIds(prev => prev.filter(id => id !== userId));
    }
  };

  const numSelected = selectedUserIds.length;
  const numOnPage = paginatedUsers.length;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  const handleChangePassword = (userId: string) => {
    console.log(`Changing password for user ${userId}`);
    toast({
      title: 'Password Changed',
      description: 'The user\'s password has been successfully updated.',
    });
    setChangePasswordOpen(false);
    setUserToEdit(null);
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    onUpdateUser(userId, { role: newRole });
    toast({
      title: "Role Updated",
      description: `User role has been changed to ${newRole}.`
    });
  };

  const handleAddUserSuccess = () => {
    setAddUserOpen(false);
  }

  const DetailItem = ({ icon, label, value, children }: { icon: React.ReactNode, label: string, value?: string | null, children?: React.ReactNode }) => (
    <div>
        <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            {icon} {label}
        </dt>
        <dd className="mt-1 text-sm text-foreground">{value || children || 'N/A'}</dd>
    </div>
  );

  const ChangePasswordDialog = ({ user }: { user: User | null }) => {
    return (
     <Dialog open={isChangePasswordOpen && userToEdit === user} onOpenChange={(isOpen) => { if (!isOpen) setUserToEdit(null); setChangePasswordOpen(isOpen);}}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Change Password for {user?.name}</DialogTitle>
                <DialogDescription>
                    Enter a new password for the user. They will be notified of this change.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="new-password" className="text-right">New Password</Label>
                    <div className="col-span-3 relative">
                        <Input id="new-password" type={showPassword ? "text" : "password"} className="pr-10" placeholder="••••••••" />
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => {setChangePasswordOpen(false); setUserToEdit(null)}}>Cancel</Button>
                <Button onClick={() => user && handleChangePassword(user.id)}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
  };

  const DeleteUserDialog = ({ user, children }: { user: User, children: React.ReactNode }) => (
    <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the user account for <span className="font-semibold">{user.name}</span> and remove their data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDeleteUser(user.id)} className={cn(buttonVariants({ variant: 'destructive' }))}>
                    Yes, delete user
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );

  const BulkDeleteDialog = ({ onConfirm }: { onConfirm: () => void }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={numSelected === 0}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete ({numSelected})
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {numSelected} user account(s).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className={cn(buttonVariants({ variant: 'destructive' }))}>
            Yes, delete users
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <>
      <Dialog open={isAddUserOpen} onOpenChange={setAddUserOpen}>
          <div className="space-y-4">
          <Card>
            <CardContent className="p-4 flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                    type="text"
                    placeholder="Search by name or email..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-4">
                    <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as UserRole | 'all')}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as UserStatus | 'all')}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="invited">Invited</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                    </Select>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </DialogTrigger>
                </div>
            </CardContent>
          </Card>

          <Card>
              <CardContent className="p-0">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[60px] p-4">
                            <Checkbox
                                checked={numSelected === numOnPage && numOnPage > 0 ? true : (numSelected > 0 ? 'indeterminate' : false)}
                                onCheckedChange={handleSelectAll}
                                aria-label="Select all users on this page"
                            />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden lg:table-cell">Joined</TableHead>
                        <TableHead className="hidden md:table-cell text-right">Last Seen</TableHead>
                        <TableHead className="w-[80px]"><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedUsers.length > 0 ? (
                        paginatedUsers.map((user) => (
                            <TableRow key={user.id} data-state={selectedUserIds.includes(user.id) ? 'selected' : undefined}>
                                <TableCell className="p-4">
                                    <Checkbox
                                        checked={selectedUserIds.includes(user.id)}
                                        onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                                        aria-label={`Select user ${user.name}`}
                                    />
                                </TableCell>
                                <TableCell>
                                <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.dataAiHint} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                </div>
                                </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className={cn("capitalize", roleStyles[user.role])}>{user.role}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className={cn("capitalize", statusStyles[user.status])}>{user.status}</Badge>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">{format(new Date(user.joined), 'PP')}</TableCell>
                                <TableCell className="hidden md:table-cell text-right text-muted-foreground">
                                    {user.lastSeen ? `${formatDistanceToNow(new Date(user.lastSeen))} ago` : 'Never'}
                                </TableCell>
                                <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onSelect={() => setViewingUser(user)}>
                                            <UserIcon className="mr-2 h-4 w-4" />
                                            View Details
                                        </DropdownMenuItem>

                                        <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <ShieldCheck className="mr-2 h-4 w-4" />
                                            <span>Change Role</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                            <DropdownMenuRadioGroup
                                                value={user.role}
                                                onValueChange={(newRole) => handleRoleChange(user.id, newRole as UserRole)}
                                            >
                                                <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="editor">Editor</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="user">User</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                        </DropdownMenuSub>

                                        <DropdownMenuItem onSelect={() => { setUserToEdit(user); setChangePasswordOpen(true);}}>
                                            <KeyRound className="mr-2 h-4 w-4" />
                                            Change Password
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DeleteUserDialog user={user}>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete User
                                            </DropdownMenuItem>
                                        </DeleteUserDialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <ChangePasswordDialog user={user} />
                                </TableCell>
                            </TableRow>
                    ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
              </CardContent>
               <CardFooter className="flex justify-between items-center p-4">
                  <div className="text-sm text-muted-foreground">
                    {numSelected > 0 ? (
                        <span>{numSelected} user(s) selected</span>
                    ) : (
                        <span>
                            {filteredUsers.length} user(s) total
                        </span>
                    )}
                  </div>
                  {totalPages > 1 && (
                      <div className="flex items-center gap-2">
                          <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                          >
                              <ChevronLeft className="h-4 w-4 mr-1" />
                              Previous
                          </Button>
                          <span>Page {currentPage} of {totalPages}</span>
                          <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                          >
                              Next
                              <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                      </div>
                  )}
              </CardFooter>
          </Card>
          </div>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                      Fill in the details below to add a new user and send them an invitation.
                  </DialogDescription>
              </DialogHeader>
              <AddUserForm onAddUser={onAddUser} onSuccess={handleAddUserSuccess} />
          </DialogContent>
      </Dialog>
      
      <Dialog open={!!viewingUser} onOpenChange={(isOpen) => !isOpen && setViewingUser(null)}>
        <DialogContent className="max-w-md">
            {viewingUser && (
                <>
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={viewingUser.avatar} alt={viewingUser.name} data-ai-hint={viewingUser.dataAiHint} />
                            <AvatarFallback>{viewingUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <DialogTitle className="text-2xl font-bold font-headline">{viewingUser.name}</DialogTitle>
                            <DialogDescription>{viewingUser.email}</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <Separator />
                <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                    <DetailItem icon={<ShieldCheck className="h-4 w-4" />} label="Role">
                       <div className="flex items-center gap-2">
                         <Badge variant="secondary" className={cn("capitalize", roleStyles[viewingUser.role])}>{viewingUser.role}</Badge>
                         <Select 
                            defaultValue={viewingUser.role} 
                            onValueChange={(newRole: UserRole) => {
                                onUpdateUser(viewingUser.id, { role: newRole });
                                setViewingUser(prev => prev ? { ...prev, role: newRole } : null);
                            }}
                         >
                            <SelectTrigger className="h-7 w-28 text-xs">
                                <SelectValue placeholder="Change role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                         </Select>
                       </div>
                    </DetailItem>
                    <DetailItem icon={<CheckCircle className="h-4 w-4" />} label="Status">
                        <Badge variant="secondary" className={cn("capitalize", statusStyles[viewingUser.status])}>{viewingUser.status}</Badge>
                    </DetailItem>
                    <DetailItem icon={<Phone className="h-4 w-4" />} label="Phone Number" value={viewingUser.phone} />
                    <DetailItem icon={<Calendar className="h-4 w-4" />} label="Date Joined" value={format(new Date(viewingUser.joined), 'PPP')} />
                    <DetailItem icon={<Calendar className="h-4 w-4" />} label="Last Seen" value={viewingUser.lastSeen ? formatDistanceToNow(new Date(viewingUser.lastSeen), { addSuffix: true }) : 'Never'} />
                </dl>
                <Separator />
                 <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                    <Button onClick={() => { setUserToEdit(viewingUser); setChangePasswordOpen(true); setViewingUser(null); }}>Change Password</Button>
                    <DeleteUserDialog user={viewingUser}>
                        <Button variant="destructive">Delete User</Button>
                    </DeleteUserDialog>
                </div>
                </>
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}
