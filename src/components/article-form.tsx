
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
import { Save, Bold, Italic, Link as LinkIcon, Eye, Pilcrow, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Minus, Undo, Redo, Sparkles, Strikethrough, Code, Image as ImageIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CaseStudy } from "@/types/case-study";
import React, { useRef, useState, useEffect, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { generateArticleContent } from "@/ai/flows/article-generator";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";

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

// Simple history stack for undo/redo
const useHistory = (initialState: string) => {
    const [history, setHistory] = useState<string[]>([initialState]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const setState = (value: string, fromHistory = false) => {
        if (fromHistory) {
            // This is a travel in history, not a new state
        } else {
            const newHistory = history.slice(0, currentIndex + 1);
            newHistory.push(value);
            setHistory(newHistory);
            setCurrentIndex(newHistory.length - 1);
        }
    };

    const undo = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            return history[currentIndex - 1];
        }
        return null;
    };

    const redo = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(prev => prev + 1);
            return history[currentIndex + 1];
        }
        return null;
    };
    
    const canUndo = currentIndex > 0;
    const canRedo = currentIndex < history.length - 1;

    return { value: history[currentIndex] || '', setState, undo, redo, canUndo, canRedo };
};

export function ArticleForm({ existingArticle }: ArticleFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);
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
  
  const { value: contentValue, setState: setContent, undo, redo, canUndo, canRedo } = useHistory(form.getValues('content'));

  useEffect(() => {
    form.setValue('content', contentValue, { shouldValidate: true, shouldDirty: true });
  }, [contentValue, form]);

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

  const applyFormatting = (prefix: string, suffix: string = prefix, placeholder: string = 'text') => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    const newText = `${prefix}${textToInsert}${suffix}`;

    const updatedValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
    setContent(updatedValue);
  };
  
  const applyLineFormatting = (prefix: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = textarea.value.lastIndexOf('\n', start - 1) + 1;
    const newText = prefix;

    const updatedValue = textarea.value.substring(0, lineStart) + newText + textarea.value.substring(lineStart);
    setContent(updatedValue);
  };
  
  const insertAtCursor = (text: string) => {
      const textarea = contentRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const updatedValue = textarea.value.substring(0, start) + text + textarea.value.substring(start);
      setContent(updatedValue);
  }

  const handleLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
        const textarea = contentRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end) || 'link text';
        const newText = `[${selectedText}](${url})`;
        const updatedValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
        setContent(updatedValue);
    }
  };

  const handleImageInsert = () => {
    const url = prompt('Enter the image URL:');
    if (url) {
        const altText = prompt('Enter alt text for the image:', 'image');
        const newText = `\n![${altText}](${url})\n`;
        insertAtCursor(newText);
    }
  };
  
  const handleUndo = () => {
    const val = undo();
    if(val !== null) form.setValue('content', val, { shouldValidate: true, shouldDirty: true });
  }

  const handleRedo = () => {
    const val = redo();
    if(val !== null) form.setValue('content', val, { shouldValidate: true, shouldDirty: true });
  }

  const renderPreview = (markdown: string) => {
    const html = markdown
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/~~(.*)~~/gim, '<del>$1</del>')
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' class='rounded-lg shadow-md max-w-full h-auto mx-auto' />")
        .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">$1</a>')
        .replace(/^---$/gim, '<hr />')
        .replace(/^\* (.*$)/gim, '<ul>\n<li>$1</li>\n</ul>')
        .replace(/^1\. (.*$)/gim, '<ol>\n<li>$1</li>\n</ol>')
        .replace(/\n/g, '<br />')
        // Clean up adjacent list tags
        .replace(/<\/ul><br \/><ul>/g, '') 
        .replace(/<\/ol><br \/>_?<ul>/g, '');

    return html;
  }

  const handleGenerateContent = () => {
    startAiTransition(async () => {
        try {
            const result = await generateArticleContent({ topic: aiTopic });
            setContent(result.articleContent);
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
                <div className="flex items-center gap-1 flex-wrap justify-end">
                    <Button type="button" variant="outline" size="xs" onClick={() => setAiDialogOpen(true)}>
                        <Sparkles className="h-4 w-4 mr-1" />
                        Generate with AI
                    </Button>
                    <span className="w-[1px] h-6 bg-border mx-1"></span>
                    <Button type="button" variant="outline" size="xs" onClick={handleUndo} disabled={!canUndo}><Undo className="h-4 w-4" title="Undo" /></Button>
                    <Button type="button" variant="outline" size="xs" onClick={handleRedo} disabled={!canRedo}><Redo className="h-4 w-4" title="Redo" /></Button>
                    <span className="w-[1px] h-6 bg-border mx-1"></span>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyLineFormatting('# ')}><Heading1 className="h-4 w-4" title="Heading 1" /></Button>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyLineFormatting('## ')}><Heading2 className="h-4 w-4" title="Heading 2" /></Button>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyLineFormatting('### ')}><Heading3 className="h-4 w-4" title="Heading 3" /></Button>
                    <span className="w-[1px] h-6 bg-border mx-1"></span>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyFormatting('**')}><Bold className="h-4 w-4" title="Bold" /></Button>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyFormatting('*')}><Italic className="h-4 w-4" title="Italic" /></Button>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyFormatting('~~')}><Strikethrough className="h-4 w-4" title="Strikethrough" /></Button>
                    <Button type="button" variant="outline" size="xs" onClick={handleLink}><LinkIcon className="h-4 w-4" title="Add Link" /></Button>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyFormatting('`')}><Code className="h-4 w-4" title="Code" /></Button>
                    <Button type="button" variant="outline" size="xs" onClick={handleImageInsert}><ImageIcon className="h-4 w-4" title="Insert Image" /></Button>
                    <span className="w-[1px] h-6 bg-border mx-1"></span>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyLineFormatting('> ')}><Quote className="h-4 w-4" title="Blockquote" /></Button>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyLineFormatting('* ')}><List className="h-4 w-4" title="Bulleted List" /></Button>
                    <Button type="button" variant="outline" size="xs" onClick={() => applyLineFormatting('1. ')}><ListOrdered className="h-4 w-4" title="Numbered List" /></Button>
                    <Button type="button" variant="outline" size="xs" onClick={() => insertAtCursor('\n---\n')}><Minus className="h-4 w-4" title="Horizontal Rule" /></Button>
                    <span className="w-[1px] h-6 bg-border mx-1"></span>
                    <Button type="button" variant={showPreview ? "secondary" : "outline"} size="xs" onClick={() => setShowPreview(!showPreview)}><Eye className="h-4 w-4 mr-1"/> Preview</Button>
                </div>
            </div>
             {showPreview ? (
                <Card>
                    <CardHeader><CardTitle>Content Preview</CardTitle></CardHeader>
                    <CardContent>
                        <div 
                            className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80" 
                            dangerouslySetInnerHTML={{ __html: renderPreview(form.getValues('content')) }} 
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
                            className="min-h-[300px] font-mono" 
                            {...field} 
                            ref={contentRef}
                            onChange={(e) => {
                                field.onChange(e); // Notify RHF
                                setContent(e.target.value); // Update history state
                            }}
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
