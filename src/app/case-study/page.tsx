
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Digital Marketing Case Studies | Gorilla Tech Solutions',
    description: 'Explore our case studies to see the real-world results we have delivered for clients in SEO, PPC, social media, and content marketing.',
};

const caseStudies = [
  {
    client: 'EcoFriendly Goods',
    title: 'How We Tripled Organic Traffic for a Sustainable eCommerce Brand',
    description: 'Our comprehensive SEO and content strategy focused on high-intent keywords and valuable blog content, establishing EcoFriendly Goods as a thought leader in the sustainable products space.',
    image: 'https://placehold.co/600x450.png',
    dataAiHint: 'ecommerce analytics',
    tags: ['SEO', 'Content Marketing', 'eCommerce'],
    results: [
        '300% increase in organic traffic in 6 months',
        'Doubled online sales from organic search',
        'Page 1 ranking for 20+ target keywords'
    ]
  },
  {
    client: 'Future Tech Inc.',
    title: 'Slashing a B2B SaaS Company\'s CPA by 40%',
    description: 'We rebuilt Future Tech\'s PPC campaigns from the ground up, focusing on precise audience targeting, compelling ad copy, and high-converting landing pages. This data-driven approach dramatically improved lead quality while lowering acquisition costs.',
    image: 'https://placehold.co/600x450.png',
    dataAiHint: 'tech startup',
    tags: ['PPC', 'CRO', 'B2B SaaS'],
    results: [
        '40% reduction in Cost-Per-Acquisition (CPA)',
        '65% increase in qualified marketing leads',
        '25% improvement in landing page conversion rates'
    ]
  },
  {
    client: 'The Corner Cafe',
    title: 'Building a Community and Driving Foot Traffic with Social Media',
    description: 'Through engaging content, targeted local ads, and proactive community management, we transformed The Corner Cafe\'s social media presence into a vibrant hub for coffee lovers. This translated directly into increased brand awareness and more customers walking through the door.',
    image: 'https://placehold.co/600x450.png',
    dataAiHint: 'cafe interior',
    tags: ['Social Media', 'Local SEO', 'Community'],
    results: [
        '5x growth in social media engagement',
        '200% increase in follower count',
        'Directly attributed rise in daily foot traffic'
    ]
  },
];

export default function CaseStudyPage() {
  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Success Stories</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Explore the tangible, data-driven results we've delivered for our clients across various industries.
          </p>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.client} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-56 w-full">
                    <Image
                      src={study.image}
                      alt={`Case study for ${study.client}`}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={study.dataAiHint}
                      loading="lazy"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <p className="text-sm font-semibold text-accent mb-2">{study.client}</p>
                  <CardTitle className="font-headline text-xl mb-3 leading-tight">{study.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <CardDescription className="mb-6 text-sm flex-1">{study.description}</CardDescription>
                  <div>
                    <h4 className="font-headline text-md font-semibold mb-3">Key Results:</h4>
                    <ul className="space-y-2">
                        {study.results.map(result => (
                            <li key={result} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2.5 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground text-sm">{result}</span>
                            </li>
                        ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* CTA Section */}
       <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">See What We Can Do For You</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Inspired by these results? Let's discuss how our digital marketing expertise can help you achieve your own success story.
              </p>
              <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/contact">
                      Request a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
