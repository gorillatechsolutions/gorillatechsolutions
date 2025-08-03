
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
import { useAuth } from '@/contexts/auth-context';
import { useMessage } from '@/contexts/message-context';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

const formSchema = z
  .object({
    recipientType: z.enum(['all', 'specific']),
    recipientEmail: z.string().optional(),
    subject: z.string().min(2, 'Subject must be at least 2 characters.'),
    body: z.string().min(10, 'Message body must be at least 10 characters.'),
  })
  .refine(
    (data) => {
      if (data.recipientType === 'specific') {
        return !!data.recipientEmail;
      }
      return true;
    },
    {
      message: 'Recipient email is required.',
      path: ['recipientEmail'],
    }
  )
  .refine(
    (data) => {
      if (data.recipientType === 'specific' && data.recipientEmail) {
        return z.string().email().safeParse(data.recipientEmail).success;
      }
      return true;
    },
    {
      message: 'Please enter a valid email address.',
      path: ['recipientEmail'],
    }
  );


export default function NotificationsPage() {
  const { toast } = useToast();
  const { user: adminUser, users } = useAuth();
  const { sendMessage } = useMessage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientType: 'all',
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
      if (!values.recipientEmail) {
        form.setError('recipientEmail', { type: 'manual', message: 'Please enter a user email.' });
        return;
      }
      recipients = [values.recipientEmail];
      const recipientUser = users.find(u => u.email === values.recipientEmail);
      successMessage = `Message sent to ${recipientUser?.name || 'the selected user'}.`;
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
        recipientEmail: '',
        subject: '',
        body: '',
    });
  }
  
  const recipientType = form.watch('recipientType');

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
                          <FormLabel className="font-normal">Specific User</FormLabel>
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
                  name="recipientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter user's email address" {...field} />
                      </FormControl>
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
