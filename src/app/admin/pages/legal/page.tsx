
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { generateLegalPage } from '@/ai/flows/generate-legal-page-flow';

const QuillEditor = dynamic(() => import('@/components/admin/quill-editor'), { ssr: false });

type LegalPageKey = "privacyPolicy" | "termsAndConditions" | "disclaimer" | "refundPolicy";

const formSchema = z.object({
  privacyPolicy: z.string().min(100, 'Privacy Policy content must be at least 100 characters.'),
  termsAndConditions: z.string().min(100, 'Terms and Conditions content must be at least 100 characters.'),
  disclaimer: z.string().min(100, 'Disclaimer content must be at least 100 characters.'),
  refundPolicy: z.string().min(100, 'Refund Policy content must be at least 100 characters.'),
});

const pageOptions: { value: LegalPageKey; label: string }[] = [
    { value: 'privacyPolicy', label: 'Privacy Policy' },
    { value: 'termsAndConditions', label: 'Terms and Conditions' },
    { value: 'disclaimer', label: 'Disclaimer' },
    { value: 'refundPolicy', label: 'Refund Policy' },
];

export default function LegalSettingsPage() {
    const { content, updateContent, loading } = useLegalPage();
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);
    const [selectedPage, setSelectedPage] = useState<LegalPageKey>('privacyPolicy');
    const [isGenerating, setIsGenerating] = useState(false);
    const [companyName, setCompanyName] = useState('Gorilla Tech Solutions');
    const [websiteUrl, setWebsiteUrl] = useState('https://gorillatechsolution.com');


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

    const handleGenerate = async () => {
        if (!companyName || !websiteUrl) {
            toast({
                variant: 'destructive',
                title: 'Company details required',
                description: 'Please enter a company name and website URL.',
            });
            return;
        }

        setIsGenerating(true);
        try {
            const pageType = pageOptions.find(p => p.value === selectedPage)?.label || '';
            const result = await generateLegalPage({
                pageType,
                companyName,
                websiteUrl,
            });
            form.setValue(selectedPage, result.content, { shouldValidate: true });
            toast({
                title: 'Content Generated!',
                description: `Your ${pageType} has been generated and populated in the editor.`,
            });
        } catch (error) {
            console.error('Error generating legal page:', error);
            toast({
                variant: "destructive",
                title: 'Generation Failed',
                description: 'An error occurred while generating the content. Please try again.',
            });
        } finally {
            setIsGenerating(false);
        }
    };


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateContent(values);
        toast({
            title: 'Legal Pages Saved!',
            description: 'Your changes to the legal pages have been saved.',
        });
    };
    
    const renderSelectedEditor = () => {
        const selectedOption = pageOptions.find(p => p.value === selectedPage);
        if (!selectedOption) return null;

        return (
             <Card key={selectedPage}>
                <CardHeader>
                    <CardTitle>{selectedOption.label}</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormField
                        control={form.control}
                        name={selectedOption.value}
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
        )
    }

    if (loading || !isClient) {
        return <div className="space-y-6">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-12 w-1/2 mb-4" />
            <Skeleton className="h-64 w-full" />
        </div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Edit Legal Pages</h1>
                <p className="text-muted-foreground">Select a page from the dropdown to edit its content.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>AI Content Generation</CardTitle>
                    <CardDescription>
                        Provide your company details, select a page, and our AI will generate the content for you.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                placeholder="e.g., Your Company LLC"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                disabled={isGenerating}
                            />
                        </div>
                        <div>
                            <Label>Website URL</Label>
                            <Input
                                placeholder="e.g., https://yourcompany.com"
                                value={websiteUrl}
                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                disabled={isGenerating}
                            />
                        </div>
                    </div>
                     <Button type="button" onClick={handleGenerate} disabled={isGenerating}>
                        {isGenerating ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="mr-2 h-4 w-4 animate-spin" />
                                Generating for {pageOptions.find(p => p.value === selectedPage)?.label}...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faMagic} className="mr-2 h-4 w-4" />
                                Generate with AI
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="max-w-sm">
                        <Select onValueChange={(value: LegalPageKey) => setSelectedPage(value)} defaultValue={selectedPage}>
                            <FormLabel>Select Page to Edit</FormLabel>
                            <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select a page" />
                            </SelectTrigger>
                            <SelectContent>
                                {pageOptions.map(option => (
                                     <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {renderSelectedEditor()}

                    <Button type="submit">Save Changes</Button>
                </form>
            </Form>
        </div>
    );
}
