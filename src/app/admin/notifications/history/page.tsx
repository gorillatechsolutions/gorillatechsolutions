
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useMessage } from '@/contexts/message-context';
import { Checkbox } from '@/components/ui/checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/auth-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDistanceToNow, format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function AdminMessageHistoryPage() {
  const { toast } = useToast();
  const { users } = useAuth();
  const { messages, deleteMessages } = useMessage();
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('all');

  const filteredMessages = useMemo(() => {
    let sorted = [...messages].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    if (selectedUserEmail === 'all') {
      return sorted;
    }
    return sorted.filter(m => m.recipientEmail === selectedUserEmail);
  }, [messages, selectedUserEmail]);

  const handleDelete = (ids: string[]) => {
    deleteMessages(ids);
    toast({
      title: 'Messages Deleted',
      description: `${ids.length} message(s) have been successfully deleted.`,
    });
    setSelectedMessages([]);
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedMessages(filteredMessages.map(m => m.id));
    } else {
      setSelectedMessages([]);
    }
  };

  const handleSelectMessage = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedMessages(prev => [...prev, id]);
    } else {
      setSelectedMessages(prev => prev.filter(messageId => messageId !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Message History</h1>
          <p className="text-muted-foreground">View and manage all sent notifications.</p>
        </div>
        <Button asChild>
            <Link href="/admin/notifications">
                Compose New Message
            </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Sent Messages</CardTitle>
              <CardDescription>A log of all notifications sent to users.</CardDescription>
            </div>
            <div className="flex items-center gap-4">
                <Select value={selectedUserEmail} onValueChange={setSelectedUserEmail}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Filter by user..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        {users.map(user => (
                            <SelectItem key={user.email} value={user.email}>
                                {user.name} ({user.email})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {selectedMessages.length > 0 && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                        <FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" />
                        Delete Selected ({selectedMessages.length})
                    </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                        This will permanently delete {selectedMessages.length} messages for the recipient(s). This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(selectedMessages)}>
                        Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedMessages.length > 0 && selectedMessages.length === filteredMessages.length ? true : (filteredMessages.length > 0 ? 'indeterminate' : false)}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all messages"
                  />
                </TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id} data-state={selectedMessages.includes(message.id) ? 'selected' : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={selectedMessages.includes(message.id)}
                      onCheckedChange={(checked) => handleSelectMessage(message.id, !!checked)}
                      aria-label={`Select message to ${message.recipientEmail}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {users.find(u => u.email === message.recipientEmail)?.name || message.recipientEmail}
                    <div className="text-xs text-muted-foreground">{message.recipientEmail}</div>
                  </TableCell>
                  <TableCell>{message.subject}</TableCell>
                   <TableCell>
                    {message.read ? <Badge variant="secondary">Read</Badge> : <Badge variant="default">Unread</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        <span>{format(new Date(message.timestamp), 'PPP')}</span>
                        <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="xs">
                          <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this message. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete([message.id])}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredMessages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                <p>No messages found for the selected filter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
