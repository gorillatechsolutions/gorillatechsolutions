
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/components/ui/badge';
import { useService } from '@/contexts/service-context';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function ServicesPage() {
    const { services, loading } = useService();

    if (loading) {
        return (
            <div className="w-full bg-background text-foreground">
                <section className="bg-secondary/30 pt-16 pb-12 md:pt-24 md:pb-20">
                    <div className="container mx-auto px-4 text-center">
                        <Skeleton className="h-12 w-2/3 mx-auto" />
                        <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                    </div>
                </section>
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Card key={i} className="relative pt-16">
                                    <Skeleton className="absolute -top-12 left-6 w-24 h-24 rounded-full" />
                                    <CardHeader>
                                        <Skeleton className="h-8 w-3/4" />
                                    </CardHeader>
                                    <CardContent>
                                        <Skeleton className="h-4 w-full mb-2" />
                                        <Skeleton className="h-4 w-full mb-6" />
                                        <Skeleton className="h-10 w-1/2" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        )
    }

  return (
    <div className="w-full bg-background text-foreground">
        <section className="bg-secondary/30 pt-16 pb-12 md:pt-24 md:pb-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Our Digital Marketing Services</h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    A comprehensive suite of digital marketing services designed to elevate your brand and accelerate growth.
                </p>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                    {services.map((service) => (
                         <Card key={service.slug} className="relative shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl pt-16 border-border/80 flex flex-col">
                            <div className="absolute -top-12 left-6">
                                <div className="bg-card w-24 h-24 rounded-full flex items-center justify-center ring-8 ring-background border-4 border-primary/20 p-2">
                                    <Image src={service.icon} alt={`${service.title} icon`} width={80} height={80} className="rounded-full object-contain" />
                                </div>
                            </div>
                            
                            {service.popular && (
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-amber-400 text-amber-900 font-bold text-xs py-1 px-3 flex items-center gap-1.5 hover:bg-amber-400/90">
                                        <FontAwesomeIcon icon={faAward} className="h-3.5 w-3.5" />
                                        MOST POPULAR
                                    </Badge>
                                </div>
                            )}

                            <CardHeader className="pt-2 text-center md:text-left">
                                <CardTitle className="font-headline text-2xl text-primary">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6 flex flex-col flex-1">
                                <p className="text-muted-foreground mb-6 flex-1">{service.description}</p>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <p className="text-lg text-muted-foreground">Starting at</p>
                                        <div className="text-right">
                                            <p className="text-4xl font-bold font-headline text-amber-700">${service.price}</p>
                                            <p className="text-sm text-muted-foreground line-through">${service.originalPrice}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-accent font-semibold text-left">
                                            Limited Offer | Save 10%
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row gap-2">
                                     <Button asChild className="flex-1">
                                        <Link href="/contact">Contact</Link>
                                    </Button>
                                    <Button asChild variant="outline" className="flex-1">
                                        <Link href={`/services/${service.slug}`}>Read More</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Ready to Grow Your Business?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Let's discuss how our digital marketing expertise can help you achieve your business goals. Your journey to digital excellence starts here.
              </p>
              <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/contact">
                      Get Your Free Consultation <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
