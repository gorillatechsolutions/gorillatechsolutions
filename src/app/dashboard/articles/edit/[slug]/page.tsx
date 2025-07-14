
'use client';

import { useState, useEffect } from 'react';
import { ArticleForm } from "@/components/article-form";
import type { CaseStudy } from '@/types/case-study';
import { notFound } from 'next/navigation';

export default function EditArticlePage({ params }: { params: { slug: string } }) {
    const [article, setArticle] = useState<CaseStudy | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const storedArticles = localStorage.getItem('articles');
            if (storedArticles) {
                const articles: CaseStudy[] = JSON.parse(storedArticles);
                const foundArticle = articles.find(a => a.slug === params.slug);
                if (foundArticle) {
                    setArticle(foundArticle);
                } else {
                    notFound();
                }
            } else {
                 notFound();
            }
        } catch (error) {
            console.error("Failed to parse articles from localStorage", error);
        } finally {
            setIsLoading(false);
        }
    }, [params.slug]);

    if (isLoading) {
        return (
             <div className="p-4 sm:p-6 md:p-8">
                <p>Loading article...</p>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 md:p-8">
             <header className="mb-8">
                <h1 className="text-2xl font-bold font-headline">Edit Article</h1>
                <p className="text-muted-foreground">Make changes to your article below.</p>
            </header>
            {article && <ArticleForm existingArticle={article} />}
        </div>
    )
}
