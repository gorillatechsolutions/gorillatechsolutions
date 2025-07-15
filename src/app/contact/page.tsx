
import { ContactForm } from "@/components/contact-form";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Contact Us | Gorilla Tech Solutions',
    description: 'Get in touch with Gorilla Tech Solutions. We are here to answer your questions and help you with your digital marketing needs. Reach out for a free consultation.',
};

const contactDetails = [
    {
        icon: <i className="fa fa-envelope h-6 w-6 text-primary" aria-hidden="true"></i>,
        title: "Email Us",
        value: "Business@GorillaTechSolution.com",
        href: "mailto:Business@GorillaTechSolution.com"
    },
    {
        icon: <i className="fa fa-phone h-6 w-6 text-primary" aria-hidden="true"></i>,
        title: "Call Us",
        value: "0381 359 9517",
        href: "tel:03813599517"
    },
    {
        icon: <i className="fa fa-map-marker h-6 w-6 text-primary" aria-hidden="true"></i>,
        title: "Our Office",
        value: "Agartala, Tripura (W) India, Pin: 799006",
    }
];

const socialLinks = [
    { name: 'Facebook', icon: 'https://placehold.co/32x32.png', dataAiHint: "facebook logo", href: '#' },
    { name: 'Twitter', icon: 'https://placehold.co/32x32.png', dataAiHint: "twitter logo", href: '#' },
    { name: 'Instagram', icon: 'https://placehold.co/32x32.png', dataAiHint: "instagram logo", href: '#' },
    { name: 'LinkedIn', icon: 'https://placehold.co/32x32.png', dataAiHint: "linkedin logo", href: '#' },
];


export default function ContactPage() {
    return (
        <div className="w-full bg-background text-foreground">
            {/* Hero Section */}
            <section className="bg-secondary/30 pt-16 pb-10 md:pt-24 md:pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">Get in Touch</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Have a project in mind or just want to say hello? We'd love to hear from you.
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
                                     <div className="flex gap-4">
                                        {socialLinks.map((social) => (
                                            <Link 
                                                key={social.name} 
                                                href={social.href} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                aria-label={social.name} 
                                                className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary hover:bg-accent/20 transition-colors"
                                            >
                                                <Image 
                                                    src={social.icon} 
                                                    alt={`${social.name} logo`}
                                                    width={24} 
                                                    height={24} 
                                                    data-ai-hint={social.dataAiHint}
                                                />
                                            </Link>
                                        ))}
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
