import { Button } from '@/components/ui/button';
import { ArrowRight, MoveRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full">
      <section className="relative w-full bg-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{'--stroke': 'hsl(var(--border))'}}></div>
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-16 md:py-24">
          <div className="animate-fade-in-up text-center lg:text-left">
            <div className="max-w-3xl mx-auto lg:mx-0">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
                Amplify Your Digital Presence
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Gorilla Tech Solutions drives growth with data-driven digital marketing strategies that convert. Let's build your brand's future, together.
              </p>
            </div>
            <div className="mt-8 flex justify-center lg:justify-start gap-4 flex-wrap">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                <Link href="/application">
                  Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform transform hover:scale-105">
                <Link href="/services">
                  Our Services <MoveRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Image 
              src="https://placehold.co/600x600.png"
              alt="Digital Marketing Agency"
              width={600}
              height={600}
              className="rounded-full shadow-2xl"
              data-ai-hint="digital marketing"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
