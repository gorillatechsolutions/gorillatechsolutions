
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useReview } from '@/contexts/review-context';
import { Checkbox } from '@/components/ui/checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Providers } from '@/components/providers';

function AdminReviewsPageContent() {
  const router = useRouter();
  const { toast } = useToast();
  const { reviews, deleteReview, loading } = useReview();
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);

  const handleDelete = (ids: string[]) => {
    ids.forEach(id => deleteReview(id));
    toast({
      title: 'Reviews Deleted',
      description: `${ids.length} review(s) have been successfully deleted.`,
    });
    setSelectedReviews([]);
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedReviews(reviews.map(r => r.id));
    } else {
      setSelectedReviews([]);
    }
  };

  const handleSelectReview = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedReviews(prev => [...prev, id]);
    } else {
      setSelectedReviews(prev => prev.filter(reviewId => reviewId !== id));
    }
  };
  
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
                key={i}
                icon={faSolidStar}
                className={i < rating ? 'text-amber-500' : 'text-muted-foreground/30'}
            />
        ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Reviews</h1>
          <p className="text-muted-foreground">View, create, edit, and delete client testimonials.</p>
        </div>
        <div className="flex items-center gap-2">
           {selectedReviews.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="xs">
                    <FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" />
                    Delete Selected ({selectedReviews.length})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete {selectedReviews.length} reviews. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(selectedReviews)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          )}
          <Button onClick={() => router.push('/admin/reviews/new')}>
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
            Create Review
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>A list of all client testimonials.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                   <TableHead className="w-[50px]">
                     <Checkbox
                        checked={selectedReviews.length > 0 && selectedReviews.length === reviews.length ? true : (selectedReviews.length > 0 ? 'indeterminate' : false)}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all reviews"
                     />
                  </TableHead>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Quote</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Pinned</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id} data-state={selectedReviews.includes(review.id) ? 'selected' : undefined}>
                    <TableCell>
                        <Checkbox
                            checked={selectedReviews.includes(review.id)}
                            onCheckedChange={(checked) => handleSelectReview(review.id, !!checked)}
                            aria-label={`Select review by ${review.name}`}
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.dataAiHint} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div>{review.name}</div>
                            <div className="text-xs text-muted-foreground">{review.company}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-sm">
                        <p className="truncate">{review.quote}</p>
                    </TableCell>
                    <TableCell>
                        <StarRating rating={review.rating} />
                    </TableCell>
                    <TableCell>
                      <FontAwesomeIcon
                        icon={review.pinned ? faSolidStar : faRegularStar}
                        className={review.pinned ? "text-primary" : "text-muted-foreground"}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="xs" onClick={() => router.push(`/admin/reviews/edit/${review.id}`)}>
                        <FontAwesomeIcon icon={faEdit} className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminReviewsPage() {
    return (
        <Providers>
            <AdminReviewsPageContent />
        </Providers>
    )
}
