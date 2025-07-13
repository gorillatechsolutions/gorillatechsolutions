
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials',
  description: 'See what our clients have to say about Gorilla Tech Solutions. Read our reviews and learn how we help businesses achieve their goals.',
};

const reviews = [
  {
    name: 'Sarah L.',
    company: 'EcoFriendly Goods',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    rating: 5,
    quote: 'Gorilla Tech Solutions completely transformed our online presence. Their SEO strategy was a game-changer, tripling our organic traffic in just six months. We couldn\'t be happier with the results!',
  },
  {
    name: 'Mark C.',
    company: 'Innovate SaaS',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man portrait',
    rating: 5,
    quote: 'The PPC team is phenomenal. They slashed our cost-per-acquisition by 40% while improving lead quality. Their data-driven approach is second to none. Highly recommended for any B2B company.',
  },
  {
    name: 'Jessica P.',
    company: 'The Local Cafe',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman smiling',
    rating: 5,
    quote: 'We were struggling with social media until we partnered with them. They built a vibrant community around our brand and drove a noticeable increase in foot traffic. It feels like they\'re part of our team.',
  },
  {
    name: 'David R.',
    company: 'DR Financial',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man professional',
    rating: 5,
    quote: 'Their content marketing and lead generation strategies delivered high-quality leads consistently. The ROI from their LinkedIn campaign was impressive. Professional, responsive, and effective.',
  },
  {
    name: 'Emily T.',
    company: 'La Boutique',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman fashion',
    rating: 4,
    quote: 'The team helped us launch our new collection with a fantastic influencer marketing campaign. The buzz they created was incredible and directly translated to a significant increase in online sales.',
  },
  {
    name: 'Michael B.',
    company: 'Prime Properties',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man realtor',
    rating: 5,
    quote: 'Thanks to their local SEO expertise, our agency now dominates the search rankings in our city. We\'ve seen a steady stream of qualified inquiries since they optimized our website and GMB profile.',
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`}
      />
    ))}
  </div>
);

export default function ReviewsPage() {
  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-secondary/30 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">What Our Clients Say</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We're proud to have partnered with amazing businesses. Here's a glimpse of the success stories we've created together.
          </p>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-6">
                  <StarRating rating={review.rating} />
                </CardHeader>
                <CardContent className="p-6 pt-0 flex-1">
                  <blockquote className="text-foreground/80 italic border-l-4 border-accent pl-4">
                    "{review.quote}"
                  </blockquote>
                </CardContent>
                <div className="bg-secondary/50 p-6 flex items-center gap-4 mt-auto">
                  <Avatar className="h-14 w-14 border-2 border-primary">
                    <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.dataAiHint} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-lg font-headline text-primary">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.company}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Ready to Be Our Next Success Story?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Let's discuss how we can help you achieve your business goals and add your name to our list of happy clients.
              </p>
              <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/contact">
                      Get Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
