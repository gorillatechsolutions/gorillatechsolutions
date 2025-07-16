
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
import { useRouter } from 'next/navigation';
import type { App } from '@/types/app';
import { useApp } from '@/contexts/app-context';
import { useEffect, useState }from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  slug: z.string().min(2, 'Slug must be at least 2 characters.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
  category: z.string().min(2, 'Category is required.'),
  description: z.string().min(20, 'Description must be at least 20 characters.').max(200, 'Description must not exceed 200 characters.'),
  icon: z.string().url('Please enter a valid image URL.'),
  dataAiHint: z.string().min(1, 'AI hint is required.'),
  downloads: z.string().min(1, 'Downloads count is required.'),
  rating: z.coerce.number().min(0).max(5, 'Rating must be between 0 and 5.'),
  badge: z.string().optional(),
  links: z.object({
      web: z.string().url().optional().or(z.literal('')),
      playStore: z.string().url().optional().or(z.literal('')),
      appStore: z.string().url().optional().or(z.literal('')),
      download: z.string().url().optional().or(z.literal('')),
      buy: z.string().url().optional().or(z.literal('')),
  })
});

type AppFormProps = {
  appToEdit?: App;
};

export function AppForm({ appToEdit }: AppFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { addApp, updateApp, slugExists } = useApp();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: appToEdit ? {
        ...appToEdit
    } : {
      title: '',
      slug: '',
      category: '',
      description: '',
      icon: 'https://placehold.co/128x128.png',
      dataAiHint: '',
      downloads: '100K+',
      rating: 4.5,
      badge: '',
      links: {
          web: '',
          playStore: '',
          appStore: '',
          download: '',
          buy: ''
      }
    },
  });

  useEffect(() => {
    if (appToEdit) {
      form.reset({
        ...appToEdit
      });
    }
  }, [appToEdit, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const appData = {
      ...values,
      badge: values.badge || undefined, // Set to undefined if empty string
    };

    if (appToEdit) {
      updateApp(appToEdit.slug, appData);
      toast({
        title: 'App Updated!',
        description: 'The application has been successfully updated.',
      });
    } else {
      if (slugExists(appData.slug)) {
          form.setError('slug', { type: 'manual', message: 'This slug is already taken.' });
          return;
      }
      addApp(appData);
      toast({
        title: 'App Created!',
        description: 'The new application has been successfully created.',
      });
    }

    router.push('/admin/apps');
  }

  const generateSlug = () => {
      const title = form.getValues('title');
      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      form.setValue('slug', slug, { shouldValidate: true });
  }

  return (
    <div className="space-y-6">
       <CardHeader className="px-0">
          <CardTitle>{appToEdit ? 'Edit Application' : 'Create New Application'}</CardTitle>
          <CardDescription>Fill out the details below to {appToEdit ? 'update the' : 'create a new'} application.</CardDescription>
        </CardHeader>
      
        <Card>
            <CardContent className="pt-6">
            {isClient && (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>App Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Analytics Hub" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                <div className="flex justify-between items-end">
                                    <FormLabel>URL Slug</FormLabel>
                                    <Button type="button" variant="link" size="sm" className="p-0 h-auto" onClick={generateSlug}>Generate from title</Button>
                                </div>
                                <FormControl>
                                    <Input placeholder="analytics-hub" {...field} disabled={!!appToEdit} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A short description of the application..." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Icon URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://placehold.co/128x128.png" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dataAiHint"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Icon AI Hint</FormLabel>
                                <FormControl>
                                    <Input placeholder="analytics chart" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="Business" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Rating (0-5)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.1" placeholder="4.8" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="downloads"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Downloads</FormLabel>
                                <FormControl>
                                    <Input placeholder="1M+" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="badge"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Badge</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a badge" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value=" ">None</SelectItem>
                                        <SelectItem value="Premium">Premium</SelectItem>
                                        <SelectItem value="Gold">Gold</SelectItem>
                                        <SelectItem value="Login Required">Login Required</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </div>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Platform & Links</CardTitle>
                            <CardDescription>
                                Provide direct links for the application. The public site uses these links to automatically categorize the app as <strong>Mobile</strong>, <strong>Web</strong>, or <strong>Desktop</strong>. An app can belong to multiple categories.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="links.web" render={({ field }) => (<FormItem><FormLabel>Website URL (Web App)</FormLabel><FormControl><Input placeholder="https://example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="links.download" render={({ field }) => (<FormItem><FormLabel>Direct Download URL (Desktop App)</FormLabel><FormControl><Input placeholder="https://example.com/download" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="links.playStore" render={({ field }) => (<FormItem><FormLabel>Google Play Store URL (Mobile App)</FormLabel><FormControl><Input placeholder="https://play.google.com/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="links.appStore" render={({ field }) => (<FormItem><FormLabel>Apple App Store URL (Mobile App)</FormLabel><FormControl><Input placeholder="https://apps.apple.com/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="links.buy" render={({ field }) => (<FormItem><FormLabel>Purchase/Buy URL</FormLabel><FormControl><Input placeholder="https://example.com/buy" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4">
                        <Button type="submit">{appToEdit ? 'Update App' : 'Create App'}</Button>
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
