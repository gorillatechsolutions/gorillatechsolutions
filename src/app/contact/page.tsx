
'use client';

import { ContactForm } from "@/components/contact-form";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useContactSettings } from "@/contexts/contact-settings-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin, faGithub, faGoogle, faWhatsapp, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Providers } from "@/components/providers";

const socialIconMap: { [key: string]: any } = {
    facebook: faFacebook,
    twitter: faTwitter,
    instagram: faInstagram,
    linkedin: faLinkedin,
    github: faGithub,
    googleMyBusiness: faGoogle,
    whatsapp: faWhatsapp,
    telegram: faTelegram,
};

function ContactPageContent() {
    const { settings, loading } = useContactSettings();
    
    const { phone, email, address, zip, socialLinks, heroTitle, heroSubtitle } = settings;

    const contactDetails = [
        {
            icon: <i className="fa fa-envelope h-6 w-6 text-primary" aria-hidden="true"></i>,
            title: "Email Us",
            value: email,
            href: `mailto:${email}`
        },
        {
            icon: <i className="fa fa-phone h-6 w-6 text-primary" aria-hidden="true"></i>,
            title: "Call Us",
            value: phone,
            href: `tel:${phone}`
        },
        {
            icon: <i className="fa fa-map-marker h-6 w-6 text-primary" aria-hidden="true"></i>,
            title: "Our Office",
            value: `${address}, Pin: ${zip}`,
        }
    ];

    if (loading) {
        return (
            <div className="w-full bg-background text-foreground space-y-12">
                <section className="relative bg-secondary/30 pt-16 pb-10 md:pt-24 md:pb-16">
                    <div className="container mx-auto px-4 text-center">
                        <Skeleton className="h-12 w-2/3 mx-auto" />
                        <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div className="w-full bg-background text-foreground">
            {/* Hero Section */}
            <section className="bg-secondary/30 pt-16 pb-10 md:pt-24 md:pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">{heroTitle}</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        {heroSubtitle}
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <Card className="border-border/80">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl md:text-3xl">Send Us a Message</CardTitle>
                                <CardDescription>Fill out the form and our team will get back to you within 24 hours.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ContactForm />
                            </CardContent>
                        </Card>

                        {/* Contact Info & Socials */}
                        <div className="space-y-8">
                             <Card className="border-border/80">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
                                    <CardDescription>Reach out to us through any of the channels below.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {contactDetails.map((detail) => (
                                        <div key={detail.title} className="flex items-start gap-4">
                                            <div className="p-2 bg-primary/10 rounded-full mt-1 flex items-center justify-center w-10 h-10">
                                                {detail.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg text-foreground">{detail.title}</h3>
                                                {detail.href ? (
                                                     <a href={detail.href} className="text-muted-foreground hover:text-primary transition-colors break-all">
                                                        {detail.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-muted-foreground">{detail.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="border-border/80">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl">Follow Us</CardTitle>
                                    <CardDescription>Stay connected with us on social media.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                     <div className="flex flex-wrap gap-4">
                                        {socialLinks && Object.entries(socialLinks).map(([name, href]) => {
                                          if (!href) return null;
                                          const icon = socialIconMap[name];
                                          return (
                                            <Link 
                                                key={name} 
                                                href={href} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                aria-label={name} 
                                                className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary hover:bg-accent/20 transition-colors"
                                            >
                                               <FontAwesomeIcon icon={icon} className="h-6 w-6 text-foreground" />
                                            </Link>
                                          )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default function ContactPage() {
    return (
        <Providers>
            <ContactPageContent />
        </Providers>
    )
}
