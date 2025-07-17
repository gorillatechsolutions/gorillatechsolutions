
'use client';

import { useState, useMemo, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import type { CaseStudy } from '@/types/case-study';

const ITEMS_PER_PAGE = 9;

type CaseStudyListProps = {
  allCaseStudies: CaseStudy[];
  initialSearchTerm?: string;
  initialPage?: number;
};

export function CaseStudyList({ allCaseStudies, initialSearchTerm = '', initialPage = 1 }: CaseStudyListProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filteredCaseStudies = useMemo(() => {
    return allCaseStudies.filter(study =>
      study.title.toLowerCase().includes(initialSearchTerm.toLowerCase()) ||
      study.excerpt.toLowerCase().includes(initialSearchTerm.toLowerCase()) ||
      study.tags.some(tag => tag.toLowerCase().includes(initialSearchTerm.toLowerCase()))
    );
  }, [initialSearchTerm, allCaseStudies]);

  useEffect(() => {
    // Reset page to 1 when search term changes, but not on initial load
    if (initialSearchTerm !== (searchParams.get('search') || '')) {
      setCurrentPage(1);
    }
  }, [initialSearchTerm, searchParams]);
  
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);


  const totalPages = Math.ceil(filteredCaseStudies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCaseStudies = filteredCaseStudies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setCurrentPage(newPage);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };
  
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get('search') as string;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', searchTerm);
    params.delete('page'); // Reset to first page on new search
    router.push(`${pathname}?${params.toString()}`);
  }

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
            <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true"></i>
                <Input
                    type="search"
                    name="search"
                    placeholder="Search case studies..."
                    className="pl-10 text-base"
                    defaultValue={initialSearchTerm}
                />
                </div>
            </form>
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
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{objectFit: 'cover'}}
                          className="group-hover:scale-105 transition-transform duration-300"
                          data-ai-hint={post.dataAiHint}
                          loading="lazy"
                          />
                      </div>
                    </Link>
                  </CardHeader>
                  <div className="p-4 border-b border-border flex flex-wrap items-center justify-between text-xs text-muted-foreground gap-x-4 gap-y-2">
                      <div className="flex items-center gap-2">
                          <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                          <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <i className="fa fa-calendar" aria-hidden="true"></i>
                          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="fa fa-eye" aria-hidden="true"></i>
                        <span>{formatViews(post.views)}</span>
                      </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0.5 font-normal">{tag}</Badge>
                      ))}
                    </div>
                    <CardTitle className="font-headline text-xl mb-3 leading-tight flex-1">
                      <Link href={`/case-study/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm">
                        {post.excerpt.length > 160 ? `${post.excerpt.substring(0, 160)}...` : post.excerpt}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                      <Button asChild>
                          <Link href={`/case-study/${post.slug}`}>
                              Read More <i className="fa fa-arrow-right ml-2" aria-hidden="true"></i>
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
                <i className="fa fa-chevron-left h-4 w-4" aria-hidden="true"></i>
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
                <i className="fa fa-chevron-right h-4 w-4" aria-hidden="true"></i>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
