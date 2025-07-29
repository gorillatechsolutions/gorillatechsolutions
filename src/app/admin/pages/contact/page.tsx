
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
import { useContactSettings } from '@/contexts/contact-settings-context';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  metaTitle: z.string().min(1, 'Meta title is required.'),
  metaDescription: z.string().min(1, 'Meta description is required.'),
  metaKeywords: z.string().optional(),
  metaOgImage: z.string().url('Please enter a valid URL.'),
  heroTitle: z.string().min(1, 'Hero title is required.'),
  heroSubtitle: z.string().min(1, 'Hero subtitle is required.'),
  phone: z.string().min(1, 'Phone number is required.'),
  email: z.string().email('Please enter a valid email address.'),
  address: z.string().min(1, 'Address is required.'),
  zip: z.string().min(1, 'ZIP code is required.'),
  socialLinks: z.object({
    facebook: z.string().url('Please enter a valid URL.').or(z.literal('')),
    instagram: z.string().url('Please enter a valid URL.').or(z.literal('')),
    linkedin: z.string().url('Please enter a valid URL.').or(z.literal('')),
    whatsapp: z.string().url('Please enter a valid URL.').or(z.literal('')),
    telegram: z.string().url('Please enter a valid URL.').or(z.literal('')),
    googleMyBusiness: z.string().url('Please enter a valid URL.').or(z.literal('')),
    github: z.string().url('Please enter a valid URL.').or(z.literal('')),
  })
});

const defaultFormValues = {
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  metaOgImage: '',
  heroTitle: '',
  heroSubtitle: '',
  phone: '',
  email: '',
  address: '',
  zip: '',
  socialLinks: {
    facebook: '',
    instagram: '',
    linkedin: '',
    whatsapp: '',
    telegram: '',
    googleMyBusiness: '',
    github: '',
  }
};

export default function ContactSettingsPage() {
    const { settings, updateSettings, loading } = useContactSettings();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultFormValues,
    });
    
    useEffect(() => {
        if (!loading) {
            form.reset({
              ...defaultFormValues,
              ...settings,
              metaKeywords: settings.metaKeywords || '',
            });
        }
    }, [settings, loading, form]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateSettings(values);
        toast({
            title: 'Settings Saved!',
            description: 'Your contact information has been updated.',
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
                <h1 className="text-2xl font-bold text-foreground">Contact Page Settings</h1>
                <p className="text-muted-foreground">Update the content, contact details, and SEO metadata for your contact page.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <h3 className="text-lg font-medium">Hero Section</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                                <CardDescription className="pb-4">Update the headline and sub-headline for the contact page.</CardDescription>
                                <CardContent className="space-y-4 pt-0">
                                    <FormField control={form.control} name="heroTitle" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="heroSubtitle" render={({ field }) => (<FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </CardContent>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                             <AccordionTrigger>
                               <h3 className="text-lg font-medium">Business Details</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                               <CardDescription className="pb-4">Update your primary contact information.</CardDescription>
                               <CardContent className="space-y-4 pt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="zip" render={({ field }) => (<FormItem><FormLabel>ZIP/Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                </CardContent>
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-3">
                             <AccordionTrigger>
                               <h3 className="text-lg font-medium">Social Media Links</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                                <CardDescription className="pb-4">Enter the full URLs for your social media profiles.</CardDescription>
                                <CardContent className="space-y-4 pt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="socialLinks.facebook" render={({ field }) => (<FormItem><FormLabel>Facebook</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="socialLinks.instagram" render={({ field }) => (<FormItem><FormLabel>Instagram</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="socialLinks.linkedin" render={({ field }) => (<FormItem><FormLabel>LinkedIn</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="socialLinks.whatsapp" render={({ field }) => (<FormItem><FormLabel>WhatsApp</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="socialLinks.telegram" render={({ field }) => (<FormItem><FormLabel>Telegram</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="socialLinks.googleMyBusiness" render={({ field }) => (<FormItem><FormLabel>Google My Business</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="socialLinks.github" render={({ field }) => (<FormItem><FormLabel>GitHub</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                </CardContent>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                           <AccordionTrigger>
                               <h3 className="text-lg font-medium">SEO & Metadata</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                               <CardDescription className="pb-4">Update the page's metadata for search engines and social media.</CardDescription>
                               <CardContent className="space-y-4 pt-0">
                                    <FormField control={form.control} name="metaTitle" render={({ field }) => (<FormItem><FormLabel>Meta Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="metaDescription" render={({ field }) => (<FormItem><FormLabel>Meta Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="metaKeywords" render={({ field }) => (<FormItem><FormLabel>Meta Keywords</FormLabel><FormControl><Textarea {...field} placeholder="e.g., contact us, get in touch" /></FormControl><FormDescription>Enter keywords separated by commas.</FormDescription><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="metaOgImage" render={({ field }) => (<FormItem><FormLabel>Open Graph Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Recommended size: 1200x630 pixels.</FormDescription><FormMessage /></FormItem>)} />
                                </CardContent>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Button type="submit">Save Settings</Button>
                </form>
            </Form>
        </div>
    );
}
