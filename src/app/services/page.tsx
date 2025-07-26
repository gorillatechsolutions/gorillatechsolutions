
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faAward,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/components/ui/badge';
import { useService } from '@/contexts/service-context';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useServicesPage } from '@/contexts/services-page-context';

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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                         <Card key={service.slug} className="shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl border-border/80 flex flex-col overflow-hidden group relative">
                            {service.popular && (
                                <div className="absolute top-0 right-0 z-10">
                                    <div className="bg-accent text-accent-foreground font-bold text-xs uppercase tracking-wider px-4 py-1.5" style={{clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 10% 25%)'}}>
                                        <FontAwesomeIcon icon={faAward} className="mr-1.5" />
                                        Popular
                                    </div>
                                </div>
                            )}
                            <div className="w-full flex-shrink-0 flex items-center justify-center p-8 bg-secondary/40">
                                <div className="bg-card w-40 h-40 rounded-full flex items-center justify-center ring-8 ring-background border-4 border-primary/10 p-2 transform group-hover:scale-110 transition-transform duration-300">
                                    {isValidUrl(service.icon) ? (
                                        <Image src={service.icon} alt={`${service.title} icon`} width={120} height={120} className="rounded-full object-contain" />
                                    ) : (
                                        <FontAwesomeIcon icon={faImage} className="h-20 w-20 text-muted-foreground/50" />
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-col flex-1 p-8 text-center">
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle className="font-headline text-2xl text-primary group-hover:text-accent transition-colors duration-300">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 flex-1 flex flex-col">
                                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{service.description}</p>
                                    
                                    <div className="flex flex-col justify-between items-center mt-auto gap-4">
                                        <div className="text-center">
                                            <p className="text-lg text-muted-foreground line-through">${service.originalPrice}</p>
                                            <p className="text-4xl font-bold font-headline text-primary">${service.price}</p>
                                            <Badge variant="destructive">Save 10%</Badge>
                                        </div>
                                        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-300 w-full">
                                            <Link href={`/services/${service.slug}`}>
                                                Learn More
                                                <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </div>
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
