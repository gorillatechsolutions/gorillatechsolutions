
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
                        <div className="space-y-4 max-w-4xl mx-auto">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-32 w-full rounded-lg" />
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
                <div className="max-w-4xl mx-auto space-y-6">
                    {services.map((service) => (
                         <Card key={service.slug} className="shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl border-border/80 flex flex-col md:flex-row overflow-hidden relative">
                            {service.popular && (
                                <div className="ribbon-wrapper">
                                    <div className="ribbon">
                                        <FontAwesomeIcon icon={faAward} className="mr-1.5" />
                                        Popular
                                    </div>
                                </div>
                            )}
                            <div className="md:w-1/3 flex-shrink-0 flex items-center justify-center p-6 bg-secondary/30">
                                <div className="bg-card w-32 h-32 rounded-full flex items-center justify-center ring-8 ring-background border-4 border-primary/20 p-2">
                                    {isValidUrl(service.icon) ? (
                                        <Image src={service.icon} alt={`${service.title} icon`} width={100} height={100} className="rounded-full object-contain" />
                                    ) : (
                                        <FontAwesomeIcon icon={faImage} className="h-16 w-16 text-muted-foreground" />
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-col flex-1">
                                <CardHeader className="pt-6 pb-2">
                                    <CardTitle className="font-headline text-2xl text-primary">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="px-6 pb-6 flex flex-col flex-1">
                                    <p className="text-muted-foreground mb-6 flex-1">{service.description}</p>
                                    
                                    <div className="flex justify-between items-center mt-auto">
                                        <div className="text-left">
                                            <p className="text-sm text-muted-foreground line-through">${service.originalPrice}</p>
                                            <p className="text-3xl font-bold font-headline text-amber-700">${service.price}</p>
                                            <p className="text-xs text-accent font-semibold">Limited Offer | Save 10%</p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                            <Button asChild>
                                                <Link href={`/services/${service.slug}`}>Learn More</Link>
                                            </Button>
                                        </div>
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
