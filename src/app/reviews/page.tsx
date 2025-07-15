
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { reviews } from '@/lib/reviews-data';

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials',
  description: 'See what our clients have to say about Gorilla Tech Solutions. Read our reviews and learn how we help businesses achieve their goals.',
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fa fa-star ${i < rating ? 'text-amber-400' : 'text-muted-foreground/30'}`}
        aria-hidden="true"
      ></i>
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
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground p-1.5 rounded-full z-10 h-8 w-8 flex items-center justify-center">
                        <i className="fa fa-thumb-tack" aria-hidden="true"></i>
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
                      Get Your Free Consultation <i className="fa fa-arrow-right ml-2" aria-hidden="true"></i>
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
