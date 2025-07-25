
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLegalPage } from '@/contexts/legal-page-context';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('@/components/admin/quill-editor'), { ssr: false });

const formSchema = z.object({
  privacyPolicy: z.string().min(100, 'Privacy Policy content must be at least 100 characters.'),
  termsAndConditions: z.string().min(100, 'Terms and Conditions content must be at least 100 characters.'),
});

export default function LegalSettingsPage() {
    const { content, updateContent, loading } = useLegalPage();
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

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
            title: 'Legal Pages Saved!',
            description: 'Your changes to the legal pages have been saved.',
        });
    };

    if (loading || !isClient) {
        return <div className="space-y-6">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Edit Legal Pages</h1>
                <p className="text-muted-foreground">Update the content for your Privacy Policy and Terms & Conditions pages.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Privacy Policy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="privacyPolicy"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <QuillEditor value={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage className="pt-2" />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Terms and Conditions</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <FormField
                                control={form.control}
                                name="termsAndConditions"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <QuillEditor value={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage className="pt-2" />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Button type="submit">Save Changes</Button>
                </form>
            </Form>
        </div>
    );
}
