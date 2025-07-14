
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Bold, Italic, Link as LinkIcon, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CaseStudy } from "@/types/case-study";
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);

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

  const contentValue = form.watch("content");

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
            slug: slug,
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

  const applyFormatting = (style: 'bold' | 'italic' | 'link') => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let newText = '';

    switch (style) {
        case 'bold':
            newText = `**${selectedText}**`;
            break;
        case 'italic':
            newText = `*${selectedText}*`;
            break;
        case 'link':
            const url = prompt('Enter the URL:');
            if (url) {
                newText = `[${selectedText}](${url})`;
            } else {
                return;
            }
            break;
    }

    const updatedValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
    form.setValue('content', updatedValue, { shouldValidate: true });
  };
  
  const fileRef = form.register("image");

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
            <div className="flex justify-between items-center mb-2">
                <FormLabel>Full Content</FormLabel>
                <div className="flex items-center gap-1">
                    <Button type="button" variant="outline" size="xs" onClick={() => applyFormatting('bold')}><Bold className="h-4 w-4"/></Button>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyFormatting('italic')}><Italic className="h-4 w-4"/></Button>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyFormatting('link')}><LinkIcon className="h-4 w-4"/></Button>
                    <Button type="button" variant={showPreview ? "secondary" : "outline"} size="xs" onClick={() => setShowPreview(!showPreview)}><Eye className="h-4 w-4 mr-1"/> Preview</Button>
                </div>
            </div>
             {showPreview ? (
                <Card>
                    <CardHeader><CardTitle>Content Preview</CardTitle></CardHeader>
                    <CardContent>
                        <div 
                            className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80" 
                            dangerouslySetInnerHTML={{ __html: contentValue.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>') }} 
                        />
                    </CardContent>
                </Card>
            ) : (
                <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea 
                            placeholder="Write the full article content here. Use the tools above for formatting." 
                            className="min-h-[300px]" 
                            {...field} 
                            ref={contentRef}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            )}
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
    </Form>
  );
}
