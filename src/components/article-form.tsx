
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
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CaseStudy } from "@/types/case-study";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters.").max(300, "Excerpt must be less than 300 characters."),
  content: z.string().min(50, "Content must be at least 50 characters."),
  tags: z.string().min(1, "Please provide at least one tag."),
  author: z.string().min(2, "Author name is required."),
  image: z.string().url("Please enter a valid image URL.").optional().or(z.literal('')),
  dataAiHint: z.string().optional(),
});

type ArticleFormProps = {
    existingArticle?: CaseStudy;
};

export function ArticleForm({ existingArticle }: ArticleFormProps) {
  const { toast } = useToast();
  const router = useRouter();

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
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const storedArticlesRaw = localStorage.getItem('articles');
        let articles: CaseStudy[] = storedArticlesRaw ? JSON.parse(storedArticlesRaw) : [];

        const slug = values.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        if (existingArticle) {
            // Update existing article
            const articleIndex = articles.findIndex(a => a.slug === existingArticle.slug);
            if (articleIndex > -1) {
                articles[articleIndex] = {
                    ...articles[articleIndex],
                    ...values,
                    slug: slug, // Update slug in case title changed
                    tags: values.tags.split(',').map(tag => tag.trim()),
                    image: values.image || 'https://placehold.co/1200x600.png',
                    date: new Date().toISOString(), // Update modification date
                };
            }
        } else {
            // Add new article
             if (articles.some(a => a.slug === slug)) {
                toast({
                    title: "Error",
                    description: "An article with this title already exists. Please choose a unique title.",
                    variant: "destructive"
                });
                return;
            }
            const newArticle: CaseStudy = {
                ...values,
                slug,
                tags: values.tags.split(',').map(tag => tag.trim()),
                date: new Date().toISOString(),
                views: Math.floor(Math.random() * 500), // Random initial views
                image: values.image || 'https://placehold.co/1200x600.png',
                dataAiHint: values.dataAiHint || "business analysis",
                content: values.content, // Ensure content is passed
            };
            articles.unshift(newArticle);
        }
        
        localStorage.setItem('articles', JSON.stringify(articles));

        toast({
            title: `Article ${existingArticle ? 'Updated' : 'Created'}!`,
            description: `Your article "${values.title}" has been saved.`,
        });

        router.push('/dashboard/articles');
        router.refresh(); // To make sure the list page re-fetches the data

    } catch (error) {
        console.error("Failed to save article:", error);
        toast({
            variant: "destructive",
            title: "An Error Occurred",
            description: "Could not save your article. Please try again.",
        });
    }
  }

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
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Content</FormLabel>
              <FormControl><Textarea placeholder="Write the full article content here. You can use Markdown for formatting." className="min-h-[300px]" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 gap-6">
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
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Featured Image URL (Optional)</FormLabel>
                <FormControl><Input placeholder="https://placehold.co/1200x600.png" {...field} /></FormControl>
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
