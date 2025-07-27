
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
import { useRouter } from 'next/navigation';
import { useAuth, User, UserRole } from '@/contexts/auth-context';
import { useEffect, useState }from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  username: z.string().min(3, 'Username must be at least 3 characters.').regex(/^[a-z0-9_.]+$/, 'Invalid username format.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters.').optional().or(z.literal('')),
  role: z.enum(['admin', 'user', 'premium', 'gold', 'platinum']),
});

type UserFormProps = {
  userToEdit?: User;
};

const userRoles: UserRole[] = ['admin', 'user', 'premium', 'gold', 'platinum'];

export function UserForm({ userToEdit }: UserFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { addUser, updateUser, emailExists, usernameExists } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userToEdit ? {
        ...userToEdit,
        phone: userToEdit.phone || '',
    } : {
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      role: 'user',
    },
  });
  
  useEffect(() => {
    if (userToEdit) {
      form.reset({
        ...userToEdit,
        password: '', // Password should be empty for editing for security
        phone: userToEdit.phone || '',
      });
    }
  }, [userToEdit, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (userToEdit) {
        if (values.username !== userToEdit.username && usernameExists(values.username)) {
            form.setError('username', { type: 'manual', message: 'This username is already taken.' });
            return;
        }
      updateUser(userToEdit.email, values);
      toast({
        title: 'User Updated!',
        description: 'The user has been successfully updated.',
      });
    } else {
      if (emailExists(values.email)) {
          form.setError('email', { type: 'manual', message: 'This email is already taken.' });
          return;
      }
       if (usernameExists(values.username)) {
          form.setError('username', { type: 'manual', message: 'This username is already taken.' });
          return;
      }
      if (!values.password) {
          form.setError('password', { type: 'manual', message: 'Password is required for new users.' });
          return;
      }
      addUser(values as User);
      toast({
        title: 'User Created!',
        description: 'The new user has been successfully created.',
      });
    }
    router.push('/admin/users');
  }

  return (
    <div className="space-y-6">
       <CardHeader className="px-0">
          <CardTitle>{userToEdit ? 'Edit User' : 'Create New User'}</CardTitle>
          <CardDescription>Fill out the details below to {userToEdit ? 'update the' : 'create a new'} user.</CardDescription>
        </CardHeader>
      
        <Card>
            <CardContent className="pt-6">
            {isClient && (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="john.doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="you@example.com" {...field} disabled={!!userToEdit} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Phone Number (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="123-456-7890" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Password {userToEdit && '(Leave blank to keep current)'}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {userRoles.map(role => (
                                            <SelectItem key={role} value={role} className="capitalize">{role}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit">{userToEdit ? 'Update User' : 'Create User'}</Button>
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                    </div>
                </form>
                </Form>
            )}
            </CardContent>
        </Card>
    </div>
  );
}
