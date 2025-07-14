
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, PlusCircle, MoreHorizontal, Edit, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import type { CaseStudy } from '@/types/case-study';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function ArticlesPage() {
    const [articles, setArticles] = useState<CaseStudy[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedArticles = localStorage.getItem('articles');
            if (storedArticles) {
                setArticles(JSON.parse(storedArticles));
            }
        } catch (error) {
            console.error("Failed to parse articles from localStorage", error);
            localStorage.removeItem('articles');
        }
    }, []);

    const handleDeleteArticle = (slug: string) => {
        const updatedArticles = articles.filter(article => article.slug !== slug);
        setArticles(updatedArticles);
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
        toast({
            title: 'Article Deleted',
            description: 'The article has been successfully deleted.',
            variant: 'destructive',
        });
    };

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Article Management</h1>
                    <p className="text-muted-foreground">Create, edit, and manage your articles and case studies.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/articles/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Article
                    </Link>
                </Button>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Published Articles</CardTitle>
                    <CardDescription>A list of all your current articles and case studies.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles.length > 0 ? (
                                articles.map(article => (
                                    <TableRow key={article.slug}>
                                        <TableCell className="font-medium">{article.title}</TableCell>
                                        <TableCell>{article.author}</TableCell>
                                        <TableCell>{format(new Date(article.date), 'PP')}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {article.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem asChild>
                                                         <Link href={`/case-study/${article.slug}`} target="_blank">
                                                            <ExternalLink className="mr-2 h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/articles/edit/${article.slug}`}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete the article titled "{article.title}".
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeleteArticle(article.slug)} className={cn(buttonVariants({ variant: 'destructive' }))}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No articles found. Get started by creating one!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="justify-end">
                    <Button variant="ghost" asChild>
                        <Link href="/case-study">
                            View Public Page <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
