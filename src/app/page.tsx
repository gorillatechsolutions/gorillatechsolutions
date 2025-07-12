import { Button } from '@/components/ui/button';
import { ArrowRight, MoveRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full">
      <section className="relative w-full h-[85vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://placehold.co/1920x1080.png"
            alt="Team working on a project"
            fill
            style={{objectFit: 'cover'}}
            className="object-center"
            data-ai-hint="digital marketing team"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 container px-4 sm:px-6 lg:px-8 animate-fade-in-up max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Amplify Your Digital Presence
            </h1>
            <p className="mt-6 text-lg text-neutral-200 md:text-xl">
              Gorilla Tech Solutions drives growth with data-driven digital marketing strategies that convert. Let's build your brand's future, together.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                <Link href="/application">
                  Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform transform hover:scale-105 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link href="/services">
                  Our Services <MoveRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
