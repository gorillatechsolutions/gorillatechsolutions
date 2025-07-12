import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container py-12 md:py-20">
            <header className="text-center mb-16">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Have a project in mind or just want to say hello? We'd love to hear from you.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="space-y-8">
                    <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-accent/10 rounded-full text-accent mt-1">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Our Office</h3>
                            <p className="text-muted-foreground">123 Marketing Lane<br/>New York, NY 10001</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                         <div className="p-3 bg-accent/10 rounded-full text-accent mt-1">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Email Us</h3>
                            <a href="mailto:hello@gorillatech.solutions" className="text-muted-foreground hover:text-primary">hello@gorillatech.solutions</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                         <div className="p-3 bg-accent/10 rounded-full text-accent mt-1">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Call Us</h3>
                            <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">+1 (234) 567-890</a>
                        </div>
                    </div>
                </div>
                <div>
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
