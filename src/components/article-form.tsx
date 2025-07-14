
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CaseStudy } from "@/types/case-study";
import { generateArticleContent } from "@/ai/flows/article-generator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TiptapEditor } from './tiptap-editor';

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }),
  excerpt: z.string().optional(),
  tags: z.string().optional(),
  author: z.string().optional(),
  dataAiHint: z.string().optional(),
  image: z.any().optional(),
});


export function ArticleForm({ existingArticle }: { existingArticle?: CaseStudy }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiPending, setIsAiPending] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(existingArticle?.image || null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: existingArticle?.title || "",
      content: existingArticle?.content || "",
      excerpt: existingArticle?.excerpt || "",
      tags: existingArticle?.tags.join(', ') || "",
      author: existingArticle?.author || "Admin",
      dataAiHint: existingArticle?.dataAiHint || "",
      image: existingArticle?.image || null,
    },
  });

  const { watch, setValue } = form;
  const watchedTitle = watch('title');

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setImageFile(file);
          const previewUrl = await readFileAsDataURL(file);
          setImagePreview(previewUrl);
      }
  };

  const handleGenerateContent = async () => {
    if (!watchedTitle) {
      toast({
        title: "Title needed",
        description: "Please enter a title first to generate content.",
        variant: 'destructive',
      });
      return;
    }
    setIsAiPending(true);
    try {
      const result = await generateArticleContent({ topic: watchedTitle });
      
      const htmlContent = result.articleContent.split('\n\n').map(paragraph => {
        if (paragraph.startsWith('### ')) {
            return `<h3>${paragraph.substring(4)}</h3>`;
        }
        if (paragraph.startsWith('## ')) {
            return `<h2>${paragraph.substring(3)}</h2>`;
        }
        if (paragraph.startsWith('* ')) {
            return `<ul><li>${paragraph.substring(2)}</li></ul>`;
        }
        return `<p>${paragraph}</p>`;
      }).join('');

      setValue('content', htmlContent, { shouldValidate: true });
      
      toast({
        title: "Content Generated!",
        description: "AI has drafted the article content for you.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: "AI Generation Failed",
        description: "Could not generate content. Please try again.",
      });
    } finally {
      setIsAiPending(false);
    }
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
        const storedArticlesRaw = localStorage.getItem('articles');
        let articles: CaseStudy[] = storedArticlesRaw ? JSON.parse(storedArticlesRaw) : [];
        const slug = values.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        let imageUrl = existingArticle?.image || 'https://placehold.co/1200x600.png';
        if (imageFile) {
            imageUrl = await readFileAsDataURL(imageFile);
        }
        
        const articleData: CaseStudy = {
            ...existingArticle,
            slug,
            title: values.title,
            content: values.content,
            excerpt: values.excerpt || "",
            tags: values.tags?.split(',').map(tag => tag.trim()).filter(Boolean) || [],
            author: values.author || "Admin",
            dataAiHint: values.dataAiHint || "",
            image: imageUrl,
            date: existingArticle?.date || new Date().toISOString(),
            views: existingArticle?.views || Math.floor(Math.random() * 500),
        };
        
        if (existingArticle) {
            // Update existing article
            articles = articles.map(a => a.slug === existingArticle.slug ? articleData : a);
        } else {
            // Create new article
             if (articles.some(a => a.slug === slug)) {
                toast({
                    title: "Error",
                    description: "An article with this title already exists.",
                    variant: "destructive"
                });
                setIsSubmitting(false);
                return;
            }
            articles.unshift(articleData);
        }

        localStorage.setItem('articles', JSON.stringify(articles));

        toast({
            title: existingArticle ? "Article Updated!" : "Article Created!",
            description: `Your article "${values.title}" has been saved.`,
        });

        router.push('/dashboard/articles');
        router.refresh();

    } catch (error) {
        console.error("Failed to save article:", error);
        toast({
            variant: "destructive",
            title: "An Error Occurred",
            description: "Could not save your article. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col">
            <header className="p-4 border-b bg-background flex justify-between items-center gap-4 sticky top-0 z-10">
                 <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-xl font-bold font-headline">{existingArticle ? 'Edit Article' : 'Create New Article'}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button type="submit" disabled={isSubmitting || isAiPending}>
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {isSubmitting ? 'Saving...' : 'Save Article'}
                    </Button>
                </div>
            </header>

            <div className="flex-1 grid lg:grid-cols-[1fr_380px] gap-4 p-4 overflow-y-auto">
                {/* Main Content: Editor */}
                <div className="flex flex-col gap-4">
                     <Card>
                        <CardContent className="p-4">
                             <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your Amazing Article Title"
                                            className="text-2xl font-bold font-headline tracking-tight h-auto p-2"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                     </Card>
                    <Card className="flex-1">
                        <CardContent className="p-4 h-full">
                           <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem className="h-full flex flex-col">
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <TiptapEditor
                                                content={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>AI Tools</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                             <div>
                                <Button type="button" variant="outline" className="w-full" onClick={handleGenerateContent} disabled={isAiPending || isSubmitting}>
                                    {isAiPending ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Sparkles className="mr-2 h-4 w-4" />
                                    )}
                                    Generate Content with AI
                                </Button>
                                <p className="text-xs text-muted-foreground mt-2">Uses the article title to generate content.</p>
                             </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Article Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-4">
                            <FormField
                                control={form.control}
                                name="excerpt"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Excerpt</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="A short summary of the article..."
                                        className="mt-1"
                                        {...field}
                                        />
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
                                        <Input
                                        placeholder="e.g. SEO, Growth"
                                        className="mt-1"
                                        {...field}
                                        />
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
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder="e.g. John Doe"
                                        className="mt-1"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Featured Image</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-4">
                             {imagePreview && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={imagePreview} alt="Image preview" className="w-full h-auto rounded-md" />
                            )}
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Upload Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="mt-1"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="dataAiHint"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Image AI Hint (Optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder="e.g. marketing analytics"
                                        className="mt-1"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    </Form>
  );
}
