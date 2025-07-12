import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle } from 'lucide-react';

const teamMembers = [
  { name: 'Jane Doe', role: 'CEO & Founder', image: 'https://placehold.co/100x100.png', initials: 'JD' , dataAiHint: 'professional woman'},
  { name: 'John Smith', role: 'Head of SEO', image: 'https://placehold.co/100x100.png', initials: 'JS', dataAiHint: 'professional man' },
  { name: 'Emily White', role: 'Lead Designer', image: 'https://placehold.co/100x100.png', initials: 'EW', dataAiHint: 'creative woman' },
  { name: 'Michael Brown', role: 'PPC Specialist', image: 'https://placehold.co/100x100.png', initials: 'MB', dataAiHint: 'focused man' },
];

const values = [
    "Innovation", "Integrity", "Results-Driven", "Collaboration", "Client Success"
]

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <header className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">About Gorilla Tech Solutions</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">We are a passionate team of digital marketing experts dedicated to helping your business thrive in the digital world.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
            <h2 className="font-headline text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
                Our mission is to empower businesses with innovative and effective digital marketing strategies. We believe in building partnerships, not just campaigns. By combining data-driven insights with creative excellence, we deliver measurable results that foster growth and build lasting brand value.
            </p>
            <Image src="https://placehold.co/600x400.png" alt="Office team collaborating" width={600} height={400} className="rounded-lg shadow-md" data-ai-hint="team collaboration" />
        </div>
        <div>
            <h2 className="font-headline text-3xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-3">
                {values.map(value => (
                    <li key={value} className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-accent" />
                        <span className="text-lg">{value}</span>
                    </li>
                ))}
            </ul>
        </div>
      </section>

      <section className="text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center border-0 shadow-none bg-transparent">
                <CardContent className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.dataAiHint} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold font-headline text-lg">{member.name}</p>
                        <p className="text-sm text-accent">{member.role}</p>
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
