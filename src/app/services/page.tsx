
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { useService } from '@/contexts/service-context';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useServicesPage } from '@/contexts/services-page-context';
import { cn } from '@/lib/utils';

export default function ServicesPage() {
    const { services, loading: servicesLoading } = useService();
    const { content, loading: pageContentLoading } = useServicesPage();

    const loading = servicesLoading || pageContentLoading;

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-80 w-full rounded-lg" />
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
                <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-primary">{content.heroTitle}</h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    {content.heroSubtitle}
                </p>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                {services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <Card key={service.slug} className="shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl border-border/80 flex flex-col overflow-visible group relative">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                                    <div className="bg-card w-20 h-20 rounded-full flex items-center justify-center ring-4 ring-background border-2 border-primary/10 shadow-md p-1 transform group-hover:scale-110 transition-transform duration-300">
                                        {isValidUrl(service.icon) ? (
                                            <Image src={service.icon} alt={`${service.title} icon`} width={64} height={64} className="rounded-full object-contain" />
                                        ) : (
                                            <FontAwesomeIcon icon={faImage} className="h-10 w-10 text-muted-foreground/50" />
                                        )}
                                    </div>
                                </div>
                                <CardHeader className="pt-16 text-center">
                                    <CardTitle className="font-headline text-xl text-primary group-hover:text-accent transition-colors duration-300">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-2 flex-1 flex flex-col">
                                    <p className="text-muted-foreground leading-relaxed mb-4 flex-1">{service.description}</p>
                                    <p className={cn("text-2xl font-bold font-headline", "animated-gradient-text-2 animate-gradient")}>Starting At</p>
                                    
                                    <div className="text-center">
                                        <div className="flex items-end justify-center gap-2">
                                            <p className="text-4xl font-bold font-headline text-primary">${service.price}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-through">${service.originalPrice}</p>
                                        <p className="text-orange-500 text-sm font-semibold mt-2">Limited Offer | Save 10%</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-6 bg-secondary/20 mt-auto flex gap-2">
                                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-300 flex-1">
                                        <Link href="/contact">
                                            Contact
                                        </Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline" className="shadow-lg transform hover:scale-105 transition-transform duration-300 flex-1">
                                        <Link href={`/services/${service.slug}`}>
                                            Read More
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-bold font-headline">No Services Available</h2>
                        <p className="mt-2 text-muted-foreground">Check back soon or add new services in the admin dashboard.</p>
                        <Button asChild className="mt-6">
                            <Link href="/admin/services">Go to Admin</Link>
                        </Button>
                    </div>
                )}
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
