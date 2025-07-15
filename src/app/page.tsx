
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { reviews as allReviews } from '@/lib/reviews-data';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAws, faMeta } from '@fortawesome/free-brands-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const processSteps = [
    {
        icon: <i className="fa fa-search fa-3x text-accent-foreground" aria-hidden="true"></i>,
        title: 'Discovery',
        description: 'We start by understanding your business, goals, and target audience to lay the groundwork for a successful strategy.'
    },
    {
        icon: <i className="fa fa-list-check fa-3x text-accent-foreground" aria-hidden="true"></i>,
        title: 'Planning',
        description: 'Our team crafts a detailed, data-driven plan, outlining the key strategies and milestones for your project.'
    },
    {
        icon: <i className="fa fa-rocket fa-3x text-accent-foreground" aria-hidden="true"></i>,
        title: 'Execution',
        description: 'We launch your campaigns, continuously optimizing for performance and delivering measurable results.'
    },
    {
        icon: <i className="fa fa-trophy fa-3x text-accent-foreground" aria-hidden="true"></i>,
        title: 'Review & Launch',
        description: 'We review the results, provide detailed reports, and successfully launch your project for the world to see.'
    }
];

const stats = [
    { icon: <i className="fa fa-calendar-check-o fa-2x text-accent-foreground" aria-hidden="true"></i>, value: 98, label: 'On-Time Delivery', description: 'of projects delivered on schedule' },
    { icon: <i className="fa fa-smile-o fa-2x text-accent-foreground" aria-hidden="true"></i>, value: 99, label: 'Client Satisfaction', description: 'Based on 500+ completed projects' },
    { icon: <i className="fa fa-trophy fa-2x text-accent-foreground" aria-hidden="true"></i>, value: 97, label: 'Goal Achievement', description: 'Projects meet or exceed expectations' }
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
      <i
        key={i}
        className={`fa fa-star ${i < rating ? 'text-amber-400' : 'text-muted-foreground/30'} ${className}`}
        aria-hidden="true"
      ></i>
    ))}
  </div>
);


export default function Home() {
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center" style={{ backgroundColor: '#F1F4F7' }}>
        <div className="w-[95%] grid items-center justify-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center justify-center space-y-6 text-center lg:items-start lg:text-left">
            <h1 className={cn(
              "text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline",
              "animated-gradient-text animate-gradient"
            )}>
              Elevate Your Digital Marketing
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-[600px]">
              Gorilla Tech Solutions drives growth with data-driven digital marketing strategies that convert. Let's build your brand's future, together.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                <Link href="/contact">
                  Get Your Free Consultation <i className="fa fa-arrow-right ml-2" aria-hidden="true"></i>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform transform hover:scale-105 border-border hover:bg-secondary">
                <Link href="/services">
                  Explore Our Services
                </Link>
              </Button>
            </div>
             <div className="mt-6 flex flex-wrap justify-center lg:justify-start items-center gap-4">
              <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-md text-black" style={{ backgroundColor: '#f0f4f6' }}>
                  <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6" style={{color: 'limegreen'}} />
                  <div className="flex flex-col items-start text-left">
                      <span className="text-sm">ISO 9001:2015</span>
                      <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-1 h-3 w-3" style={{color: 'limegreen'}} />
                          <span className="text-xs" style={{ color: 'limegreen' }}>Trusted</span>
                      </div>
                  </div>
              </Link>
              <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ backgroundColor: '#f2f5f7', color: 'black' }}>
                  <FontAwesomeIcon icon={faMeta} className="h-6 w-6" style={{color: "#0081FB"}} />
                  <div className="flex flex-col items-start">
                      <span className="text-sm" style={{ color: '#0081FB' }}>Meta Business</span>
                      <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-1 h-3 w-3" style={{color: 'limegreen'}} />
                          <span className="text-xs" style={{ color: 'limegreen' }}>Verified Partner</span>
                      </div>
                  </div>
              </Link>
              <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded-md text-black" style={{ backgroundColor: '#f0f4f6' }}>
                  <FontAwesomeIcon icon={faAws} className="h-6 w-6" style={{color: "#f78d38"}} />
                  <div className="flex flex-col items-start">
                      <div className="text-sm">
                          <span style={{ color: '#f78f39' }}>AWS </span>
                          <span style={{ color: '#383838' }}>Startup</span>
                      </div>
                      <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-1 h-3 w-3" style={{color: 'limegreen'}} />
                          <span className="text-xs" style={{ color: 'limegreen' }}>Verified Partner</span>
                      </div>
                  </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              width={600}
              height={400}
              alt="Team discussing digital marketing strategy on a whiteboard"
              className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
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
                        <div className="bg-accent p-4 rounded-full ring-8 ring-background flex items-center justify-center w-24 h-24">
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {stats.map(stat => (
                                <Card key={stat.label} className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-visible text-center pt-8">
                                    <div className="absolute -top-6 right-6">
                                        <div className="bg-accent p-3 rounded-full ring-8 ring-secondary/30 flex items-center justify-center w-14 h-14">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {benefits.map((benefit) => (
                                <div key={benefit} className="flex items-center gap-3">
                                    <i className="fa fa-check-circle text-green-500 fa-lg" aria-hidden="true"></i>
                                    <span className="text-base text-foreground font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
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
                Read More Reviews <i className="fa fa-arrow-right ml-2" aria-hidden="true"></i>
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full bg-background py-12 md:py-20">
          <div className="container mx-auto px-4">
              <div className="relative rounded-lg p-8 md:p-12 flex items-center" style={{ backgroundColor: '#4A61DD' }}>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-32 h-32 md:w-40 md:h-40 bg-yellow-400 rounded-full" />
                  <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                      <div className="md:pl-16 text-center md:text-left">
                           <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Transform Your Business?</h2>
                           <p className="mt-2 max-w-xl">
                               Get started with our cutting-edge digital solutions and take your business to the next level.
                           </p>
                      </div>
                      <div className="flex-shrink-0">
                           <Button asChild size="lg" className="bg-lime-500 text-black hover:bg-lime-600 font-bold shadow-lg transition-transform transform hover:scale-105 w-full sm:w-auto">
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
