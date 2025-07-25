
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
import { useApplicationPage } from '@/contexts/application-page-context';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  metaTitle: z.string().min(1, 'Meta title is required.'),
  metaDescription: z.string().min(1, 'Meta description is required.'),
  metaKeywords: z.string().optional(),
  metaOgImage: z.string().url('Please enter a valid URL.'),
  heroTitle: z.string().min(1, 'Hero title is required.'),
  heroSubtitle: z.string().min(1, 'Hero subtitle is required.'),
});

export default function ApplicationSettingsPage() {
    const { content, updateContent, loading } = useApplicationPage();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...content,
            metaKeywords: content.metaKeywords || '',
        },
    });
    
    useEffect(() => {
        if (!loading) {
            form.reset({
                ...content,
                metaKeywords: content.metaKeywords || '',
            });
        }
    }, [content, loading, form]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateContent(values);
        toast({
            title: 'Application Page Saved!',
            description: 'Your changes to the "Work with Us" page have been saved.',
        });
    };

    if (loading) {
        return <div className="space-y-6">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Edit "Work with Us" Page</h1>
                <p className="text-muted-foreground">Update the content displayed on your public application page.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>SEO & Metadata</CardTitle>
                             <CardDescription>Update the page's metadata for search engines and social media.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField control={form.control} name="metaTitle" render={({ field }) => (<FormItem><FormLabel>Meta Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="metaDescription" render={({ field }) => (<FormItem><FormLabel>Meta Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="metaKeywords" render={({ field }) => (<FormItem><FormLabel>Meta Keywords</FormLabel><FormControl><Textarea {...field} placeholder="e.g., digital marketing careers, seo jobs" /></FormControl><FormDescription>Enter keywords separated by commas.</FormDescription><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="metaOgImage" render={({ field }) => (<FormItem><FormLabel>Open Graph Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Recommended size: 1200x630 pixels.</FormDescription><FormMessage /></FormItem>)} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField control={form.control} name="heroTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="heroSubtitle" render={({ field }) => (<FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </CardContent>
                    </Card>

                    <Button type="submit">Save Changes</Button>
                </form>
            </Form>
        </div>
    );
}
