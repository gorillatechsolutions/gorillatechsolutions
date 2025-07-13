
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, ListChecks, Rocket, CheckCircle, Percent, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const processSteps = [
    {
        icon: <Search className="h-10 w-10 text-accent" />,
        title: 'Discovery',
        description: 'We start by understanding your business, goals, and target audience to lay the groundwork for a successful strategy.'
    },
    {
        icon: <ListChecks className="h-10 w-10 text-accent" />,
        title: 'Planning',
        description: 'Our team crafts a detailed, data-driven plan, outlining the key strategies and milestones for your project.'
    },
    {
        icon: <Rocket className="h-10 w-10 text-accent" />,
        title: 'Execution',
        description: 'We launch your campaigns, continuously optimizing for performance and delivering measurable results.'
    },
    {
        icon: <Award className="h-10 w-10 text-accent" />,
        title: 'Review & Launch',
        description: 'We review the results, provide detailed reports, and successfully launch your project for the world to see.'
    }
];

const stats = [
    { value: 98, label: 'On-Time Delivery', description: 'of projects delivered on schedule' },
    { value: 99, label: 'Client Satisfaction', description: 'Based on 500+ completed projects' },
    { value: 97, label: 'Goal Achievement', description: 'Projects meet or exceed expectations' }
];

const benefits = [
    'Clear Communication',
    'Regular Updates',
    'Quality Assurance',
    '24/7 Support'
];

export default function Home() {
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center" style={{ backgroundColor: '#F1F4F7' }}>
        <div className="w-[95%] grid items-center justify-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center justify-center space-y-6 text-center lg:items-start lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-foreground">
              Elevate Your Digital Marketing
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-[600px]">
              Gorilla Tech Solutions drives growth with data-driven digital marketing strategies that convert. Let's build your brand's future, together.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                <Link href="/application">
                  Get Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform transform hover:scale-105 border-border hover:bg-secondary">
                <Link href="/services">
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              width={600}
              height={400}
              alt="Team discussing digital marketing strategy on a whiteboard"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              data-ai-hint="digital marketing"
              priority={true}
            />
          </div>
        </div>
      </section>

      {/* Our Proven Process Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">From Idea to Reality</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">in 4 Simple Steps</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {processSteps.map((step) => (
              <Card key={step.title} className="flex flex-col text-center items-center bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
                <div className="p-4 bg-accent/10 rounded-full mb-4">
                  {step.icon}
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="font-headline text-xl mb-2">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-secondary/30 p-8 md:p-12 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-6">Why Our Process Works</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                        {stats.map(stat => (
                            <div key={stat.label} className="text-center">
                                <div className="relative text-5xl font-bold font-headline text-accent">
                                    {stat.value}<span className="text-3xl">%</span>
                                </div>
                                <p className="font-semibold mt-2">{stat.label}</p>
                                <p className="text-sm text-muted-foreground">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <ul className="space-y-4">
                        {benefits.map(benefit => (
                            <li key={benefit} className="flex items-center gap-3">
                                <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                                <span className="text-lg text-foreground">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
