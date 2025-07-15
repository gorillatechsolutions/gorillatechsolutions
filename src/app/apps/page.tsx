
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Smartphone, Globe, HardDriveDownload } from 'lucide-react';
import { AppsList } from '@/components/apps-list';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { apps } from '@/lib/apps-data';
import type { AppFilter } from '@/app/apps/page';

export default function AppsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const searchTerm = typeof searchParams?.search === 'string' ? searchParams.search : '';
  const filter = (typeof searchParams?.filter === 'string' ? searchParams.filter : 'all') as AppFilter;
  
  return (
    <div className="w-full bg-background text-foreground">
      <section className="bg-secondary/30 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Our Suite of Applications</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover powerful, intuitive, and beautifully designed applications to enhance your productivity, streamline workflows, and drive business growth.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
             <form action="/apps" method="GET">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  name="search"
                  placeholder="Search our apps..."
                  className="pl-10 text-base w-full"
                  defaultValue={searchTerm}
                />
                 {filter !== 'all' && <input type="hidden" name="filter" value={filter} />}
              </div>
            </form>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button asChild variant={filter === 'all' ? 'default' : 'outline'}>
                    <Link href={`/apps?search=${searchTerm}`}>All Apps</Link>
                </Button>
                <Button asChild variant={filter === 'mobile' ? 'default' : 'outline'}>
                    <Link href={`/apps?filter=mobile&search=${searchTerm}`}>
                        <Smartphone className="mr-2 h-4 w-4"/>
                        Mobile Apps
                    </Link>
                </Button>
                <Button asChild variant={filter === 'web' ? 'default' : 'outline'}>
                    <Link href={`/apps?filter=web&search=${searchTerm}`}>
                        <Globe className="mr-2 h-4 w-4"/>
                        Web Apps
                    </Link>
                </Button>
                <Button asChild variant={filter === 'desktop' ? 'default' : 'outline'}>
                    <Link href={`/apps?filter=desktop&search=${searchTerm}`}>
                        <HardDriveDownload className="mr-2 h-4 w-4"/>
                        Desktop Apps
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <AppsList allApps={apps} searchTerm={searchTerm} filter={filter} />
        </div>
      </section>

       <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Have a Project in Mind?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Let's turn your idea into a powerful application. Our expert team is ready to build the perfect solution for your business needs.
              </p>
              <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/contact">
                      Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}

export type AppFilter = 'all' | 'mobile' | 'web' | 'desktop';
