
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
import type { CaseStudy } from '@/types/case-study';
import { useCaseStudy } from '@/contexts/case-study-context';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { generateArticle } from '@/ai/flows/generate-article-flow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStorage } from '@/contexts/storage-context';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Label } from '@/components/ui/label';

const QuillEditor = dynamic(() => import('@/components/admin/quill-editor'), { ssr: false });

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  slug: z.string().min(5, 'Slug must be at least 5 characters.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters.').max(200, 'Excerpt must not exceed 200 characters.'),
  image: z.string().url('Please enter a valid image URL.'),
  dataAiHint: z.string().min(1, 'AI hint is required.'),
  tags: z.string().min(1, 'Please enter at least one tag.'),
  author: z.string().min(2, 'Author name is required.'),
  content: z.string().min(100, 'Content must be at least 100 characters.'),
  views: z.coerce.number().nonnegative('Views must be a non-negative number.'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  ogImage: z.string().url('Please enter a valid image URL.').optional().or(z.literal('')),
});

type PostFormValues = z.infer<typeof formSchema>;
type ImageFieldKey = "image" | "ogImage";


const ImageSelectionDialog = ({
    form,
    field,
    title,
    description,
}: {
    form: ReturnType<typeof useForm<PostFormValues>>;
    field: ImageFieldKey;
    title: string;
    description: string;
}) => {
    const [open, setOpen] = useState(false);
    const { files: storageFiles } = useStorage();
    const [tempUrl, setTempUrl] = useState(form.getValues(field));

    const imageFiles = useMemo(() => storageFiles.filter(f => f.type.startsWith('image/')), [storageFiles]);

    const handleSave = () => {
        form.setValue(field, tempUrl, { shouldValidate: true });
        setOpen(false);
    };
    
    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            setTempUrl(form.getValues(field));
        }
        setOpen(isOpen);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline">Select Image</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="storage">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="storage">Select from Storage</TabsTrigger>
                        <TabsTrigger value="url">Image URL</TabsTrigger>
                    </TabsList>
                    <TabsContent value="storage" className="pt-4">
                        <ScrollArea className="h-64">
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pr-4">
                                {imageFiles.map(file => (
                                    <button
                                        key={file.id}
                                        type="button"
                                        className={cn(
                                            "relative aspect-video rounded-md overflow-hidden border-2 transition-all",
                                            tempUrl === file.url ? 'border-primary ring-2 ring-primary' : 'border-transparent'
                                        )}
                                        onClick={() => setTempUrl(file.url)}
                                    >
                                        <Image src={file.url} alt={file.name} layout="fill" objectFit="cover" />
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="url" className="pt-4">
                         <div className="space-y-2">
                            <Label htmlFor="image-url">Image URL</Label>
                            <Input
                                id="image-url"
                                value={tempUrl}
                                onChange={(e) => setTempUrl(e.target.value)}
                                placeholder="https://example.com/image.png"
                            />
                         </div>
                    </TabsContent>
                </Tabs>
                <DialogFooter className="pt-4">
                    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="button" onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


type PostFormProps = {
  postToEdit?: CaseStudy;
};

export function PostForm({ postToEdit }: PostFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { addCaseStudy, updateCaseStudy, slugExists } = useCaseStudy();
  const [isClient, setIsClient] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: postToEdit ? {
      ...postToEdit,
      tags: postToEdit.tags.join(', '),
      metaTitle: postToEdit.metaTitle || '',
      metaDescription: postToEdit.metaDescription || '',
      metaKeywords: postToEdit.metaKeywords || '',
      ogImage: postToEdit.ogImage || 'https://placehold.co/1200x630.png',
    } : {
      title: '',
      slug: '',
      excerpt: '',
      image: 'https://placehold.co/1200x600.png',
      dataAiHint: 'custom',
      ogImage: 'https://placehold.co/1200x630.png',
      tags: '',
      author: '',
      content: '',
      views: 0,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
    },
  });
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // This effect correctly resets the form ONLY when the postToEdit prop's slug changes.
  useEffect(() => {
    if (postToEdit) {
      form.reset({
        ...postToEdit,
        tags: postToEdit.tags.join(', '),
        metaTitle: postToEdit.metaTitle || '',
        metaDescription: postToEdit.metaDescription || '',
        metaKeywords: postToEdit.metaKeywords || '',
        ogImage: postToEdit.ogImage || 'https://placehold.co/1200x630.png',
      });
    }
  }, [postToEdit, form]);

  const handleGenerateArticle = async () => {
    if (!aiTopic) {
        toast({
            variant: "destructive",
            title: 'Topic is required',
            description: 'Please enter a topic to generate an article.',
        });
        return;
    }
    
    setIsGenerating(true);
    try {
        const result = await generateArticle({ topic: aiTopic });
        form.setValue('title', result.title, { shouldValidate: true });
        form.setValue('excerpt', result.excerpt, { shouldValidate: true });
        form.setValue('content', result.articleContent, { shouldValidate: true });
        form.setValue('metaTitle', result.title, { shouldValidate: true });
        form.setValue('metaDescription', result.excerpt, { shouldValidate: true });
        toast({
            title: 'Article Generated!',
            description: 'The AI-generated content has been added to the form.',
        });
    } catch (error) {
        console.error('Error generating article:', error);
        toast({
            variant: "destructive",
            title: 'Generation Failed',
            description: 'An error occurred while generating the article. Please try again.',
        });
    } finally {
        setIsGenerating(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const postData: Partial<CaseStudy> = {
      ...values,
      tags: values.tags.split(',').map(tag => tag.trim()),
    };

    if (postToEdit) {
      // Use the original slug for updating, in case it was changed in the form
      updateCaseStudy(postToEdit.slug, postData);
      toast({
        title: 'Post Updated!',
        description: 'Your case study has been successfully updated.',
      });
    } else {
      if (slugExists(values.slug)) {
          form.setError('slug', { type: 'manual', message: 'This slug is already taken.' });
          return;
      }
      const newPost: CaseStudy = { 
        ...postData, 
        id: `cs_${new Date().getTime()}`, 
        date: new Date().toISOString() 
      } as CaseStudy;
      addCaseStudy(newPost);
      toast({
        title: 'Post Created!',
        description: 'Your new case study has been successfully created.',
      });
    }

    router.push('/admin/posts');
    router.refresh(); // Force a refresh to ensure data is up-to-date
  }

  const generateSlug = () => {
      const title = form.getValues('title');
      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      form.setValue('slug', slug, { shouldValidate: true });
  }

  return (
    <div className="space-y-6">
       <CardHeader className="px-0">
          <CardTitle>{postToEdit ? 'Edit Post' : 'Create New Post'}</CardTitle>
          <CardDescription>Fill out the details below to {postToEdit ? 'update the' : 'create a new'} case study.</CardDescription>
        </CardHeader>
        
      {!postToEdit && (
        <Card>
            <CardHeader>
                <CardTitle>AI Content Generation</CardTitle>
                <CardDescription>
                    Provide a topic, and our AI will generate a title, excerpt, and full article content for you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                        placeholder="e.g., 'How to improve SEO for a small business'"
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        className="flex-grow"
                        disabled={isGenerating}
                    />
                    <Button type="button" onClick={handleGenerateArticle} disabled={isGenerating}>
                        {isGenerating ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faMagic} className="mr-2 h-4 w-4" />
                                Generate Article
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
      )}

      
            
            {isClient && (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-6">
                            <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Post Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="How We Tripled Organic Traffic..." {...field} />
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
                                    {!postToEdit && (
                                      <Button type="button" variant="link" size="sm" className="p-0 h-auto" onClick={generateSlug}>Generate from title</Button>
                                    )}
                                </div>
                                <FormControl>
                                    <Input placeholder="how-we-tripled-traffic" {...field} disabled={!!postToEdit} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Excerpt</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A short summary of the case study..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Header Image</FormLabel>
                                            <div className="flex items-center gap-4">
                                                <Image src={field.value} alt="Header Image Preview" width={100} height={50} className="rounded-md bg-muted p-1 object-cover" />
                                                <Input {...field} readOnly className="flex-1" />
                                                 <ImageSelectionDialog 
                                                    form={form} 
                                                    field="image" 
                                                    title="Select Header Image" 
                                                    description="Recommended size: 1200x600 pixels." 
                                                />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dataAiHint"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Image AI Hint</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., 'data chart'" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                             </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                    <FormLabel>Tags (comma-separated)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="SEO, eCommerce, Growth" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Author Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Jane Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="views"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Post Views</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                            <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Post Content</FormLabel>
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
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="seo" className="border-b-0">
                              <CardHeader>
                                <AccordionTrigger>
                                    <h3 className="text-lg font-medium">SEO & Metadata</h3>
                                </AccordionTrigger>
                              </CardHeader>
                              <AccordionContent>
                                  <CardDescription className="px-6 pb-4">Update the metadata for search engines.</CardDescription>
                                  <CardContent className="space-y-4 pt-0">
                                      <FormField control={form.control} name="metaTitle" render={({ field }) => (<FormItem><FormLabel>Meta Title</FormLabel><FormControl><Input placeholder="A catchy title for search engines" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                      <FormField control={form.control} name="metaDescription" render={({ field }) => (<FormItem><FormLabel>Meta Description</FormLabel><FormControl><Textarea placeholder="A concise description for search snippets" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                      <FormField control={form.control} name="metaKeywords" render={({ field }) => (<FormItem><FormLabel>Meta Keywords</FormLabel><FormControl><Textarea {...field} placeholder="e.g., case study, seo, results" /></FormControl><FormDescription>Enter keywords separated by commas.</FormDescription><FormMessage /></FormItem>)} />
                                      <FormField control={form.control} name="ogImage" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Open Graph Image</FormLabel>
                                            <div className="flex items-center gap-4">
                                                <Image src={field.value || 'https://placehold.co/1200x630.png'} alt="Open Graph Preview" width={120} height={63} className="rounded-md bg-muted p-1 object-cover" />
                                                <Input {...field} readOnly className="flex-1" />
                                                 <ImageSelectionDialog 
                                                    form={form} 
                                                    field="ogImage" 
                                                    title="Select Open Graph Image" 
                                                    description="Recommended size: 1200x630 pixels." 
                                                />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                      )} />
                                  </CardContent>
                              </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                    </Card>
                    
                    <div className="flex gap-4">
                    <Button type="submit">{postToEdit ? 'Update Post' : 'Publish Post'}</Button>
                    <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                    </div>
                </form>
                </Form>
            )}
            
    </div>
  );
}
