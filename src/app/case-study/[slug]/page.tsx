
import { notFound } from 'next/navigation';
import { allCaseStudies } from '@/app/case-study/page';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CalendarDays, UserCircle, Eye, Tag } from 'lucide-react';
import type { Metadata } from 'next';

type CaseStudyPageProps = {
    params: {
        slug: string;
    }
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = allCaseStudies.find(study => study.slug === params.slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: caseStudy.title,
    description: caseStudy.excerpt,
  }
}

export async function generateStaticParams() {
    return allCaseStudies.map((study) => ({
      slug: study.slug,
    }))
}

const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views;
};


export default function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
    const caseStudy = allCaseStudies.find(study => study.slug === params.slug);

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
                                <UserCircle className="h-5 w-5" />
                                <span>By {caseStudy.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-5 w-5" />
                                <span>{caseStudy.date}</span>
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
                            
                            <h2>The Challenge</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            
                            <h2>Our Solution</h2>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. We implemented a multi-faceted approach that included:</p>
                            <ul>
                                <li><strong>In-depth Keyword Research:</strong> Identifying high-intent keywords to target relevant audiences.</li>
                                <li><strong>On-Page SEO Optimization:</strong> Enhancing meta tags, headers, and content for search engines.</li>
                                <li><strong>High-Quality Content Creation:</strong> Developing blog posts and guides to establish authority.</li>
                                <li><strong>Strategic Link Building:</strong> Acquiring backlinks from reputable sources to boost domain authority.</li>
                            </ul>
                            
                            <h2>The Results</h2>
                            <p>The results spoke for themselves. Within six months, the client experienced a significant increase in key performance indicators. We observed a <strong>300% increase in organic traffic</strong>, a <strong>40% reduction in CPA</strong>, and a <strong>150% rise in new customer bookings</strong>. These metrics not only met but exceeded the initial project goals, establishing a new baseline for their digital marketing success.</p>
                            
                            <blockquote>
                                <p>"This campaign was a complete success. The team's expertise and dedication were evident from day one, and the results have had a tangible impact on our bottom line."</p>
                                <cite>- Client CEO</cite>
                            </blockquote>
                            
                            <h2>Conclusion</h2>
                            <p>This case study demonstrates the power of a well-executed, data-driven digital marketing strategy. By focusing on fundamental principles and adapting to the client's unique needs, we were able to deliver exceptional results that fostered long-term growth.</p>
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
                            Back to Case Studies <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
