
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Contact Us | Gorilla Tech Solutions',
    description: 'Get in touch with Gorilla Tech Solutions. We are here to answer your questions and help you with your digital marketing needs. Reach out for a free consultation.',
};

const contactDetails = [
    {
        icon: <Mail className="h-6 w-6 text-primary" />,
        title: "Email Us",
        value: "hello@gorillatech.solutions",
        href: "mailto:hello@gorillatech.solutions"
    },
    {
        icon: <Phone className="h-6 w-6 text-primary" />,
        title: "Call Us",
        value: "+1 (234) 567-890",
        href: "tel:+1234567890"
    },
    {
        icon: <MapPin className="h-6 w-6 text-primary" />,
        title: "Our Office",
        value: "123 Marketing Lane, New York, NY 10001",
    }
];

const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, href: '#' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, href: '#' },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: '#' },
]

export default function ContactPage() {
    return (
        <div className="w-full bg-background text-foreground">
            {/* Hero Section */}
            <section className="bg-secondary/30 pt-20 pb-12 md:pt-28 md:pb-20">
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
                        <Card className="shadow-lg border-border/80">
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
                             <Card className="shadow-lg border-border/80">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
                                    <CardDescription>Reach out to us through any of the channels below.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {contactDetails.map((detail) => (
                                        <div key={detail.title} className="flex items-start gap-4">
                                            <div className="p-2 bg-primary/10 rounded-full mt-1">
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

                            <Card className="shadow-lg border-border/80">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl">Follow Us</CardTitle>
                                    <CardDescription>Stay connected with us on social media.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                     <div className="flex gap-4">
                                        {socialLinks.map((social) => (
                                            <Button key={social.name} asChild variant="outline" size="icon" className="h-12 w-12 hover:bg-accent/80 hover:text-accent-foreground transition-colors">
                                                <Link href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                                    {social.icon}
                                                </Link>
                                            </Button>
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
