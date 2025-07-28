
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import type { User } from '@/contexts/auth-context';
import { useAuth } from '@/contexts/auth-context';
import { useMessage } from '@/contexts/message-context';
import { useToast } from '@/hooks/use-toast';

const messageSchema = z.object({
  subject: z.string().min(1, 'Subject is required.'),
  body: z.string().min(1, 'Message body is required.'),
});

interface SendMessageDialogProps {
  recipient: User;
}

export function SendMessageDialog({ recipient }: SendMessageDialogProps) {
  const [open, setOpen] = useState(false);
  const { user: sender } = useAuth();
  const { sendMessage } = useMessage();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      subject: '',
      body: '',
    },
  });

  const onSubmit = (values: z.infer<typeof messageSchema>) => {
    if (!sender) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to send a message.' });
        return;
    }
    
    sendMessage({
      recipientEmail: recipient.email,
      senderName: sender.name,
      subject: values.subject,
      body: values.body.replace(/\n/g, '<br>'), // Basic HTML formatting
    });

    toast({ title: 'Message Sent!', description: `Your message has been sent to ${recipient.name}.` });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="xs">
          <FontAwesomeIcon icon={faPaperPlane} className="mr-1 h-3 w-3" />
          Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
          <DialogDescription>
            Compose a message to {recipient.name} ({recipient.email}).
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <Label>Subject</Label>
                  <FormControl>
                    <Input placeholder="Regarding your account..." {...field} />
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
                  <Label>Body</Label>
                  <FormControl>
                    <Textarea placeholder="Hi there..." className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
