
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import type { Service } from '@/types/service';
import { useService } from '@/contexts/service-context';
import { useEffect, useState }from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  slug: z.string().min(2, 'Slug must be at least 2 characters.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  icon: z.string().url('Please enter a valid image URL.'),
  price: z.string().regex(/^\d+(\.\d{2})?$/, 'Price must be a valid number (e.g., 450.00).'),
  originalPrice: z.string().regex(/^\d+(\.\d{2})?$/, 'Original price must be a valid number (e.g., 500.00).'),
  popular: z.boolean(),
});

type ServiceFormProps = {
  serviceToEdit?: Service;
};

export function ServiceForm({ serviceToEdit }: ServiceFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { addService, updateService, slugExists } = useService();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: serviceToEdit || {
      title: '',
      slug: '',
      description: '',
      icon: 'https://placehold.co/128x128.png',
      price: '0.00',
      originalPrice: '0.00',
      popular: false,
    },
  });

  useEffect(() => {
    if (serviceToEdit) {
      form.reset(serviceToEdit);
    }
  }, [serviceToEdit, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (serviceToEdit) {
        await updateService(serviceToEdit.slug, values);
        toast({
          title: 'Service Updated!',
          description: 'The service has been successfully updated.',
        });
      } else {
        if (slugExists(values.slug)) {
            form.setError('slug', { type: 'manual', message: 'This slug is already taken.' });
            return;
        }
        await addService(values);
        toast({
          title: 'Service Created!',
          description: 'The new service has been successfully created.',
        });
      }
      router.push('/admin/services');
    } catch (error) {
       toast({
        variant: "destructive",
        title: 'An Error Occurred',
        description: 'Could not save the service. Please try again.',
      });
    }
  }

  const generateSlug = () => {
      const title = form.getValues('title');
      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      form.setValue('slug', slug, { shouldValidate: true });
  }

  return (
    <div className="space-y-6">
       <CardHeader className="px-0">
          <CardTitle>{serviceToEdit ? 'Edit Service' : 'Create New Service'}</CardTitle>
          <CardDescription>Fill out the details below to {serviceToEdit ? 'update the' : 'create a new'} service.</CardDescription>
        </CardHeader>
      
        <Card>
            <CardContent className="pt-6">
            {isClient && (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Service Title</FormLabel>
                            <FormControl>
                                <Input placeholder="SEO Optimization" {...field} />
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
                                <Input placeholder="seo-optimization" {...field} disabled={!!serviceToEdit} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A short description of the service..." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://placehold.co/128x128.png" {...field} />
                            </FormControl>
                          <FormDescription>Recommended size: 128x128 pixels.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Current Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="450.00" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="originalPrice"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Original Price (Strikethrough)</FormLabel>
                                <FormControl>
                                    <Input placeholder="500.00" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <FormField
                        control={form.control}
                        name="popular"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Mark as Popular</FormLabel>
                                    <FormDescription>
                                        Popular services will be highlighted on the services page.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-4">
                        <Button type="submit">{serviceToEdit ? 'Update Service' : 'Create Service'}</Button>
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
