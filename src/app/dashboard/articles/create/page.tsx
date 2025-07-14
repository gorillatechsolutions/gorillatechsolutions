
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { CaseStudy } from '@/types/case-study';
import { Save, Sparkles, Loader2 } from 'lucide-react';
import { generateArticleContent } from '@/ai/flows/article-generator';
import TiptapEditor from '@/components/tiptap-editor';

export default function CreateArticlePage() {
    const { toast } = useToast();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [tags, setTags] = useState('');
    const [author, setAuthor] = useState('Admin');
    const [dataAiHint, setDataAiHint] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAiPending, setIsAiPending] = useState(false);

    const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleGenerateContent = async () => {
        if (!title) {
            toast({
                title: "Title needed",
                description: "Please enter a title first to generate content.",
                variant: 'destructive',
            });
            return;
        }
        setIsAiPending(true);
        try {
            const result = await generateArticleContent({ topic: title });
            setContent(result.articleContent);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const storedArticlesRaw = localStorage.getItem('articles');
            let articles: CaseStudy[] = storedArticlesRaw ? JSON.parse(storedArticlesRaw) : [];
            const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

            if (articles.some(a => a.slug === slug)) {
                toast({
                    title: "Error",
                    description: "An article with this title already exists.",
                    variant: "destructive"
                });
                setIsSubmitting(false);
                return;
            }
            
            let imageUrl = 'https://placehold.co/1200x600.png';
            if (image) {
                imageUrl = await readFileAsDataURL(image);
            }

            const newArticle: CaseStudy = {
                title,
                content,
                excerpt,
                tags: tags.split(',').map(tag => tag.trim()),
                author,
                dataAiHint,
                image: imageUrl,
                slug,
                date: new Date().toISOString(),
                views: Math.floor(Math.random() * 500),
            };

            articles.unshift(newArticle);
            localStorage.setItem('articles', JSON.stringify(articles));

            toast({
                title: "Article Created!",
                description: `Your article "${title}" has been published.`,
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
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
            <header className="p-4 border-b bg-background flex justify-between items-center gap-4 sticky top-0 z-10">
                <h1 className="text-xl font-bold font-headline">Create New Article</h1>
                <div className="flex items-center gap-2">
                    <Button type="submit" disabled={isSubmitting || isAiPending}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? 'Publishing...' : 'Publish Article'}
                    </Button>
                </div>
            </header>

            <div className="flex-1 grid lg:grid-cols-[380px_1fr] gap-4 p-4 overflow-y-auto">
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
                             <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Article Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    placeholder="A short summary of the article..."
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="tags">Tags (comma-separated)</Label>
                                <Input
                                    id="tags"
                                    placeholder="e.g. SEO, Growth"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                     className="mt-1"
                                />
                            </div>
                             <div>
                                <Label htmlFor="author">Author</Label>
                                <Input
                                    id="author"
                                    placeholder="e.g. John Doe"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                     className="mt-1"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 space-y-4">
                             <div>
                                <Label htmlFor="image">Featured Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="dataAiHint">Image AI Hint (Optional)</Label>
                                <Input
                                    id="dataAiHint"
                                    placeholder="e.g. marketing analytics"
                                    value={dataAiHint}
                                    onChange={(e) => setDataAiHint(e.target.value)}
                                     className="mt-1"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Main Content: Editor */}
                <Card className="flex flex-col">
                    <CardContent className="p-2 flex-1 flex flex-col">
                        <div className="flex-1 h-full min-h-[400px]">
                            <TiptapEditor
                                content={content}
                                onChange={setContent}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}
