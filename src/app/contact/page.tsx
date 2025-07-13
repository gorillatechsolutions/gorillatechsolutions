
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
    title: 'Contact Us | Gorilla Tech Solutions',
    description: 'Get in touch with Gorilla Tech Solutions. We are here to answer your questions and help you with your digital marketing needs. Reach out for a free consultation.',
};

const contactDetails = [
    {
        icon: <Mail className="h-8 w-8 text-accent" />,
        title: "Email Us",
        description: "For inquiries, support, and quotes.",
        contact: "hello@gorillatech.solutions",
        href: "mailto:hello@gorillatech.solutions"
    },
    {
        icon: <Phone className="h-8 w-8 text-accent" />,
        title: "Call Us",
        description: "Mon-Fri from 9am to 5pm.",
        contact: "+1 (234) 567-890",
        href: "tel:+1234567890"
    },
    {
        icon: <MapPin className="h-8 w-8 text-accent" />,
        title: "Our Office",
        description: "123 Marketing Lane, New York, NY 10001",
        contact: "Get Directions",
        href: "https://www.google.com/maps/search/?api=1&query=Empire+State+Building"
    }
];

export default function ContactPage() {
    return (
        <div className="w-full bg-background text-foreground">
            {/* Hero Section */}
            <section className="bg-secondary/30 pt-20 pb-12 md:pt-28 md:pb-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">Get in Touch</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Have a project in mind or a question? We're here to help you achieve your business goals.
                    </p>
                </div>
            </section>

            {/* Contact Details Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {contactDetails.map((detail) => (
                            <div key={detail.title} className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm hover:shadow-lg transition-shadow border">
                                <div className="p-4 bg-accent/10 rounded-full mb-4">
                                    {detail.icon}
                                </div>
                                <h3 className="font-headline text-xl font-semibold mb-2">{detail.title}</h3>
                                <p className="text-muted-foreground mb-3 flex-grow">{detail.description}</p>
                                <a href={detail.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline break-all">
                                    {detail.contact}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form and Map Section */}
            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl md:text-3xl">Send Us a Message</CardTitle>
                                <CardDescription>Fill out the form and we'll get back to you shortly.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ContactForm />
                            </CardContent>
                        </Card>

                        {/* Map */}
                        <div className="h-full min-h-[400px] lg:min-h-full">
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl border h-full">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.622941566416!2d-73.98784968459388!3d40.74844097932808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e196e1a73ab6!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1622550000000!5m2!1sen!2sus" 
                                    width="100%" 
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Map of Gorilla Tech Solutions Office Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
