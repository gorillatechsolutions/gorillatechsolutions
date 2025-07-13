
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Share2, Crown, Gem, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type AppLinks = {
  web?: string;
  playStore?: string;
  appStore?: string;
  download?: string;
  buy?: string;
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
  badge?: string;
};

type AppsListProps = {
  allApps: App[];
};

const ITEMS_PER_PAGE = 12;

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

  const getBadgeContent = (badgeText: string) => {
      switch (badgeText) {
          case 'Premium':
              return { icon: <Crown className="h-3 w-3 mr-1" />, text: 'Premium', className: 'bg-amber-500 text-white' };
          case 'Gold':
              return { icon: <Gem className="h-3 w-3 mr-1" />, text: 'Gold', className: 'bg-yellow-400 text-black' };
          case 'Login Required':
              return { icon: <KeyRound className="h-3 w-3 mr-1" />, text: 'Login Required', className: 'bg-gray-500 text-white' };
          default:
              return null;
      }
  };

  return (
    <>
      {paginatedApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedApps.map((app) => {
            const badgeContent = app.badge ? getBadgeContent(app.badge) : null;
            return (
                <Card key={app.title} className="flex flex-col overflow-hidden group border-border/80 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-col p-4 pb-2">
                        <div className="relative h-8 mb-2">
                            {badgeContent && (
                                <Badge className={cn("absolute top-0 left-0 z-10 text-xs px-2 py-1", badgeContent.className)}>
                                    {badgeContent.icon}
                                    {badgeContent.text}
                                </Badge>
                            )}
                            <Button variant="ghost" size="icon" className="absolute top-0 right-0 h-8 w-8 z-10" onClick={() => handleShare(app)}>
                                <Share2 className="h-5 w-5 text-muted-foreground" />
                                <span className="sr-only">Share {app.title}</span>
                            </Button>
                        </div>
                        <div className="flex items-start gap-4">
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
                        </div>
                    </CardHeader>
                <CardContent className="p-4 pt-2 flex-1 flex flex-col justify-between">
                    <div>
                    <CardDescription className="text-sm mb-4">
                        {app.description.length > 100 ? `${app.description.substring(0, 100)}...` : app.description}
                    </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                    {app.links.playStore && (
                        <Button asChild variant="outline" size="sm" className="flex-1 min-w-[40px] text-xs px-2 h-7">
                            <Link href={app.links.playStore} target="_blank" rel="noopener noreferrer" aria-label={`Get ${app.title} on Google Play`}>
                                Play Store
                            </Link>
                        </Button>
                    )}
                    {app.links.appStore && (
                        <Button asChild variant="outline" size="sm" className="flex-1 min-w-[40px] text-xs px-2 h-7">
                            <Link href={app.links.appStore} target="_blank" rel="noopener noreferrer" aria-label={`Download ${app.title} on the App Store`}>
                                App Store
                            </Link>
                        </Button>
                    )}
                    {app.links.web && (
                        <Button asChild variant="outline" size="sm" className="flex-1 min-w-[40px] text-xs px-2 h-7">
                            <Link href={app.links.web} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${app.title} website`}>
                                Web
                            </Link>
                        </Button>
                    )}
                    {app.links.download && (
                        <Button asChild variant="outline" size="sm" className="flex-1 min-w-[40px] text-xs px-2 h-7">
                            <Link href={app.links.download} download aria-label={`Download ${app.title}`}>
                                Download
                            </Link>
                        </Button>
                    )}
                    {app.links.buy && (
                        <Button asChild variant="default" size="sm" className="flex-1 min-w-[40px] text-xs px-2 h-7 bg-accent text-accent-foreground hover:bg-accent/90">
                            <Link href={app.links.buy} aria-label={`Buy ${app.title}`}>
                                Buy
                            </Link>
                        </Button>
                    )}
                    </div>
                </CardContent>
                </Card>
            )
          })}
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
