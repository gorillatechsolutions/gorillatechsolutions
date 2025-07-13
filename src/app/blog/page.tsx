
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Our Blog | Gorilla Tech Solutions',
    description: 'Explore insights, tips, and case studies on digital marketing, SEO, PPC, and more from the experts at Gorilla Tech Solutions.',
};

const blogPosts = [
  {
    slug: 'tripled-organic-traffic-ecommerce',
    title: 'How We Tripled Organic Traffic for a Sustainable eCommerce Brand',
    excerpt: 'Our comprehensive SEO and content strategy established EcoFriendly Goods as a thought leader, driving a 300% increase in organic traffic and doubling sales.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'ecommerce analytics',
    tags: ['SEO', 'Content Marketing', 'eCommerce'],
    author: 'Jane Doe',
    date: 'October 26, 2023'
  },
  {
    slug: 'slashing-b2b-saas-cpa',
    title: 'Slashing a B2B SaaS Company\'s CPA by 40%',
    excerpt: 'We rebuilt a B2B SaaS PPC campaign from the ground up, focusing on precise audience targeting to dramatically improve lead quality and lower acquisition costs.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'tech startup',
    tags: ['PPC', 'CRO', 'B2B SaaS'],
    author: 'John Smith',
    date: 'September 15, 2023'
  },
  {
    slug: 'building-community-with-social-media',
    title: 'Building a Community and Driving Foot Traffic with Social Media',
    excerpt: 'Through engaging content and targeted local ads, we transformed a local cafe\'s social media presence into a vibrant hub for coffee lovers, increasing daily foot traffic.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'cafe interior',
    tags: ['Social Media', 'Local SEO', 'Community'],
    author: 'Alice Johnson',
    date: 'August 02, 2023'
  },
];

export default function BlogPage() {
  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">From the Gorilla Tech Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Insights, strategies, and success stories from the forefront of digital marketing.
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                    <div className="relative h-56 w-full">
                        <Image
                        src={post.image}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={post.dataAiHint}
                        loading="lazy"
                        />
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <CardTitle className="font-headline text-xl mb-3 leading-tight flex-1">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                    <div className="w-full border-t border-border pt-4 flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <UserCircle className="h-4 w-4" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span>{post.date}</span>
                        </div>
                    </div>
                    <Button asChild variant="link" className="p-0 h-auto text-primary">
                        <Link href={`/blog/${post.slug}`}>
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
