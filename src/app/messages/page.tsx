
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

export default function MessagesPage() {
  const { user, loading: authLoading } = useAuth();
  const { messages, getMessagesForUser, markAsRead, getUnreadCount, deleteMessage } = useMessage();
  const router = useRouter();
  const { toast } = useToast();
  
  // This state is to force a re-render when a message is marked as read
  const [unreadCount, setUnreadCount] = useState(0);

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
  
  const userMessages = getMessagesForUser(user.email);
  
  const handleAccordionChange = (messageId: string) => {
    markAsRead(messageId);
    // Update local state to trigger a re-render
    if (user) {
        setUnreadCount(getUnreadCount(user.email));
    }
  };

  const handleDelete = (messageId: string) => {
    deleteMessage(messageId);
    toast({
        title: 'Message Deleted',
        description: 'The message has been permanently removed.',
    });
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
        <Accordion type="single" collapsible className="w-full bg-card p-4 sm:p-6 rounded-lg border">
            {userMessages.map(message => (
            <AccordionItem value={message.id} key={message.id}>
                <AccordionTrigger
                className={cn(!message.read && "font-bold")}
                onClick={() => handleAccordionChange(message.id)}
                >
                <div className="flex justify-between items-center w-full pr-4">
                    <div className="flex items-center gap-3">
                        <span className={cn("h-2.5 w-2.5 rounded-full", message.read ? 'bg-transparent' : 'bg-primary')} />
                        <span className="truncate">{message.subject}</span>
                    </div>
                    <span className="text-sm text-muted-foreground font-normal shrink-0 ml-4">
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                    </span>
                </div>
                </AccordionTrigger>
                <AccordionContent className="prose prose-sm max-w-none pt-2 pb-4">
                    <div className="text-xs text-muted-foreground mb-4">
                        From: {message.senderName} | {format(new Date(message.timestamp), 'PPP p')}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: message.body }}/>
                    <div className="mt-6 text-right not-prose">
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="xs">
                                    <FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this message.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(message.id)}>
                                    Delete Message
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </AccordionContent>
            </AccordionItem>
            ))}
        </Accordion>
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
