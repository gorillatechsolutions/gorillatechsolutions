
'use client';

import { useState, useEffect } from 'react';
import { ArticleForm } from "@/components/article-form";
import type { CaseStudy } from '@/types/case-study';
import { notFound } from 'next/navigation';

export default function EditArticlePage({ params }: { params: { slug: string } }) {
    const [article, setArticle] = useState<CaseStudy | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const slug = params.slug;

    useEffect(() => {
        try {
            const storedArticles = localStorage.getItem('articles');
            if (storedArticles) {
                const articles: CaseStudy[] = JSON.parse(storedArticles);
                const foundArticle = articles.find(a => a.slug === slug);
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
    }, [slug]);

    if (isLoading) {
        return (
             <div className="p-4 sm:p-6 md:p-8">
                <p>Loading article...</p>
            </div>
        )
    }
    
    if (!article) {
        return (
            <div className="p-4 sm:p-6 md:p-8">
               <p>Article not found.</p>
           </div>
        )
    }

    return (
        <ArticleForm existingArticle={article} />
    )
}
