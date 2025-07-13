
import { Button } from '@/components/ui/button';
import { Frown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] py-12 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Frown className="h-24 w-24 text-muted-foreground/50" strokeWidth={1.5} />
        <h1 className="text-8xl font-extrabold font-headline text-primary tracking-tighter">404</h1>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Page Not Found
        </h2>
        <p className="mt-2 max-w-md text-lg text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Button asChild className="mt-6" size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
