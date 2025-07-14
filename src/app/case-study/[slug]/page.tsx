
'use client';

import { notFound, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, UserCircle, Eye, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import type { CaseStudy } from '@/types/case-study';


// This page now fetches data client-side, so generateStaticParams is no longer needed
// and would cause an error in a client component.
// export async function generateStaticParams() {
//     return allCaseStudies.map((study) => ({
//       slug: study.slug,
//     }))
// }

const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views;
};


export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
    const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
    const slug = params.slug;

    useEffect(() => {
        try {
            const storedArticles = localStorage.getItem('articles');
            if (storedArticles) {
                const articles: CaseStudy[] = JSON.parse(storedArticles);
                const foundArticle = articles.find(a => a.slug === slug);
                if(foundArticle) {
                    setCaseStudy(foundArticle);
                } else {
                    notFound();
                }
            } else {
                notFound();
            }
        } catch (error) {
            console.error(error);
            notFound();
        }
    }, [slug]);


    if (!caseStudy) {
        return (
            <div className="w-full bg-background text-foreground text-center py-20">
                <p>Loading article...</p>
            </div>
        );
    }

    const renderContent = (markdown: string) => {
        const html = markdown
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
            .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">$1</a>')
            .replace(/^---$/gim, '<hr class="my-8 border-border" />')
            .replace(/^\* (.*$)/gim, '<ul>\n<li>$1</li>\n</ul>')
            .replace(/^1\. (.*$)/gim, '<ol>\n<li>$1</li>\n</ol>')
            .replace(/\n/g, '<br />')
            .replace(/<\/ul><br \/><ul>/g, '')
            .replace(/<\/ol><br \/>_?<ul>/g, '');

        return html;
    };

    return (
        <div className="w-full bg-background text-foreground">
            <section className="bg-secondary/30 py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <header className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center flex-wrap gap-2 mb-4">
                            {caseStudy.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                        <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-primary">{caseStudy.title}</h1>
                        <div className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <UserCircle className="h-5 w-5" />
                                <span>By {caseStudy.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-5 w-5" />
                                <span>{new Date(caseStudy.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="h-5 w-5" />
                                <span>{formatViews(caseStudy.views)} views</span>
                            </div>
                        </div>
                    </header>
                </div>
            </section>
            
            <article className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative h-96 md:h-[500px] mb-12">
                            <Image
                                src={caseStudy.image}
                                alt={caseStudy.title}
                                fill
                                style={{objectFit: 'cover'}}
                                className="rounded-lg shadow-xl"
                                data-ai-hint={caseStudy.dataAiHint}
                                priority
                            />
                        </div>
                        <div className="prose prose-lg max-w-none mx-auto text-foreground prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80">
                            <p className="lead text-xl text-muted-foreground mb-8">{caseStudy.excerpt}</p>
                            
                            {/* The content is now directly rendered */}
                            <div dangerouslySetInnerHTML={{ __html: renderContent(caseStudy.content) }} />
                        </div>
                    </div>
                </div>
            </article>
            
            <section className="py-12 bg-secondary/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-headline text-3xl font-bold text-primary">Explore More Success Stories</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        See how we've helped other businesses like yours achieve their digital marketing goals.
                    </p>
                    <Button asChild size="lg" className="mt-8">
                        <Link href="/case-study">
                            Back to Case Studies <ArrowLeft className="mr-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
