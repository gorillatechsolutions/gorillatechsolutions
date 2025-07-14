
'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Search, MoreHorizontal, UserPlus, Calendar, CheckCircle, Mail, User as UserIcon } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { type User, UserRole, UserStatus } from '@/types/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { AddUserForm } from './add-user-form';
import { Separator } from './ui/separator';


const statusStyles: { [key in UserStatus]: string } = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400',
  invited: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400',
  archived: 'bg-gray-100 text-gray-800 dark:bg-gray-800/40 dark:text-gray-400',
};

const roleStyles: { [key in UserRole]: string } = {
  admin: 'bg-primary/10 text-primary',
  user: 'bg-secondary text-secondary-foreground',
};

const ITEMS_PER_PAGE = 8;

export function UsersTable({ users }: { users: User[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddUserOpen, setAddUserOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const DetailItem = ({ icon, label, value, children }: { icon: React.ReactNode, label: string, value?: string | null, children?: React.ReactNode }) => (
    <div>
        <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            {icon} {label}
        </dt>
        <dd className="mt-1 text-sm text-foreground">{value || children || 'N/A'}</dd>
    </div>
  );

  return (
    <>
      <Dialog open={isAddUserOpen} onOpenChange={setAddUserOpen}>
          <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
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
              <div className="flex gap-4">
                  <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as UserRole | 'all')}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
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
          </div>
          <div className="border rounded-lg">
              <Table>
              <TableHeader>
                  <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Last Seen</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((user) => (
                          <TableRow key={user.id}>
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
                          <TableCell>{format(new Date(user.joined), 'PP')}</TableCell>
                          <TableCell className="text-right text-muted-foreground">
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
                                  <DropdownMenuItem onSelect={() => setViewingUser(user)}>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Archive User</DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </TableCell>
                          </TableRow>
                  ))
                  ) : (
                      <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                              No users found.
                          </TableCell>
                      </TableRow>
                  )}
              </TableBody>
              </Table>
          </div>
          {totalPages > 1 && (
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div>
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users.
                  </div>
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
              </div>
          )}
          </div>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                      Fill in the details below to add a new user and send them an invitation.
                  </DialogDescription>
              </DialogHeader>
              <AddUserForm onSuccess={() => setAddUserOpen(false)} />
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
                    <DetailItem icon={<UserIcon className="h-4 w-4" />} label="Role">
                        <Badge variant="secondary" className={cn("capitalize", roleStyles[viewingUser.role])}>{viewingUser.role}</Badge>
                    </DetailItem>
                    <DetailItem icon={<CheckCircle className="h-4 w-4" />} label="Status">
                        <Badge variant="secondary" className={cn("capitalize", statusStyles[viewingUser.status])}>{viewingUser.status}</Badge>
                    </DetailItem>
                    <DetailItem icon={<Calendar className="h-4 w-4" />} label="Date Joined" value={format(new Date(viewingUser.joined), 'PPP')} />
                    <DetailItem icon={<Calendar className="h-4 w-4" />} label="Last Seen" value={viewingUser.lastSeen ? formatDistanceToNow(new Date(viewingUser.lastSeen), { addSuffix: true }) : 'Never'} />
                </dl>
                <Separator />
                 <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                    <Button>Edit User</Button>
                </div>
                </>
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}
