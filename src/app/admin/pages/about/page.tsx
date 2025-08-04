
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { useAboutPage } from '@/contexts/about-page-context';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const valueSchema = z.object({
  icon: z.string().min(1, 'Icon name is required.'),
  title: z.string().min(1, 'Value title is required.'),
  description: z.string().min(1, 'Value description is required.'),
});

const formSchema = z.object({
  metaTitle: z.string().min(1, 'Meta title is required.'),
  metaDescription: z.string().min(1, 'Meta description is required.'),
  metaKeywords: z.string().optional(),
  metaOgImage: z.string().url('Please enter a valid URL.'),
  heroTitle: z.string().min(1, 'Hero title is required.'),
  heroSubtitle: z.string().min(1, 'Hero subtitle is required.'),
  storyTitle: z.string().min(1, 'Story title is required.'),
  storyParagraph1: z.string().min(1, 'Story paragraph 1 is required.'),
  storyParagraph2: z.string().min(1, 'Story paragraph 2 is required.'),
  storyImage: z.string().url('Please enter a valid URL.'),
  storyImageAiHint: z.string().min(1, 'AI hint is required.'),
  valuesTitle: z.string().min(1, 'Values section title is required.'),
  valuesSubtitle: z.string().min(1, 'Values section subtitle is required.'),
  values: z.array(valueSchema),
  ctaTitle: z.string().min(1, 'CTA title is required.'),
  ctaSubtitle: z.string().min(1, 'CTA subtitle is required.'),
});

export default function AboutSettingsPage() {
    const { content, updateContent, loading } = useAboutPage();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...content,
            metaKeywords: content.metaKeywords || '',
        },
    });
    
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "values",
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
            title: 'About Page Saved!',
            description: 'Your changes to the about page have been saved.',
        });
    };

    if (loading) {
        return (
          <div className="space-y-6">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Edit About Page</h1>
                <p className="text-muted-foreground">Update the content displayed on your public "About Us" page.</p>
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
                            <FormField control={form.control} name="metaKeywords" render={({ field }) => (<FormItem><FormLabel>Meta Keywords</FormLabel><FormControl><Input {...field} placeholder="e.g., digital marketing agency, seo experts" /></FormControl><FormDescription>Enter keywords separated by commas.</FormDescription><FormMessage /></FormItem>)} />
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

                     <Card>
                        <CardHeader>
                            <CardTitle>Our Story Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <FormField control={form.control} name="storyTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="storyParagraph1" render={({ field }) => (<FormItem><FormLabel>First Paragraph</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="storyParagraph2" render={({ field }) => (<FormItem><FormLabel>Second Paragraph</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>)} />
                           <div className="grid grid-cols-2 gap-4">
                               <FormField control={form.control} name="storyImage" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Recommended size: 600x450 pixels.</FormDescription><FormMessage /></FormItem>)} />
                               <FormField control={form.control} name="storyImageAiHint" render={({ field }) => (<FormItem><FormLabel>Image AI Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                           </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Core Values Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField control={form.control} name="valuesTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="valuesSubtitle" render={({ field }) => (<FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                            
                            <div className="space-y-4">
                                <FormLabel>Values</FormLabel>
                                {fields.map((field, index) => (
                                    <Card key={field.id} className="p-4 bg-secondary/50">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <FormField control={form.control} name={`values.${index}.icon`} render={({ field }) => (<FormItem><FormLabel>Icon Name</FormLabel><FormControl><Input {...field} placeholder="e.g., Bolt" /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name={`values.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <div className="md:col-span-3">
                                               <FormField control={form.control} name={`values.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            </div>
                                        </div>
                                         <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)} className="mt-2">
                                            <FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" />
                                            Remove Value
                                        </Button>
                                    </Card>
                                ))}
                                <Button type="button" variant="outline" onClick={() => append({ icon: '', title: '', description: '' })}>
                                    Add New Value
                                </Button>
                            </div>

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Call to Action (CTA) Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <FormField control={form.control} name="ctaTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="ctaSubtitle" render={({ field }) => (<FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </CardContent>
                    </Card>

                    <Button type="submit">Save Changes</Button>
                </form>
            </Form>
        </div>
    );
}
