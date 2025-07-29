
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
import { useHomePage } from '@/contexts/home-page-context';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const processStepSchema = z.object({
    imageUrl: z.string().url(),
    imageAiHint: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
});

const statSchema = z.object({
    imageUrl: z.string().url(),
    imageAiHint: z.string().min(1),
    value: z.coerce.number(),
    label: z.string().min(1),
    description: z.string().min(1),
});

const formSchema = z.object({
  metaTitle: z.string().min(1, 'Meta title is required.'),
  metaDescription: z.string().min(1, 'Meta description is required.'),
  metaKeywords: z.string().optional(),
  metaOgImage: z.string().url('Please enter a valid URL.'),
  heroTitle: z.string().min(1, 'Hero title is required.'),
  heroSubtitle: z.string().min(1, 'Hero subtitle is required.'),
  heroImage: z.string().url('Please enter a valid URL.'),
  heroImageAiHint: z.string().min(1, 'AI hint is required.'),
  heroCtaButtonText: z.string().min(1, 'CTA button text is required.'),
  heroCtaButtonLink: z.string().min(1, 'CTA button link is required.'),
  heroSecondaryButtonText: z.string().min(1, 'Secondary button text is required.'),
  heroSecondaryButtonLink: z.string().min(1, 'Secondary button link is required.'),
  processTitle: z.string().min(1, 'Title is required.'),
  processSubtitle: z.string().min(1, 'Subtitle is required.'),
  processDescription: z.string().min(1, 'Description is required.'),
  processSteps: z.array(processStepSchema),
  commitmentTitle: z.string().min(1, 'Title is required.'),
  stats: z.array(statSchema),
  benefitsTitle: z.string().min(1, 'Title is required.'),
  benefits: z.string().transform(val => val.split(',').map(s => s.trim())).refine(arr => arr.every(s => s.length > 0), { message: "All benefits must be non-empty" }),
  ctaTitle: z.string().min(1, 'Title is required.'),
  ctaSubtitle: z.string().min(1, 'Subtitle is required.'),
  ctaImage: z.string().url('Please enter a valid URL.'),
  ctaImageAiHint: z.string().min(1, 'AI hint is required.'),
  ctaButtonText: z.string().min(1, 'Button text is required.'),
  ctaButtonLink: z.string().min(1, 'Button link is required.'),
});

