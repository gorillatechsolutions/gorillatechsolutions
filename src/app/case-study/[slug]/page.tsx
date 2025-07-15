
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { CaseStudy } from '@/types/case-study';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { demoCaseStudies } from '@/lib/demo-data';

const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views;
};

export default function CaseStudyDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [caseStudy, setCaseStudy] = useState<CaseStudy | null | undefined>(undefined);

    useEffect(() => {
        if (slug) {
            const storedPosts = localStorage.getItem('caseStudies');
            const allCaseStudies = storedPosts ? JSON.parse(storedPosts) : demoCaseStudies;
            const study = allCaseStudies.find((a: CaseStudy) => a.slug === slug);
            setCaseStudy(study || null);
        }
    }, [slug]);

    if (caseStudy === undefined) {
        return <div className="container py-12">Loading...</div>; // Or a skeleton loader
    }
    
    if (!caseStudy) {
        notFound();
    }

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
                                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                <span>By {caseStudy.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fa fa-calendar" aria-hidden="true"></i>
                                <span>{new Date(caseStudy.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fa fa-eye" aria-hidden="true"></i>
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
                        <div 
                            className="prose prose-lg max-w-none mx-auto text-foreground prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-lg prose-video:rounded-lg"
                        >
                          {parse(caseStudy.content)}
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
                            <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>
                            Back to Case Studies
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
