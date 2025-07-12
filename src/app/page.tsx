import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32" style={{ backgroundColor: '#F1F4F7' }}>
        <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:grid-cols-1">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-foreground">
              Amplify Your Digital Presence
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-[600px] mx-auto">
              Gorilla Tech Solutions drives growth with data-driven digital marketing strategies that convert. Let's build your brand's future, together.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                <Link href="/application">
                  Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform transform hover:scale-105 border-border hover:bg-secondary">
                <Link href="/services">
                  Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
