
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
import { Save, Sparkles, Loader2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CaseStudy } from "@/types/case-study";
import { generateArticleContent } from "@/ai/flows/article-generator";
import { Card, CardContent } from "./ui/card";
import { TiptapEditor } from "./tiptap-editor";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z.string().optional(),
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
      
      // Tiptap expects HTML, so we need a basic markdown-to-html conversion
      const htmlContent = result.articleContent
        .split('\n')
        .map(line => {
          if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
          if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
          if (line.trim() === '') return '<br>';
          return `<p>${line}</p>`;
        })
        .join('');

      setValue('content', htmlContent);
      
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
            content: values.content || "",
            excerpt: values.excerpt || "",
            tags: values.tags?.split(',').map(tag => tag.trim()) || [],
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
                <h1 className="text-xl font-bold font-headline">{existingArticle ? 'Edit Article' : 'Create New Article'}</h1>
                <div className="flex items-center gap-2">
                    <Button type="submit" disabled={isSubmitting || isAiPending}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? 'Saving...' : 'Save Article'}
                    </Button>
                </div>
            </header>

            <div className="flex-1 grid lg:grid-cols-[1fr_380px] gap-4 p-4 overflow-y-auto">
                {/* Main Content: Editor */}
                <Card className="flex flex-col">
                    <CardContent className="p-4 flex-1 flex flex-col gap-4">
                         <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Article Title"
                                        className="text-2xl font-bold font-headline tracking-tight h-auto p-2"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex-1 h-full min-h-[400px]">
                           <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem className="h-full flex flex-col">
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <TiptapEditor 
                                              content={field.value || ''} 
                                              onChange={field.onChange} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar */}
                <div className="space-y-4">
                    <Card>
                        <CardContent className="p-4 space-y-4">
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
                        <CardContent className="p-4 space-y-4">
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
                        <CardContent className="p-4 space-y-4">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Featured Image</FormLabel>
                                    <FormControl>
                                        <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            field.onChange(e.target.files);
                                            setImageFile(e.target.files ? e.target.files[0] : null);
                                        }}
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
