
'use client';

import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLegalPage } from '@/contexts/legal-page-context';
import { Skeleton } from '@/components/ui/skeleton';
import parse from 'html-react-parser';

export default function TermsAndConditionsPage() {
  const { content, loading } = useLegalPage();
  
  if (loading) {
      return (
          <div className="w-full text-foreground" style={{ backgroundColor: '#f2f3f5' }}>
            <section className="bg-secondary/30 pt-8 pb-0 md:pt-12">
              <div className="container mx-auto px-4 text-center">
                <Skeleton className="h-12 w-1/2 mx-auto" />
                <Skeleton className="h-6 w-1/3 mx-auto mt-4" />
              </div>
            </section>
            <section>
              <div className="container mx-auto px-4">
                <Card className="max-w-4xl mx-auto border-border/80">
                  <CardContent className="p-8 md:p-10">
                    <Skeleton className="h-96 w-full" />
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
      )
  }

  return (
    <div className="w-full text-foreground" style={{ backgroundColor: '#f2f3f5' }}>
      <section className="bg-secondary/30 pt-8 pb-0 md:pt-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Terms and Conditions</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-border/80">
            <CardContent className="p-8 md:p-10 prose prose-lg max-w-none mx-auto text-foreground prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80 bg-[#faf7f7]">
                {parse(content.termsAndConditions)}
              <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/contact">Contact Us</Link>
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
