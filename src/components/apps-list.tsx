
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Star, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

type AppLinks = {
  web?: string;
  playStore?: string;
  appStore?: string;
  download?: string;
};

type App = {
  title: string;
  category: string;
  rating: number;
  downloads: string;
  icon: string;
  dataAiHint: string;
  links: AppLinks;
};

type AppsListProps = {
  allApps: App[];
};

const ITEMS_PER_PAGE = 12;

const GooglePlayStoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3.86 2.14a.5.5 0 0 0-.42.23l-1.35 2.45a.5.5 0 0 0 .04.59l8.65 8.65a.5.5 0 0 0 .7 0l8.65-8.65a.5.5 0 0 0 .04-.59L20.56 2.37a.5.5 0 0 0-.42-.23H3.86zM12 15l-4.24-4.24 .88-.88L12 13.2l3.36-3.36.88.88L12 15zM2.14 8.86l-1.7 1.7a.5.5 0 0 0 0 .7l10.85 10.85a.5.5 0 0 0 .7 0l10.85-10.85a.5.5 0 0 0 0-.7l-1.7-1.7L12 18.29 2.14 8.86z"/>
    </svg>
);


const IosAppStoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/>
        <path d="M10 2c1 .5 2 2 2 5"/>
    </svg>
);


export function AppsList({ allApps }: AppsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allApps.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApps = allApps.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {paginatedApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedApps.map((app) => (
            <Card key={app.title} className="flex flex-col overflow-hidden group border-border/80 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-start gap-4 p-4">
                  <Image
                      src={app.icon}
                      alt={`${app.title} icon`}
                      width={64}
                      height={64}
                      className="rounded-xl border"
                      data-ai-hint={app.dataAiHint}
                      loading="lazy"
                  />
                  <div className="flex-1">
                      <CardTitle className="font-headline text-lg mb-1">{app.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{app.category}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>{app.rating}</span>
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <span className="text-xs">({app.downloads})</span>
                      </div>
                  </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-end">
                <div className="flex flex-wrap gap-2">
                  {app.links.playStore && (
                      <Button asChild variant="outline" size="sm" className="flex-1 min-w-[40px]">
                          <Link href={app.links.playStore} target="_blank" rel="noopener noreferrer" aria-label={`Get ${app.title} on Google Play`}>
                              <GooglePlayStoreIcon />
                          </Link>
                      </Button>
                  )}
                  {app.links.appStore && (
                      <Button asChild variant="outline" size="sm" className="flex-1 min-w-[40px]">
                          <Link href={app.links.appStore} target="_blank" rel="noopener noreferrer" aria-label={`Download ${app.title} on the App Store`}>
                              <IosAppStoreIcon />
                          </Link>
                      </Button>
                  )}
                  {app.links.web && (
                      <Button asChild variant="outline" size="sm" className="flex-1 min-w-[40px]">
                          <Link href={app.links.web} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${app.title} website`}>
                              <Globe className="h-5 w-5" />
                          </Link>
                      </Button>
                  )}
                  {app.links.download && (
                       <Button asChild variant="outline" size="sm" className="flex-1 min-w-[40px]">
                          <Link href={app.links.download} download aria-label={`Download ${app.title}`}>
                              <Download className="h-5 w-5" />
                          </Link>
                      </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold font-headline">No applications found.</h2>
          <p className="mt-2 text-muted-foreground">Check back later for our new apps!</p>
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
    </>
  );
}
