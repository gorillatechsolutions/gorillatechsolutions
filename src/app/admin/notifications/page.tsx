
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { useAuth, User } from '@/contexts/auth-context';
import { useMessage } from '@/contexts/message-context';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const formSchema = z
  .object({
    recipientType: z.enum(['all', 'specific']),
    recipients: z.array(z.string().email()),
    subject: z.string().min(2, 'Subject must be at least 2 characters.'),
    body: z.string().min(10, 'Message body must be at least 10 characters.'),
  })
  .refine(
    (data) => {
      if (data.recipientType === 'specific') {
        return data.recipients.length > 0;
      }
      return true;
    },
    {
      message: 'At least one recipient email is required.',
      path: ['recipients'],
    }
  );


export default function NotificationsPage() {
  const { toast } = useToast();
  const { user: adminUser, users } = useAuth();
  const { sendMessage } = useMessage();
  const [recipientSearch, setRecipientSearch] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientType: 'all',
      recipients: [],
      subject: '',
      body: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!adminUser) {
      toast({ variant: 'destructive', title: 'Error', description: 'You are not logged in.' });
      return;
    }

    const senderName = adminUser.name;
    let recipients: string[] = [];
    let successMessage = '';

    if (values.recipientType === 'all') {
      recipients = users.map(u => u.email);
      successMessage = `Message sent to all ${recipients.length} users.`;
    } else {
      recipients = values.recipients;
      successMessage = `Message sent to ${recipients.length} user(s).`;
    }

    recipients.forEach(email => {
        sendMessage({
            recipientEmail: email,
            senderName,
            subject: values.subject,
            body: values.body.replace(/\n/g, '<br>'),
        });
    });

    toast({
      title: 'Message Sent!',
      description: successMessage,
    });
    form.reset({
        recipientType: 'all',
        recipients: [],
        subject: '',
        body: '',
    });
  }
  
  const recipientType = form.watch('recipientType');
  const selectedRecipients = form.watch('recipients');
  
  const filteredUsers = users.filter(user => 
    (user.email.toLowerCase().includes(recipientSearch.toLowerCase()) || 
     user.username.toLowerCase().includes(recipientSearch.toLowerCase())) &&
    !selectedRecipients.includes(user.email)
  );

  const handleSelectRecipient = (email: string) => {
    form.setValue('recipients', [...selectedRecipients, email]);
    setRecipientSearch('');
    setIsPopoverOpen(false);
  };
  
  const handleRemoveRecipient = (email: string) => {
    form.setValue('recipients', selectedRecipients.filter(r => r !== email));
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-foreground">Send Notification</h1>
            <p className="text-muted-foreground">Compose and send a message to all or specific users.</p>
        </div>
        <Button asChild variant="outline">
            <Link href="/admin/notifications/history">
                <FontAwesomeIcon icon={faHistory} className="mr-2 h-4 w-4" />
                Message History
            </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compose Message</CardTitle>
          <CardDescription>The message will be sent from "{adminUser?.name}" and appear in the user's inbox.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <FormField
                control={form.control}
                name="recipientType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Recipient</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="all" />
                          </FormControl>
                          <FormLabel className="font-normal">All Users</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="specific" />
                          </FormControl>
                          <FormLabel className="font-normal">Specific User(s)</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {recipientType === 'specific' && (
                <FormField
                  control={form.control}
                  name="recipients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipients</FormLabel>
                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                          <PopoverTrigger asChild>
                            <div
                              ref={triggerRef}
                              className="w-full min-h-10 flex flex-wrap items-center gap-2 p-2 border rounded-md"
                              onClick={() => setIsPopoverOpen(true)}
                            >
                              {selectedRecipients.map(email => {
                                const user = users.find(u => u.email === email);
                                return (
                                  <Badge key={email} variant="secondary" className="text-sm">
                                    {user?.name || email}
                                    <button
                                      type="button"
                                      className="ml-2"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveRecipient(email);
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                );
                              })}
                              <Input
                                  value={recipientSearch}
                                  onChange={e => setRecipientSearch(e.target.value)}
                                  placeholder="Type to search users..."
                                  className="flex-1 border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                                />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent 
                            className="w-full p-0" 
                            style={{ width: triggerRef.current?.offsetWidth }}
                            align="start"
                          >
                             <ScrollArea className="h-48">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map(user => (
                                      <div
                                        key={user.email}
                                        className="p-2 hover:bg-secondary cursor-pointer"
                                        onClick={() => handleSelectRecipient(user.email)}
                                      >
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                      </div>
                                    ))
                                ) : (
                                    <p className="p-2 text-sm text-muted-foreground">No users found.</p>
                                )}
                            </ScrollArea>
                          </PopoverContent>
                        </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Important update regarding your account" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message Body</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Dear user..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Send Message</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

