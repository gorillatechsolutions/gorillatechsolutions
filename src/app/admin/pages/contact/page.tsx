
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
import { useContactSettings } from '@/contexts/contact-settings-context';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
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
            form.reset(settings);
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
                <h1 className="text-2xl font-bold text-foreground">Contact Information</h1>
                <p className="text-muted-foreground">Update the contact details displayed across your site.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Business Details</CardTitle>
                            <CardDescription>Update your primary contact information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="zip" render={({ field }) => (<FormItem><FormLabel>ZIP/Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Social Media Links</CardTitle>
                            <CardDescription>Enter the full URLs for your social media profiles.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                    </Card>

                    <Button type="submit">Save Settings</Button>
                </form>
            </Form>
        </div>
    );
}
