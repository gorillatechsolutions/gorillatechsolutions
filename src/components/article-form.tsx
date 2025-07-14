
"use client";

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
import { useToast } from "@/hooks/use-toast";
import { Save, Sparkles, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CaseStudy } from "@/types/case-study";
import React, { useState, useTransition, useMemo } from "react";
import { generateArticleContent } from "@/ai/flows/article-generator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import dynamic from 'next/dynamic';

// Import Quill's CSS
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  () => import('react-quill'), 
  { ssr: false }
);

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters.").max(300, "Excerpt must be less than 300 characters."),
  content: z.string().min(50, "Content must be at least 50 characters."),
  tags: z.string().min(1, "Please provide at least one tag."),
  author: z.string().min(2, "Author name is required."),
  image: z.any(),
  dataAiHint: z.string().optional(),
  views: z.coerce.number().min(0, "Views must be a positive number.").optional(),
});

type ArticleFormProps = {
    existingArticle?: CaseStudy;
};

export function ArticleForm({ existingArticle }: ArticleFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isAiPending, startAiTransition] = useTransition();
  const [isAiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: existingArticle?.title || "",
      excerpt: existingArticle?.excerpt || "",
      content: existingArticle?.content || "",
      tags: existingArticle?.tags.join(', ') || "",
      author: existingArticle?.author || "Admin",
      image: existingArticle?.image || "",
      dataAiHint: existingArticle?.dataAiHint || "",
      views: existingArticle?.views || Math.floor(Math.random() * 500),
    },
  });

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const storedArticlesRaw = localStorage.getItem('articles');
        let articles: CaseStudy[] = storedArticlesRaw ? JSON.parse(storedArticlesRaw) : [];

        const slug = values.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        let imageUrl = existingArticle?.image || 'https://placehold.co/1200x600.png';
        if (values.image && values.image.length > 0) {
            const file = values.image[0];
            if (file instanceof File) {
                 imageUrl = await readFileAsDataURL(file);
            }
        }

        const articleData = {
            ...values,
            slug: existingArticle ? existingArticle.slug : slug,
            tags: values.tags.split(',').map(tag => tag.trim()),
            image: imageUrl,
            date: new Date().toISOString(),
            views: values.views || 0,
            content: values.content,
        };

        if (existingArticle) {
            const articleIndex = articles.findIndex(a => a.slug === existingArticle.slug);
            if (articleIndex > -1) {
                articles[articleIndex] = { ...articles[articleIndex], ...articleData };
            }
        } else {
             if (articles.some(a => a.slug === slug)) {
                toast({
                    title: "Error",
                    description: "An article with this title already exists. Please choose a unique title.",
                    variant: "destructive"
                });
                return;
            }
            articles.unshift(articleData);
        }
        
        localStorage.setItem('articles', JSON.stringify(articles));

        toast({
            title: `Article ${existingArticle ? 'Updated' : 'Created'}!`,
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
    }
  }
  
  const handleGenerateContent = () => {
    startAiTransition(async () => {
        try {
            const result = await generateArticleContent({ topic: aiTopic });
            // Convert markdown to basic HTML for the editor
            const htmlContent = result.articleContent
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                .replace(/\*(.*)\*/gim, '<em>$1</em>')
                .replace(/(\r\n|\n){2,}/g, '</p><p>')
                .replace(/(\r\n|\n)/g, '<br/>');

            form.setValue('content', `<p>${htmlContent}</p>`, { shouldValidate: true, shouldDirty: true });

            setAiDialogOpen(false);
            setAiTopic('');
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
        }
    });
  };
  
  const fileRef = form.register("image");

  const QuillEditor = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Article Title</FormLabel>
              <FormControl><Input placeholder="e.g., How We Tripled Organic Traffic" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt / Subtitle</FormLabel>
              <FormControl><Textarea placeholder="A short summary of the article (under 300 characters)." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
            <FormLabel>Full Content</FormLabel>
            <Button type="button" variant="outline" size="sm" onClick={() => setAiDialogOpen(true)}>
                <Sparkles className="h-4 w-4 mr-1" /> Generate with AI
            </Button>
          </div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
                <FormItem>
                    {/* The FormControl wrapper is removed here to prevent conflicts */}
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      className="bg-card"
                    />
                    <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Tags (comma-separated)</FormLabel>
                <FormControl><Input placeholder="e.g., SEO, PPC, Content Marketing" {...field} /></FormControl>
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
                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="views"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Post Views</FormLabel>
                <FormControl><Input type="number" placeholder="e.g., 1500" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="image"
            render={() => (
                <FormItem>
                <FormLabel>Featured Image</FormLabel>
                <FormControl><Input type="file" accept="image/*" {...fileRef} /></FormControl>
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
                <FormControl><Input placeholder="e.g., marketing analytics" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <Button type="submit" size="lg">
          <Save className="mr-2 h-4 w-4" />
          {existingArticle ? 'Save Changes' : 'Publish Article'}
        </Button>
      </form>

      <Dialog open={isAiDialogOpen} onOpenChange={setAiDialogOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Generate Article with AI</DialogTitle>
                  <DialogDescription>
                      Enter a topic or headline, and our AI will draft the article for you. You can edit it afterwards.
                  </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                  <Label htmlFor="ai-topic">Topic / Headline</Label>
                  <Input id="ai-topic" value={aiTopic} onChange={(e) => setAiTopic(e.target.value)} placeholder="e.g., The Future of SEO in a Voice Search World" />
              </div>
              <DialogFooter>
                  <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleGenerateContent} disabled={!aiTopic || isAiPending}>
                      {isAiPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Generate Content
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </Form>
  );
}

    