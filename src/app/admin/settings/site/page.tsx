
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
import { useSiteSettings } from '@/contexts/site-settings-context';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  headerLogo: z.string().url('Please enter a valid URL.'),
  footerLogo: z.string().url('Please enter a valid URL.'),
  favicon: z.string().url('Please enter a valid URL.'),
  copyrightText: z.string().min(1, 'Copyright text is required.'),
  ogImage: z.string().url('Please enter a valid URL.'),
  metaDescription: z.string().min(1, 'Meta description is required.'),
  metaKeywords: z.string().optional(),
  googleSiteVerification: z.string().optional(),
  bingSiteVerification: z.string().optional(),
  robotsTxt: z.string().optional(),
  sourceCodeLink: z.string().url('Please enter a valid URL.'),
});

export default function SiteSettingsPage() {
    const { settings, updateSettings, loading } = useSiteSettings();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...settings,
            metaKeywords: settings.metaKeywords || '',
            googleSiteVerification: settings.googleSiteVerification || '',
            bingSiteVerification: settings.bingSiteVerification || '',
            robotsTxt: settings.robotsTxt || '',
        },
    });
    
    useEffect(() => {
        if (!loading) {
            form.reset({
                ...settings,
                metaKeywords: settings.metaKeywords || '',
                googleSiteVerification: settings.googleSiteVerification || '',
                bingSiteVerification: settings.bingSiteVerification || '',
                robotsTxt: settings.robotsTxt || '',
            });
        }
    }, [settings, loading, form]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateSettings(values);
        toast({
            title: 'Settings Saved!',
            description: 'Your global site settings have been updated.',
        });
    };

    if (loading) {
        return <div className="space-y-6">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
                <p className="text-muted-foreground">Manage global branding, SEO, and integrations for your website.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Branding &amp; General</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="multiple" defaultValue={['branding']} className="w-full space-y-4">
                                <AccordionItem value="branding" className="border-b-0">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-medium">Branding &amp; Logos</h3>
                                </AccordionTrigger>
                                    <AccordionContent>
                                        <CardDescription className="px-6 pb-4">Update your site's logos and favicon.</CardDescription>
                                        <CardContent className="space-y-4 pt-0">
                                            <FormField control={form.control} name="headerLogo" render={({ field }) => (<FormItem><FormLabel>Header Logo URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="footerLogo" render={({ field }) => (<FormItem><FormLabel>Footer Logo URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="favicon" render={({ field }) => (<FormItem><FormLabel>Favicon URL (.ico, .svg, .png)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="copyrightText" render={({ field }) => (<FormItem><FormLabel>Footer Copyright Text</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Use {'{year}'} to automatically insert the current year.</FormDescription><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="sourceCodeLink" render={({ field }) => (<FormItem><FormLabel>Footer Source Code Link</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>URL for the 'Download Source Code' button.</FormDescription><FormMessage /></FormItem>)} />
                                        </CardContent>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>SEO &amp; Webmaster Tools</CardTitle></CardHeader>
                        <CardContent>
                            <Accordion type="multiple" defaultValue={['seo']} className="w-full space-y-4">
                                <AccordionItem value="seo" className="border-b-0">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-medium">Global SEO &amp; Metadata</h3>
                                </AccordionTrigger>
                                    <AccordionContent>
                                        <CardDescription className="px-6 pb-4">Set default metadata for pages that don't have their own.</CardDescription>
                                        <CardContent className="space-y-4 pt-0">
                                            <FormField control={form.control} name="ogImage" render={({ field }) => (<FormItem><FormLabel>Default Open Graph Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>This image is used when sharing links on social media. Recommended size: 1200x630px.</FormDescription><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="metaDescription" render={({ field }) => (<FormItem><FormLabel>Default Meta Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormDescription>A concise summary for search engine results.</FormDescription><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="metaKeywords" render={({ field }) => (<FormItem><FormLabel>Default Meta Keywords</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Comma-separated keywords for search engines.</FormDescription><FormMessage /></FormItem>)} />
                                        </CardContent>
                                    </AccordionContent>
                                </AccordionItem>
                                
                                <AccordionItem value="integrations" className="border-b-0">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-medium">Webmaster Tools</h3>
                                </AccordionTrigger>
                                <AccordionContent>
                                        <CardDescription className="px-6 pb-4">Integrate with search engine webmaster tools for site verification.</CardDescription>
                                        <CardContent className="space-y-4 pt-0">
                                            <FormField control={form.control} name="googleSiteVerification" render={({ field }) => (<FormItem><FormLabel>Google Site Verification Code</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Enter the content attribute from Google's meta tag.</FormDescription><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="bingSiteVerification" render={({ field }) => (<FormItem><FormLabel>Bing Site Verification Code</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Enter the content attribute from Bing's meta tag.</FormDescription><FormMessage /></FormItem>)} />
                                        </CardContent>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="robots" className="border-b-0">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-medium">Robots.txt</h3>
                                </AccordionTrigger>
                                <AccordionContent>
                                        <CardDescription className="px-6 pb-4">Manage the content of your `robots.txt` file to control search engine crawlers.</CardDescription>
                                        <CardContent className="space-y-4 pt-0">
                                            <FormField control={form.control} name="robotsTxt" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>robots.txt Content</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} className="h-48 font-mono text-xs" />
                                                    </FormControl>
                                                    <FormDescription>Note: Changes may require a server restart to take effect on a live site.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </CardContent>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                    <Button type="submit">Save Settings</Button>
                </form>
            </Form>
        </div>
    );
}
