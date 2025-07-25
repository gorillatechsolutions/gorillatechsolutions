
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
import { useHomePage } from '@/contexts/home-page-context';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  heroTitle: z.string().min(1, 'Hero title is required.'),
  heroSubtitle: z.string().min(1, 'Hero subtitle is required.'),
  heroImage: z.string().url('Please enter a valid URL.'),
  heroImageAiHint: z.string().min(1, 'AI hint is required.'),
  heroCtaButtonText: z.string().min(1, 'CTA button text is required.'),
  heroCtaButtonLink: z.string().min(1, 'CTA button link is required.'),
  heroSecondaryButtonText: z.string().min(1, 'Secondary button text is required.'),
  heroSecondaryButtonLink: z.string().min(1, 'Secondary button link is required.'),
});

export default function HomeSettingsPage() {
    const { content, updateContent, loading } = useHomePage();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: content,
    });
    
    useEffect(() => {
        if (!loading) {
            form.reset(content);
        }
    }, [content, loading, form]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateContent(values);
        toast({
            title: 'Home Page Saved!',
            description: 'Your changes to the home page have been saved.',
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
                <h1 className="text-2xl font-bold text-foreground">Edit Home Page</h1>
                <p className="text-muted-foreground">Update the content displayed on your public home page.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                             <CardDescription>Update the main headline, sub-headline, image, and buttons for the hero section.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField control={form.control} name="heroTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="heroSubtitle" render={({ field }) => (<FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>)} />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="heroImage" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="heroImageAiHint" render={({ field }) => (<FormItem><FormLabel>Image AI Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>

                            <h3 className="text-lg font-medium pt-4">Buttons</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="heroCtaButtonText" render={({ field }) => (<FormItem><FormLabel>Primary Button Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="heroCtaButtonLink" render={({ field }) => (<FormItem><FormLabel>Primary Button Link</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="heroSecondaryButtonText" render={({ field }) => (<FormItem><FormLabel>Secondary Button Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="heroSecondaryButtonLink" render={({ field }) => (<FormItem><FormLabel>Secondary Button Link</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>

                        </CardContent>
                    </Card>

                    <Button type="submit">Save Changes</Button>
                </form>
            </Form>
        </div>
    );
}
