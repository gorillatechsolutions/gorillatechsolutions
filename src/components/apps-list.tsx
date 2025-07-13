
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Star, Globe, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  description: string;
  icon: string;
  dataAiHint: string;
  links: AppLinks;
};

type AppsListProps = {
  allApps: App[];
};

const ITEMS_PER_PAGE = 12;

const GooglePlayStoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M21.53,9.13l-1.5-1.5L12,12l8.03,8.03,1.5-1.5-2-3.46,2-3.47ZM2.47,20.87l1.5,1.5,6-6-6-6-1.5,1.5,2,3.47-2,3.46Z" />
    </svg>
);

const IosAppStoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M19.3,4.31A3.18,3.18,0,0,0,16.24,3a4.34,4.34,0,0,0-4.24,4.45,1,1,0,0,0,1,1,1,1,0,0,0,1-1,2.33,2.33,0,0,1,2.23-2.45,2.1,2.1,0,0,1,2,2.2,2.18,2.18,0,0,1-1.7,2.32,3.45,3.45,0,0,0-3.3,3.4v.1a1,1,0,0,0,1,1h.1a1,1,0,0,0,1-1v-.1a1.44,1.44,0,0,1,1.3-1.4,3.18,3.18,0,0,0,3.18-3.18A3.44,3.44,0,0,0,19.3,4.31ZM12,13.16a3.39,3.39,0,0,0-3.29,2.4,1,1,0,0,0,1,.8H14.3a1,1,0,0,0,1-.8A3.39,3.39,0,0,0,12,13.16Z"/>
    </svg>
);


export function AppsList({ allApps }: AppsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const totalPages = Math.ceil(allApps.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApps = allApps.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handleShare = async (app: App) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: app.title,
          text: app.description,
          url: window.location.href, // Or a specific app URL if available
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      try {
          await navigator.clipboard.writeText(`${app.title} - ${app.description}. Find out more at ${window.location.href}`);
          toast({
              title: "Link Copied!",
              description: "App details copied to clipboard.",
          });
      } catch (err) {
          toast({
              variant: "destructive",
              title: "Failed to Copy",
              description: "Could not copy link to clipboard.",
          });
      }
    }
  };


  return (
    <>
      {paginatedApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedApps.map((app) => (
            <Card key={app.title} className="flex flex-col overflow-hidden group border-border/80 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="relative flex flex-row items-start gap-4 p-4">
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
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={() => handleShare(app)}>
                        <Share2 className="h-5 w-5 text-muted-foreground" />
                        <span className="sr-only">Share {app.title}</span>
                    </Button>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-between">
                <div>
                   <CardDescription className="text-sm mb-4">
                     {app.description.length > 100 ? `${app.description.substring(0, 100)}...` : app.description}
                   </CardDescription>
                </div>
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
