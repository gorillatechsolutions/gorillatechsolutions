
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css'; // import styles
import type { CaseStudy } from '@/types/case-study';
import dynamic from 'next/dynamic';
import { useCaseStudy } from '@/contexts/case-study-context';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  slug: z.string().min(5, 'Slug must be at least 5 characters.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters.').max(200, 'Excerpt must not exceed 200 characters.'),
  image: z.string().url('Please enter a valid image URL.'),
  tags: z.string().min(1, 'Please enter at least one tag.'),
  author: z.string().min(2, 'Author name is required.'),
  content: z.string().min(100, 'Content must be at least 100 characters.'),
});

type PostFormProps = {
  postToEdit?: CaseStudy;
};

export function PostForm({ postToEdit }: PostFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { addCaseStudy, updateCaseStudy, slugExists } = useCaseStudy();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: postToEdit ? {
        ...postToEdit,
        tags: postToEdit.tags.join(', ')
    } : {
      title: '',
      slug: '',
      excerpt: '',
      image: 'https://placehold.co/1200x600.png',
      tags: '',
      author: '',
      content: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const postData = {
      ...values,
      tags: values.tags.split(',').map(tag => tag.trim()),
      date: postToEdit ? postToEdit.date : new Date().toISOString(),
      views: postToEdit ? postToEdit.views : Math.floor(Math.random() * 5000),
      dataAiHint: 'custom article content',
    };

    if (postToEdit) {
      // Update existing post
      updateCaseStudy(postToEdit.slug, postData);
      toast({
        title: 'Post Updated!',
        description: 'Your case study has been successfully updated.',
      });
    } else {
      // Create new post
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

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };
  
  const generateSlug = () => {
      const title = form.getValues('title');
      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      form.setValue('slug', slug, { shouldValidate: true });
  }

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{postToEdit ? 'Edit Post' : 'Create New Post'}</CardTitle>
          <CardDescription>Fill out the details below to {postToEdit ? 'update the' : 'create a new'} case study.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Header Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://placehold.co/1200x600.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
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
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Content</FormLabel>
                    <FormControl>
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={quillModules}
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage className="pt-2" />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="submit">{postToEdit ? 'Update Post' : 'Publish Post'}</Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
