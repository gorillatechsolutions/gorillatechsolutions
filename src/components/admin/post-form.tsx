
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
import { useEffect, useState }from 'react';
import dynamic from 'next/dynamic';
import { generateArticle } from '@/ai/flows/generate-article-flow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const QuillEditor = dynamic(() => import('@/components/admin/quill-editor'), { ssr: false });


const formSchema = z.object({
  id: z.string(),
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  slug: z.string().min(5, 'Slug must be at least 5 characters.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters.').max(200, 'Excerpt must not exceed 200 characters.'),
  image: z.string().url('Please enter a valid image URL.'),
  tags: z.string().min(1, 'Please enter at least one tag.'),
  author: z.string().min(2, 'Author name is required.'),
  content: z.string().min(100, 'Content must be at least 100 characters.'),
  views: z.coerce.number().int().min(0, 'Views must be a non-negative number.'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  ogImage: z.string().url('Please enter a valid image URL.').optional().or(z.literal('')),
});

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


  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: postToEdit ? {
      ...postToEdit,
      tags: postToEdit.tags.join(', '),
      ogImage: postToEdit.ogImage || '',
      metaTitle: postToEdit.metaTitle || '',
      metaDescription: postToEdit.metaDescription || '',
      metaKeywords: postToEdit.metaKeywords || '',
    } : {
      id: `cs_${new Date().getTime()}`,
      title: '',
      slug: '',
      excerpt: '',
      image: 'https://placehold.co/1200x600.png',
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
    if (postToEdit) {
      form.reset({
        ...postToEdit,
        tags: postToEdit.tags.join(', '),
        ogImage: postToEdit.ogImage || '',
        metaTitle: postToEdit.metaTitle || '',
        metaDescription: postToEdit.metaDescription || '',
        metaKeywords: postToEdit.metaKeywords || '',
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
    const postData: CaseStudy = {
      ...values,
      date: postToEdit?.date || new Date().toISOString(),
      dataAiHint: postToEdit?.dataAiHint || 'custom article content',
      tags: values.tags.split(',').map(tag => tag.trim()),
    };

    if (postToEdit) {
      if (postData.slug !== postToEdit.slug && slugExists(postData.slug)) {
          form.setError('slug', { type: 'manual', message: 'This slug is already taken.' });
          return;
      }
      // Use the ID from the form values, not the stale closure prop
      updateCaseStudy(values.id, postData);
      toast({
        title: 'Post Updated!',
        description: 'Your case study has been successfully updated.',
      });
    } else {
      if (slugExists(postData.slug)) {
          form.setError('slug', { type: 'manual', message: 'This slug is already taken.' });
          return;
      }
      addCaseStudy(postData);
      toast({
        title: 'Post Created!',
        description: 'Your new case study has been successfully created.',
      });
    }

    router.push('/admin/posts');
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
                                    <Button type="button" variant="link" size="sm" className="p-0 h-auto" onClick={generateSlug}>Generate from title</Button>
                                </div>
                                <FormControl>
                                    <Input placeholder="how-we-tripled-traffic" {...field} />
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
                            
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Header Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://placehold.co/1200x600.png" {...field} />
                                    </FormControl>
                                    <FormDescription>Recommended size: 1200x600 pixels.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
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
                                      <FormField control={form.control} name="ogImage" render={({ field }) => (<FormItem><FormLabel>Open Graph Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Recommended size: 1200x630 pixels.</FormDescription><FormMessage /></FormItem>)} />
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
