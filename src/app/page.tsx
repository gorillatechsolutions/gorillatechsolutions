
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, ListChecks, Rocket, CheckCircle, Award, CalendarCheck, Smile, Trophy, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { reviews as allReviews } from '@/app/reviews/page';

const processSteps = [
    {
        icon: <Search className="h-14 w-14 text-accent-foreground" />,
        title: 'Discovery',
        description: 'We start by understanding your business, goals, and target audience to lay the groundwork for a successful strategy.'
    },
    {
        icon: <ListChecks className="h-14 w-14 text-accent-foreground" />,
        title: 'Planning',
        description: 'Our team crafts a detailed, data-driven plan, outlining the key strategies and milestones for your project.'
    },
    {
        icon: <Rocket className="h-14 w-14 text-accent-foreground" />,
        title: 'Execution',
        description: 'We launch your campaigns, continuously optimizing for performance and delivering measurable results.'
    },
    {
        icon: <Award className="h-14 w-14 text-accent-foreground" />,
        title: 'Review & Launch',
        description: 'We review the results, provide detailed reports, and successfully launch your project for the world to see.'
    }
];

const stats = [
    { icon: <CalendarCheck className="h-8 w-8 text-accent-foreground" />, value: 98, label: 'On-Time Delivery', description: 'of projects delivered on schedule' },
    { icon: <Smile className="h-8 w-8 text-accent-foreground" />, value: 99, label: 'Client Satisfaction', description: 'Based on 500+ completed projects' },
    { icon: <Trophy className="h-8 w-8 text-accent-foreground" />, value: 97, label: 'Goal Achievement', description: 'Projects meet or exceed expectations' }
];

const benefits = [
    'Clear Communication',
    'Regular Updates',
    'Quality Assurance',
    '24/7 Support'
];

const pinnedReviews = allReviews.filter(review => review.pinned);

const StarRating = ({ rating, className }: { rating: number, className?: string }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'} ${className}`}
      />
    ))}
  </div>
);


export default function Home() {
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center" style={{ backgroundColor: '#F1F4F7' }}>
        <div className="w-[95%] grid items-center justify-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center justify-center space-y-6 text-center lg:items-start lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-foreground">
              Elevate Your Digital Marketing
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-[600px]">
              Gorilla Tech Solutions drives growth with data-driven digital marketing strategies that convert. Let's build your brand's future, together.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                <Link href="/application">
                  Get Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform transform hover:scale-105 border-border hover:bg-secondary">
                <Link href="/services">
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              width={600}
              height={400}
              alt="Team discussing digital marketing strategy on a whiteboard"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              data-ai-hint="digital marketing"
              priority={true}
            />
          </div>
        </div>
      </section>

      {/* Our Proven Process Section */}
      <section className="w-full py-12 bg-background">
        <div className="container mx-auto px-4">
          <header className="text-center mb-20">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">From Idea to Reality</h2>
            <h3 className="font-headline text-3xl md:text-4xl font-bold text-primary/80 mt-2">in 4 Simple Steps</h3>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">We follow a transparent, proven methodology that ensures your project succeeds. Every step is designed to deliver exceptional results while keeping you informed.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
            {processSteps.map((step) => (
              <Card key={step.title} className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-visible">
                <div className="flex flex-col h-full p-6 pt-12">
                    <div className="absolute -top-10 left-6">
                        <div className="bg-accent p-4 rounded-full ring-8 ring-background">
                           {step.icon}
                        </div>
                    </div>
                    <CardHeader className="p-0 mb-2">
                      <CardTitle className="font-headline text-xl text-primary">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </CardContent>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-secondary/30 p-8 md:p-12 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-12 text-center lg:text-left">Why Our Process Works</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {stats.map(stat => (
                                <Card key={stat.label} className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-visible text-center pt-8">
                                    <div className="absolute -top-6 right-6">
                                        <div className="bg-accent p-3 rounded-full ring-8 ring-secondary/30">
                                           {stat.icon}
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="relative text-5xl font-bold font-headline text-accent">
                                            {stat.value}<span className="text-3xl">%</span>
                                        </div>
                                        <p className="font-semibold mt-2">{stat.label}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div className="lg:pl-12">
                         <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-8 text-center lg:text-left">Our Commitment to You</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {benefits.map(benefit => (
                                <li key={benefit} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle className="h-6 w-6 text-green-500" />
                                    </div>
                                    <span className="text-base text-foreground font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <section className="w-full py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're proud to have partnered with amazing businesses. Here's what they have to say.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pinnedReviews.slice(0, 4).map((review) => (
              <Card key={review.name} className="flex flex-col bg-card shadow-lg hover:shadow-xl transition-shadow">
                 <CardContent className="p-6 flex-1 flex flex-col">
                  <StarRating rating={review.rating} />
                  <blockquote className="text-foreground/90 mt-4 flex-1">
                    "{review.quote}"
                  </blockquote>
                </CardContent>
                <div className="bg-secondary/50 p-6 flex items-center gap-4 mt-auto">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.dataAiHint} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-base font-headline text-primary">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.company}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform transform hover:scale-105 border-border hover:bg-secondary">
              <Link href="/reviews">
                Read More Reviews <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg shadow-lg p-8 md:p-12">
                  <div className="grid md:grid-cols-[1fr_auto] items-center gap-8">
                      <div className="flex items-start gap-6">
                           <div className="hidden sm:block mt-1 p-3 bg-white/20 rounded-full">
                                <Sparkles className="h-8 w-8 text-white" />
                           </div>
                           <div className="text-white">
                                <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Transform Your Business?</h2>
                                <p className="mt-2 text-white/90 max-w-2xl">
                                    Get started with our cutting-edge digital solutions and take your business to the next level.
                                </p>
                           </div>
                      </div>
                      <div className="flex justify-center md:justify-end">
                           <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105 w-full sm:w-auto">
                              <Link href="/contact">
                                  Get Started Now
                              </Link>
                           </Button>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
