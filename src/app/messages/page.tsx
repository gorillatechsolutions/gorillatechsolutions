
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useMessage } from '@/contexts/message-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

export default function MessagesPage() {
  const { user, loading: authLoading } = useAuth();
  const { messages, getMessagesForUser, markAsRead, getUnreadCount, deleteMessages } = useMessage();
  const router = useRouter();
  const { toast } = useToast();
  
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  
  const userMessages = getMessagesForUser(user?.email || '');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);
  
  useEffect(() => {
    if (user) {
      setUnreadCount(getUnreadCount(user.email));
    }
  }, [user, getUnreadCount, messages]);
  
  if (authLoading || !user) {
    return <div className="container py-12">Loading messages...</div>;
  }
  
  const handleAccordionChange = (messageId: string) => {
    markAsRead(messageId);
    if (user) {
        setUnreadCount(getUnreadCount(user.email));
    }
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedMessages(userMessages.map(m => m.id));
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

  const handleDeleteSelected = () => {
    deleteMessages(selectedMessages);
    toast({
        title: 'Messages Deleted',
        description: `${selectedMessages.length} message(s) have been permanently removed.`,
    });
    setSelectedMessages([]);
  }

  return (
    <div className="w-full bg-secondary/30 text-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">Your Messages</h1>
            <p className="mt-2 text-muted-foreground">
              Here are the latest notifications and messages from our team.
            </p>
        </div>
        
        {userMessages.length > 0 ? (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Checkbox
                        id="select-all"
                        checked={selectedMessages.length > 0 && selectedMessages.length === userMessages.length ? true : (selectedMessages.length > 0 ? 'indeterminate' : false)}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all messages"
                    />
                    <label htmlFor="select-all" className="text-sm font-medium">Select All</label>
                </div>
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
                            This will permanently delete {selectedMessages.length} messages. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteSelected}>
                                Delete Messages
                            </AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>

            <Card className="p-0">
                <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                        {userMessages.map(message => (
                        <div key={message.id} className={cn("flex items-start gap-4 p-4 border-b", selectedMessages.includes(message.id) && 'bg-secondary/80')}>
                             <Checkbox
                                id={`select-${message.id}`}
                                className="mt-3"
                                checked={selectedMessages.includes(message.id)}
                                onCheckedChange={(checked) => handleSelectMessage(message.id, !!checked)}
                                aria-label={`Select message "${message.subject}"`}
                            />
                            <AccordionItem value={message.id} className="border-b-0 flex-1">
                                <AccordionTrigger
                                className={cn("py-0 hover:no-underline", !message.read && "font-bold")}
                                onClick={() => handleAccordionChange(message.id)}
                                >
                                <div className="flex justify-between items-center w-full pr-4">
                                    <div className="flex items-center gap-3">
                                        <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", message.read ? 'bg-transparent' : 'bg-primary')} />
                                        <span className="truncate">{message.subject}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground font-normal shrink-0 ml-4">
                                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                                    </span>
                                </div>
                                </AccordionTrigger>
                                <AccordionContent className="prose prose-sm max-w-none pt-4 pb-1">
                                    <div className="text-xs text-muted-foreground mb-4">
                                        From: {message.senderName} | {format(new Date(message.timestamp), 'PPP p')}
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: message.body }}/>
                                </AccordionContent>
                            </AccordionItem>
                        </div>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
        ) : (
        <div className="text-center py-16 bg-card rounded-lg border">
            <p className="text-muted-foreground">You have no messages.</p>
            <Button asChild variant="link" className="mt-2">
                <Link href="/contact">Contact Support</Link>
            </Button>
        </div>
        )}
      </div>
    </div>
  );
}
