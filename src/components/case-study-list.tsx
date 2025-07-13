
'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, CalendarDays, UserCircle, Search, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type CaseStudy = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  dataAiHint: string;
  tags: string[];
  author: string;
  date: string;
};

type CaseStudyListProps = {
  allCaseStudies: CaseStudy[];
};

export function CaseStudyList({ allCaseStudies }: CaseStudyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCaseStudies, setFilteredCaseStudies] = useState(allCaseStudies);

  useEffect(() => {
    const results = allCaseStudies.filter(study =>
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCaseStudies(results);
  }, [searchTerm, allCaseStudies]);

  const cardViewStudies = filteredCaseStudies.slice(0, 6);
  const listViewStudies = filteredCaseStudies.slice(6);

  return (
    <>
      {/* Search Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search case studies..."
                className="pl-10 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          {filteredCaseStudies.length > 0 ? (
            <>
              {/* Card View */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cardViewStudies.map((post) => (
                  <Card key={post.slug} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-0">
                      <Link href={`/case-study/${post.slug}`} className="block overflow-hidden group">
                        <div className="relative h-56 w-full">
                            <Image
                            src={post.image}
                            alt={post.title}
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={post.dataAiHint}
                            loading="lazy"
                            />
                        </div>
                      </Link>
                    </CardHeader>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <CardTitle className="font-headline text-xl mb-3 leading-tight flex-1">
                        <Link href={`/case-study/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm">{post.excerpt}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                        <div className="w-full border-t border-border pt-4 flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <UserCircle className="h-4 w-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />
                                <span>{post.date}</span>
                            </div>
                        </div>
                        <Button asChild variant="link" className="p-0 h-auto text-primary">
                            <Link href={`/case-study/${post.slug}`}>
                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* List View */}
              {listViewStudies.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-3xl font-bold font-headline mb-8 text-center">More Case Studies</h2>
                  <div className="max-w-4xl mx-auto space-y-8">
                    {listViewStudies.map((post) => (
                      <Link key={post.slug} href={`/case-study/${post.slug}`} className="block group">
                        <Card className="overflow-hidden transition-shadow duration-300 group-hover:shadow-lg">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 md:col-span-2 flex flex-col">
                              <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.map(tag => (
                                  <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                              </div>
                              <h3 className="font-headline font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-muted-foreground text-sm flex-1 mb-4">{post.excerpt}</p>
                              <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                                <div className="flex items-center gap-2">
                                  <UserCircle className="h-4 w-4" />
                                  <span>{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CalendarDays className="h-4 w-4" />
                                  <span>{post.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="relative min-h-[200px] w-full md:min-h-full">
                              <Image
                                src={post.image}
                                alt={post.title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={post.dataAiHint}
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold font-headline">No case studies found.</h2>
              <p className="mt-2 text-muted-foreground">Try adjusting your search term.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
