
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, CalendarDays, UserCircle, Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
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
  views: number;
};

type CaseStudyListProps = {
  allCaseStudies: CaseStudy[];
};

const ITEMS_PER_PAGE = 9;

export function CaseStudyList({ allCaseStudies }: CaseStudyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCaseStudies = useMemo(() => {
    return allCaseStudies.filter(study =>
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, allCaseStudies]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredCaseStudies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCaseStudies = filteredCaseStudies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };
  
  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views;
  };

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
          {paginatedCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedCaseStudies.map((post) => (
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
                           <div className="flex items-center gap-4">
                               <div className="flex items-center gap-2">
                                  <CalendarDays className="h-4 w-4" />
                                  <span>{post.date}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Eye className="h-4 w-4" />
                                <span>{formatViews(post.views)}</span>
                              </div>
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
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold font-headline">No case studies found.</h2>
              <p className="mt-2 text-muted-foreground">Try adjusting your search term.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                aria-label="Go to previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
