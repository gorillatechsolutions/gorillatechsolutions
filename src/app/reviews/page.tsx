
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials',
  description: 'See what our clients have to say about Gorilla Tech Solutions. Read our reviews and learn how we help businesses achieve their goals.',
};

export const reviews = [
  {
    name: 'Sarah L.',
    company: 'EcoFriendly Goods',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    rating: 5,
    quote: 'Gorilla Tech Solutions completely transformed our online presence. Their SEO strategy was a game-changer, tripling our organic traffic in just six months. We couldn\'t be happier with the results!',
    pinned: true,
  },
  {
    name: 'Mark C.',
    company: 'Innovate SaaS',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man portrait',
    rating: 5,
    quote: 'The PPC team is phenomenal. They slashed our cost-per-acquisition by 40% while improving lead quality. Their data-driven approach is second to none. Highly recommended for any B2B company.',
    pinned: true,
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
  {
    name: 'Alex Johnson',
    company: 'Tech Solutions Inc.',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man tech',
    rating: 5,
    quote: 'An absolutely outstanding experience. The team is professional, knowledgeable, and delivered results that far exceeded our expectations. Their SEO work put us on the map!',
    pinned: true,
  },
  {
    name: 'Samantha Lee',
    company: 'Creative Designs Co.',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman designer',
    rating: 5,
    quote: 'The social media campaigns they ran for us were creative, engaging, and drove a huge amount of traffic to our site. I\'m thrilled with the outcome and the team\'s dedication.',
  },
  {
    name: 'Tom Wilson',
    company: 'Global Exports',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man business',
    rating: 5,
    quote: 'We needed a complete digital marketing overhaul, and Gorilla Tech Solutions delivered. Their strategic approach to content and PPC has been instrumental in our growth this year.',
    pinned: true,
  },
  {
    name: 'Linda Garcia',
    company: 'Healthy Eats',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman chef',
    rating: 4,
    quote: 'Their email marketing automation has saved us so much time and has been incredibly effective at nurturing leads. We\'ve seen a definite increase in repeat customers.',
  },
  {
    name: 'Kevin Harris',
    company: 'FitHub',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man fitness',
    rating: 5,
    quote: 'The best in the business! Their integrated marketing campaign for our app launch was a massive success, leading to 50,000+ downloads in the first month. Highly strategic and flawless execution.',
    pinned: true,
  },
  {
    name: 'Rachel Adams',
    company: 'Sunset Travel',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman travel',
    rating: 5,
    quote: 'Our bookings have soared since they revamped our content strategy. The travel guides they created are not only beautiful but also rank highly on Google. A pleasure to work with!',
  },
  {
    name: 'Chris Martinez',
    company: 'AutoRevive',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man mechanic',
    rating: 5,
    quote: 'They optimized our PPC campaigns for our dealership network and the results were almost immediate. Lead volume is up by 50% and we\'re spending less. That\'s a win-win.',
  },
  {
    name: 'Megan Chen',
    company: 'FutureLearn',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman student',
    rating: 5,
    quote: 'The team managed our Google Ads for student enrollment, and they did a fantastic job. Our cost per acquisition is down 30%, and our enrollment numbers are at an all-time high.',
  },
  {
    name: 'George Wright',
    company: 'Wright & Co. Law',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man lawyer',
    rating: 5,
    quote: 'Building authority in the legal field is tough, but their SEO and content team made it happen. We now rank in the top 3 for our most important keywords. Exceptional work.',
  },
  {
    name: 'Olivia King',
    company: 'PetPals Store',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman pet',
    rating: 5,
    quote: 'Their expertise in conversion rate optimization increased our online store\'s revenue by over 30%. They identified and fixed issues we didn\'t even know we had. Invaluable service.',
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
    const sortedReviews = [...reviews].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
    });

  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-secondary/30 pt-12 pb-8 md:pt-16 md:pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">What Our Clients Say</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We're proud to have partnered with amazing businesses. Here's a glimpse of the success stories we've created together.
          </p>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedReviews.map((review, index) => (
              <Card key={index} className={cn("flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative", review.pinned && "border-primary/50 ring-2 ring-primary/20")}>
                {review.pinned && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground p-1.5 rounded-full z-10">
                        <Pin className="h-5 w-5" />
                    </div>
                )}
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
