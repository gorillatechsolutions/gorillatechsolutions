
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Zap, Target, Users, TrendingUp, Handshake, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Our Digital Marketing Agency',
  description: 'Learn about the mission, values, and expert team at Gorilla Tech Solutions, dedicated to delivering exceptional digital marketing results.',
};

const teamMembers = [
  { name: 'Jane Doe', role: 'CEO & Founder', image: 'https://placehold.co/100x100.png', initials: 'JD' , dataAiHint: 'professional woman'},
  { name: 'John Smith', role: 'Head of SEO', image: 'https://placehold.co/100x100.png', initials: 'JS', dataAiHint: 'professional man' },
  { name: 'Emily White', role: 'Lead Designer', image: 'https://placehold.co/100x100.png', initials: 'EW', dataAiHint: 'creative woman' },
  { name: 'Michael Brown', role: 'PPC Specialist', image: 'https://placehold.co/100x100.png', initials: 'MB', dataAiHint: 'focused man' },
];

const values = [
    { icon: <Zap className="h-8 w-8 text-accent" />, title: "Innovation", description: "We constantly explore new technologies and strategies to keep you ahead of the curve." },
    { icon: <Target className="h-8 w-8 text-accent" />, title: "Results-Driven", description: "Our focus is on delivering measurable results that translate to real business growth." },
    { icon: <Users className="h-8 w-8 text-accent" />, title: "Collaboration", description: "We work as an extension of your team, fostering open communication and partnership." },
    { icon: <TrendingUp className="h-8 w-8 text-accent" />, title: "Client Success", description: "Your success is our ultimate metric. We are committed to helping you achieve your goals." },
    { icon: <Handshake className="h-8 w-8 text-accent" />, title: "Integrity", description: "We believe in transparency and honesty in all our interactions and campaign reporting." },
]

export default function AboutPage() {
  return (
    <div className="w-full">
      <section className="bg-secondary/50 py-20 md:py-32">
        <div className="container text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold">We're Gorilla Tech Solutions.</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                A passionate team of digital marketing experts dedicated to building powerful brands and driving measurable growth for businesses like yours.
            </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                <h2 className="font-headline text-3xl font-bold mb-4">Our Story: From Idea to Impact</h2>
                <p className="text-muted-foreground mb-4">
                    Founded on the belief that every business deserves a powerful digital presence, Gorilla Tech Solutions started with a mission: to empower companies with innovative and effective digital marketing strategies. We believe in building true partnerships, not just managing campaigns. 
                </p>
                <p className="text-muted-foreground">
                    By combining data-driven insights with creative excellence, we deliver tangible results that foster sustainable growth and build lasting brand value in a crowded digital world.
                </p>
            </div>
            <div className="order-1 md:order-2">
                <Image src="https://placehold.co/600x400.png" alt="Our team collaborating on a digital marketing project" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="team collaboration" loading="lazy" />
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
            <header className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Core Values</h2>
                <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">The principles that guide our work and our partnerships.</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map(value => (
                    <Card key={value.title} className="text-center p-4">
                        <CardHeader className="items-center">
                            <div className="p-3 bg-accent/10 rounded-full">
                                {value.icon}
                            </div>
                            <CardTitle className="font-headline mt-4">{value.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{value.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-12">Meet Our Expert Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex flex-col items-center gap-4">
                    <Avatar className="h-28 w-28">
                        <AvatarImage src={member.image} alt={`Portrait of ${member.name}, ${member.role}`} data-ai-hint={member.dataAiHint} loading="lazy" />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <p className="font-semibold font-headline text-lg">{member.name}</p>
                        <p className="text-sm text-accent font-medium">{member.role}</p>
                    </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t">
          <div className="container text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Grow Your Business?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Let's talk about how our expertise can help you achieve your digital marketing goals.
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
