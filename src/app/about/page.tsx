
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAboutPage } from '@/contexts/about-page-context';
import { Skeleton } from '@/components/ui/skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBullseye, faUsers, faHandshake } from '@fortawesome/free-solid-svg-icons';
import {createElement } from 'react';
import { icons } from 'lucide-react';
import { PublicProviders } from '@/components/providers';


const lucideIcons: { [key: string]: React.ElementType } = icons;
const faIcons: { [key: string]: any } = {
    Bolt: faBolt,
    Bullseye: faBullseye,
    Users: faUsers,
    Handshake: faHandshake,
};

function AboutPageContent() {
    const { content, loading } = useAboutPage();

    if (loading) {
        return (
            <div className="w-full bg-background text-foreground space-y-12">
                {/* Hero Skeleton */}
                <section className="relative bg-secondary/30 pt-20 pb-12 md:pt-32 md:pb-20">
                    <div className="container mx-auto px-4 text-center">
                        <Skeleton className="h-12 w-2/3 mx-auto" />
                        <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                    </div>
                </section>
                {/* Story Skeleton */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <Skeleton className="h-10 w-3/4 mb-4" />
                                <Skeleton className="h-5 w-full mb-2" />
                                <Skeleton className="h-5 w-full mb-2" />
                                <Skeleton className="h-5 w-5/6" />
                            </div>
                            <Skeleton className="h-80 md:h-96 w-full rounded-lg" />
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    const {
        metaTitle,
        metaDescription,
        metaOgImage,
        heroTitle,
        heroSubtitle,
        storyTitle,
        storyParagraph1,
        storyParagraph2,
        storyImage,
        storyImageAiHint,
        valuesTitle,
        valuesSubtitle,
        values,
        ctaTitle,
        ctaSubtitle
    } = content;
    
  return (
      <div className="w-full bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative bg-secondary/30 pt-20 pb-12 md:pt-32 md:pb-20">
          <div className="container mx-auto px-4 text-center">
              <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">{heroTitle}</h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  {heroSubtitle}
              </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="font-headline text-3xl font-bold mb-4 text-primary">{storyTitle}</h2>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                          {storyParagraph1}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                          {storyParagraph2}
                      </p>
                  </div>
                  <div className="relative h-80 md:h-96">
                      <Image src={storyImage} alt="Our team collaborating on a project" layout="fill" objectFit="cover" className="rounded-lg shadow-xl" data-ai-hint={storyImageAiHint} loading="lazy" />
                  </div>
              </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <header className="text-center mb-16">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{valuesTitle}</h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">{valuesSubtitle}</p>
            </header>
            <div className="flex flex-col gap-16 max-w-4xl mx-auto">
              {values.map((value, index) => {
                let iconComponent = null;
                const iconProps = { className: 'h-8 w-8 text-primary' };
                const faIcon = faIcons[value.icon];
                const lucideIcon = lucideIcons[value.icon];

                if (faIcon) {
                    iconComponent = <FontAwesomeIcon icon={faIcon} {...iconProps} />;
                } else if (lucideIcon) {
                    iconComponent = createElement(lucideIcon, iconProps);
                }

                return (
                <div 
                  key={value.title} 
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 rounded-lg ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                  <div className="flex-shrink-0">
                      <div className="p-6 bg-card rounded-lg shadow-md border flex items-center justify-center w-24 h-24">
                          {iconComponent}
                      </div>
                  </div>
                  <div className={`text-center md:text-left ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                      <h3 className="font-headline text-2xl font-bold mb-2 text-primary">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4 text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{ctaTitle}</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    {ctaSubtitle}
                </p>
                <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                    <Link href="/contact">
                        Get in Touch <i className="fa fa-arrow-right ml-2" aria-hidden="true"></i>
                    </Link>
                </Button>
            </div>
        </section>
      </div>
  );
}

export default function AboutPage() {
    return (
        <PublicProviders>
            <AboutPageContent />
        </PublicProviders>
    )
}
