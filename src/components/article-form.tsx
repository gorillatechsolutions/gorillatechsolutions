
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { Save, Sparkles, Loader2, Bold, Italic, Underline, Strikethrough, Link as LinkIcon, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Undo, Redo } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CaseStudy } from "@/types/case-study";
import React, { useState, useTransition, useRef, useCallback } from "react";
import { generateArticleContent } from "@/ai/flows/article-generator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

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

const useUndoableState = (initialState: string) => {
    const [history, setHistory] = useState<string[]>([initialState]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const setState = (value: string) => {
        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push(value);
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
    };

    const undo = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const redo = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };
    
    const resetState = (newState: string) => {
        setHistory([newState]);
        setCurrentIndex(0);
    }

    const value = history[currentIndex];
    const canUndo = currentIndex > 0;
    const canRedo = currentIndex < history.length - 1;

    return { value, setState, undo, redo, canUndo, canRedo, resetState };
};

export function ArticleForm({ existingArticle }: ArticleFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isAiPending, startAiTransition] = useTransition();
  const [isAiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

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

  const { value: content, setState: setContent, undo, redo, canUndo, canRedo, resetState } = useUndoableState(form.getValues('content'));

  React.useEffect(() => {
      form.setValue('content', content, { shouldValidate: true, shouldDirty: true });
  }, [content, form]);
  
  React.useEffect(() => {
    if (existingArticle) {
      resetState(existingArticle.content);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingArticle]);

  const applyFormat = useCallback((format: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'link' | 'h1' | 'h2' | 'h3' | 'ul' | 'ol' | 'blockquote') => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let newText = '';

    const modifyLine = (line: string, tag: string) => `<${tag}>${line}</${tag}>\n`;
    const modifySelection = (before: string, after: string) => `${before}${selectedText}${after}`;
    
    switch (format) {
      case 'bold':
        newText = modifySelection('<strong>', '</strong>');
        break;
      case 'italic':
        newText = modifySelection('<em>', '</em>');
        break;
      case 'underline':
        newText = modifySelection('<u>', '</u>');
        break;
      case 'strikethrough':
        newText = modifySelection('<s>', '</s>');
        break;
      case 'link':
        const url = prompt("Enter URL:", "https://");
        if (url) {
            newText = `<a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText || url}</a>`;
        } else {
            return;
        }
        break;
      case 'h1':
      case 'h2':
      case 'h3':
        newText = modifyLine(selectedText, format);
        break;
      case 'ul':
      case 'ol':
        const listItems = selectedText.split('\n').map(item => `<li>${item}</li>`).join('\n');
        newText = `<${format}>\n${listItems}\n</${format}>`;
        break;
      case 'blockquote':
        newText = modifySelection('<blockquote><p>', '</p></blockquote>');
        break;
    }

    const updatedContent = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
    setContent(updatedContent);
  }, [setContent]);

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
            // Convert markdown to basic HTML for the textarea
            const htmlContent = result.articleContent
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                .replace(/\*(.*)\*/gim, '<em>$1</em>')
                .replace(/(\r\n|\n){2,}/g, '</p><p>')
                .replace(/(\r\n|\n)/g, '<br/>');

            setContent(`<p>${htmlContent}</p>`);
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
          </div>
          <div className="border rounded-md">
            <div className="p-2 border-b flex flex-wrap items-center gap-1">
              <Button type="button" variant="outline" size="xs" onClick={undo} disabled={!canUndo}><Undo className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={redo} disabled={!canRedo}><Redo className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => applyFormat('h1')}><Heading1 className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => applyFormat('h2')}><Heading2 className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => applyFormat('h3')}><Heading3 className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => applyFormat('bold')}><Bold className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => applyFormat('italic')}><Italic className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => applyFormat('underline')}><Underline className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => applyFormat('strikethrough')}><Strikethrough className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => applyFormat('link')}><LinkIcon className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => applyFormat('ul')}><List className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => applyFormat('ol')}><ListOrdered className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => applyFormat('blockquote')}><Quote className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" size="xs" onClick={() => setAiDialogOpen(true)}>
                <Sparkles className="h-4 w-4 mr-1" /> AI
              </Button>
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      ref={contentTextareaRef}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your article content here. Use the tools above to format."
                      className="min-h-[400px] border-0 focus-visible:ring-0 rounded-t-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
