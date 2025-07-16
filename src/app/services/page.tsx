
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'A comprehensive suite of digital marketing services designed to elevate your brand and accelerate growth.',
};

export default function ServicesPage() {
  return (
    <div className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
            <header className="text-center mb-16">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Digital Marketing Services</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    This page is currently being updated.
                </p>
            </header>
        </div>
    </div>
  );
}
