
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlassChart,
  faBullseye,
  faShareNodes,
  faPenRuler,
  faCode,
  faEnvelopeOpenText,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const services = [
    {
        icon: <FontAwesomeIcon icon={faMagnifyingGlassChart} className="h-10 w-10 text-primary" />,
        title: "SEO Optimization",
        slug: "seo-optimization",
        description: "Boost your visibility on search engines and drive organic traffic with our data-driven SEO strategies.",
        price: "450.00"
    },
    {
        icon: <FontAwesomeIcon icon={faBullseye} className="h-10 w-10 text-primary" />,
        title: "PPC Management",
        slug: "ppc-management",
        description: "Maximize your ROI with targeted pay-per-click campaigns on Google, Meta, and other platforms.",
        price: "650.00"
    },
    {
        icon: <FontAwesomeIcon icon={faShareNodes} className="h-10 w-10 text-primary" />,
        title: "Social Media Marketing",
        slug: "social-media-marketing",
        description: "Engage your audience and build a loyal community. We create and manage social media campaigns that resonate.",
        price: "320.00"
    },
    {
        icon: <FontAwesomeIcon icon={faPenRuler} className="h-10 w-10 text-primary" />,
        title: "Content Creation",
        slug: "content-creation",
        description: "From blog posts to video scripts, our creative team produces high-quality content that captivates your audience.",
        price: "280.00"
    },
    {
        icon: <FontAwesomeIcon icon={faCode} className="h-10 w-10 text-primary" />,
        title: "Web Development",
        slug: "web-development",
        description: "We build fast, responsive, and user-friendly websites that provide an exceptional user experience.",
        price: "1,200.00"
    },
    {
        icon: <FontAwesomeIcon icon={faEnvelopeOpenText} className="h-10 w-10 text-primary" />,
        title: "Email Marketing",
        slug: "email-marketing",
        description: "Nurture leads and drive conversions with automated email campaigns and personalized newsletters.",
        price: "250.00"
    }
];

export default function ServicesPage() {
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
                         <Card key={service.title} className="relative text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl pt-16 border-border/80 flex flex-col">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                                <div className="bg-card w-24 h-24 rounded-full flex items-center justify-center ring-8 ring-background border-4 border-primary/50">
                                    {service.icon}
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl text-primary">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6 flex flex-col flex-1">
                                <p className="text-muted-foreground mb-6 flex-1">{service.description}</p>
                                
                                <div className="bg-secondary/40 rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">Starting at</p>
                                    <p className="text-4xl font-bold font-headline text-foreground">${service.price}</p>
                                    <div className="text-center mt-2">
                                        <p className="text-sm text-muted-foreground font-sans">
                                            Limited Offer | <span className="font-semibold text-accent">Save 10%!</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row gap-2">
                                     <Button asChild className="flex-1">
                                        <Link href="/contact">Contact Us</Link>
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