export default function HomeSettingsPage() {
    const { content, updateContent, loading } = useHomePage();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...content,
            benefits: content.benefits.join(', '),
            metaKeywords: content.metaKeywords || '',
        },
    });

    const { fields: processStepFields, append: appendProcessStep, remove: removeProcessStep } = useFieldArray({
        control: form.control,
        name: "processSteps",
    });

    const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({
        control: form.control,
        name: "stats",
    });
    
    useEffect(() => {
        if (!loading) {
            form.reset({
                ...content,
                benefits: content.benefits.join(', '),
                metaKeywords: content.metaKeywords || '',
            });
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Accordion type="multiple" defaultValue={['item-1']} className="w-full space-y-4">
                        <Card>
                            <AccordionItem value="item-1" className="border-b-0">
                                <CardHeader>
                                    <AccordionTrigger>
                                        <h3 className="text-lg font-medium">SEO & Metadata</h3>
                                    </AccordionTrigger>
                                </CardHeader>
                                <AccordionContent>
                                    <CardDescription className="px-6 pb-4">Update the page's metadata for search engines and social media.</CardDescription>
                                    <CardContent className="space-y-4 pt-0">
                                        <FormField control={form.control} name="metaTitle" render={({ field }) => (<FormItem><FormLabel>Meta Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="metaDescription" render={({ field }) => (<FormItem><FormLabel>Meta Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="metaKeywords" render={({ field }) => (<FormItem><FormLabel>Meta Keywords</FormLabel><FormControl><Textarea {...field} placeholder="e.g., digital marketing, seo, ppc" /></FormControl><FormDescription>Enter keywords separated by commas.</FormDescription><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="metaOgImage" render={({ field }) => (<FormItem><FormLabel>Open Graph Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Recommended size: 1200x630 pixels.</FormDescription><FormMessage /></FormItem>)} />
                                    </CardContent>
                                </AccordionContent>
                            </AccordionItem>
                        </Card>

                        <Card>
                            <AccordionItem value="item-2" className="border-b-0">
                                <CardHeader>
                                    <AccordionTrigger>
                                        <h3 className="text-lg font-medium">Hero Section</h3>
                                    </AccordionTrigger>
                                </CardHeader>
                                <AccordionContent>
                                    <CardDescription className="px-6 pb-4">Update the main headline, sub-headline, image, and buttons for the hero section.</CardDescription>
                                    <CardContent className="space-y-4 pt-0">
                                        <FormField control={form.control} name="heroTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="heroSubtitle" render={({ field }) => (<FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>)} />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField control={form.control} name="heroImage" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Recommended size: 600x600 pixels (square).</FormDescription><FormMessage /></FormItem>)} />
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
                                </AccordionContent>
                            </AccordionItem>
                        </Card>

                        <Card>
                            <AccordionItem value="item-3" className="border-b-0">
                                <CardHeader>
                                    <AccordionTrigger>
                                        <h3 className="text-lg font-medium">Proven Process Section</h3>
                                    </AccordionTrigger>
                                </CardHeader>
                                <AccordionContent>
                                    <CardDescription className="px-6 pb-4">Manage the content for the 4-step process section.</CardDescription>
                                    <CardContent className="space-y-4 pt-0">
                                        <FormField control={form.control} name="processTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="processSubtitle" render={({ field }) => (<FormItem><FormLabel>Subtitle</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="processDescription" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <div className="space-y-4">
                                            <FormLabel>Process Steps</FormLabel>
                                            {processStepFields.map((field, index) => (
                                                <Card key={field.id} className="p-4 bg-secondary/50">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField control={form.control} name={`processSteps.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Step Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                        <FormField control={form.control} name={`processSteps.${index}.imageUrl`} render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Recommended size: 100x100 pixels.</FormDescription><FormMessage /></FormItem>)} />
                                                        <FormField control={form.control} name={`processSteps.${index}.imageAiHint`} render={({ field }) => (<FormItem><FormLabel>Image AI Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                        <div className="md:col-span-2"><FormField control={form.control} name={`processSteps.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
                                                    </div>
                                                    <Button type="button" variant="destructive" size="sm" onClick={() => removeProcessStep(index)} className="mt-2"><FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" /> Remove Step</Button>
                                                </Card>
                                            ))}
                                            <Button type="button" variant="outline" onClick={() => appendProcessStep({ imageUrl: 'https://placehold.co/100x100.png', imageAiHint: 'new step', title: 'New Step', description: 'Description for new step.' })}>Add New Step</Button>
                                        </div>
                                    </CardContent>
                                </AccordionContent>
                            </AccordionItem>
                        </Card>
                        
                        <Card>
                            <AccordionItem value="item-4" className="border-b-0">
                                <CardHeader>
                                    <AccordionTrigger>
                                        <h3 className="text-lg font-medium">Commitment & Stats Section</h3>
                                    </AccordionTrigger>
                                </CardHeader>
                                <AccordionContent>
                                    <CardDescription className="px-6 pb-4">Manage the statistics and list of benefits.</CardDescription>
                                    <CardContent className="space-y-4 pt-0">
                                    <FormField control={form.control} name="commitmentTitle" render={({ field }) => (<FormItem><FormLabel>Section Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <div className="space-y-4">
                                            <FormLabel>Statistics</FormLabel>
                                            {statFields.map((field, index) => (
                                                <Card key={field.id} className="p-4 bg-secondary/50">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField control={form.control} name={`stats.${index}.label`} render={({ field }) => (<FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                        <FormField control={form.control} name={`stats.${index}.value`} render={({ field }) => (<FormItem><FormLabel>Value (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                        <FormField control={form.control} name={`stats.${index}.imageUrl`} render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Recommended size: 64x64 pixels.</FormDescription><FormMessage /></FormItem>)} />
                                                        <FormField control={form.control} name={`stats.${index}.imageAiHint`} render={({ field }) => (<FormItem><FormLabel>Image AI Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                        <div className="md:col-span-2"><FormField control={form.control} name={`stats.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
                                                    </div>
                                                    <Button type="button" variant="destructive" size="sm" onClick={() => removeStat(index)} className="mt-2"><FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" /> Remove Stat</Button>
                                                </Card>
                                            ))}
                                            <Button type="button" variant="outline" onClick={() => appendStat({ imageUrl: 'https://placehold.co/64x64.png', imageAiHint: 'new stat', value: 100, label: 'New Stat', description: 'Description for new stat.' })}>Add New Stat</Button>
                                        </div>
                                        <FormField control={form.control} name="benefitsTitle" render={({ field }) => (<FormItem><FormLabel>Benefits Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="benefits" render={({ field }) => (<FormItem><FormLabel>Benefits (comma-separated)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </CardContent>
                                </AccordionContent>
                            </AccordionItem>
                        </Card>

                        <Card>
                            <AccordionItem value="item-5" className="border-b-0">
                                 <CardHeader>
                                    <AccordionTrigger>
                                        <h3 className="text-lg font-medium">Call to Action (CTA) Section</h3>
                                    </AccordionTrigger>
                                 </CardHeader>
                                <AccordionContent>
                                    <CardDescription className="px-6 pb-4">Manage the final call to action section.</CardDescription>
                                    <CardContent className="space-y-4 pt-0">
                                    <FormField control={form.control} name="ctaTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="ctaSubtitle" render={({ field }) => (<FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField control={form.control} name="ctaImage" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Recommended size: 192x192 pixels.</FormDescription><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="ctaImageAiHint" render={({ field }) => (<FormItem><FormLabel>Image AI Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="ctaButtonText" render={({ field }) => (<FormItem><FormLabel>Button Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="ctaButtonLink" render={({ field }) => (<FormItem><FormLabel>Button Link</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        </div>
                                    </CardContent>
                                </AccordionContent>
                            </AccordionItem>
                        </Card>
                    </Accordion>
                    <Button type="submit">Save Changes</Button>
                </form>
            </Form>
        </div>
    );
}
