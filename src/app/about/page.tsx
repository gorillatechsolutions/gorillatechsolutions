
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Target, TrendingUp, Handshake, ArrowRight, Zap, Users, Star } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Our Digital Marketing Agency',
  description: 'Learn about the mission, values, and expert team at Gorilla Tech Solutions, dedicated to delivering exceptional digital marketing results.',
};

const values = [
    { icon: <Zap className="h-10 w-10 text-primary" />, title: "Innovation", description: "We constantly explore new technologies and strategies to keep you ahead of the curve, ensuring your business benefits from the latest digital marketing advancements." },
    { icon: <Target className="h-10 w-10 text-primary" />, title: "Results-Driven", description: "Our focus is on delivering measurable results that translate to real business growth. We track key metrics to ensure our campaigns are effective and impactful." },
    { icon: <Users className="h-10 w-10 text-primary" />, title: "Client Partnership", description: "We work as an extension of your team, fostering open communication and true collaboration to achieve shared goals and build long-term relationships." },
    { icon: <Handshake className="h-10 w-10 text-primary" />, title: "Integrity", description: "We believe in transparency and honesty in all our interactions. You'll receive clear, straightforward reporting on all campaign activities and results." },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-secondary/30 pt-20 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4 text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">About Gorilla Tech Solutions</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                A passionate team of digital marketing experts dedicated to building powerful brands and driving measurable growth for businesses like yours.
            </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="font-headline text-3xl font-bold mb-4 text-primary">From Vision to Victory: Our Story</h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                        Founded on the principle that every business deserves a powerful digital presence, Gorilla Tech Solutions began with a singular mission: to empower companies with innovative and effective digital marketing strategies. We saw a gap between agencies and clients and decided to fill it by building true partnerships, not just managing campaigns.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        By combining data-driven insights with creative excellence, we deliver tangible results that foster sustainable growth and build lasting brand value in a crowded digital world. Our journey is defined by the success of our clients.
                    </p>
                </div>
                <div className="relative h-80 md:h-96">
                    <Image src="https://placehold.co/600x450.png" alt="Our team collaborating on a project" layout="fill" objectFit="cover" className="rounded-lg shadow-xl" data-ai-hint="team collaboration" loading="lazy" />
                </div>
            </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <header className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">The Principles That Guide Us</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">Our core values are the bedrock of our company culture and client relationships, ensuring we deliver excellence in every project.</p>
          </header>
          <div className="flex flex-col gap-16 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div key={value.title} className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0">
                    <div className="p-6 bg-primary/10 rounded-full">
                        {value.icon}
                    </div>
                </div>
                <div className={`text-center md:text-left ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                    <h3 className="font-headline text-2xl font-bold mb-2 text-primary">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Ready to Elevate Your Brand?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Let's discuss how our digital marketing expertise can help you achieve your business goals. Your journey to digital excellence starts here.
              </p>
              <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/contact">
                      Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
