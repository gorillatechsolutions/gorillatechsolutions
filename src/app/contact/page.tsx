import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: 'Contact Us for Digital Marketing Services',
    description: 'Get in touch with Gorilla Tech Solutions. Contact us for a free quote or to discuss your project. We are ready to help you grow your business.',
};

export default function ContactPage() {
    return (
        <div className="w-full bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative bg-secondary/30 pt-20 pb-12 md:pt-28 md:pb-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">Get in Touch</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Have a project in mind, a question, or just want to say hello? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-5 gap-12">

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <Card className="shadow-lg h-full">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl md:text-3xl">Send Us a Message</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ContactForm />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-8">
                             <div className="p-6 bg-card rounded-lg shadow-sm border">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/10 rounded-full text-accent mt-1">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Email Us</h3>
                                        <p className="text-muted-foreground">For inquiries, support, and quotes.</p>
                                        <a href="mailto:hello@gorillatech.solutions" className="text-primary font-medium hover:underline break-all">hello@gorillatech.solutions</a>
                                    </div>
                                </div>
                            </div>
                             <div className="p-6 bg-card rounded-lg shadow-sm border">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/10 rounded-full text-accent mt-1">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Call Us</h3>
                                        <p className="text-muted-foreground">Mon-Fri from 9am to 5pm.</p>
                                        <a href="tel:+1234567890" className="text-primary font-medium hover:underline">+1 (234) 567-890</a>
                                    </div>
                                </div>
                            </div>
                           <div className="p-6 bg-card rounded-lg shadow-sm border">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/10 rounded-full text-accent mt-1">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Our Office</h3>
                                        <p className="text-muted-foreground">123 Marketing Lane<br/>New York, NY 10001</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Map Section */}
            <section className="bg-secondary/30">
                <div className="container mx-auto px-4 sm:px-0 py-16 md:py-24">
                     <div className="max-w-6xl mx-auto">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary text-center mb-8">Find Us Here</h2>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl border">
                             <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.622941566416!2d-73.98784968459388!3d40.74844097932808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e196e1a73ab6!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1622550000000!5m2!1sen!2sus" 
                                width="100%" 
                                height="450" 
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map of Gorilla Tech Solutions Office Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
