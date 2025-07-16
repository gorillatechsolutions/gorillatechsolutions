
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useCaseStudy } from '@/contexts/case-study-context';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faCalendar, faTags, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function AdminPostsListPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { caseStudies, deleteCaseStudy, loading } = useCaseStudy();

  const handleDelete = (slug: string) => {
    deleteCaseStudy(slug);
    toast({
      title: 'Post Deleted',
      description: 'The case study has been successfully deleted.',
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Posts</h1>
          <p className="text-muted-foreground">View, create, edit, and delete your case studies.</p>
        </div>
        <Button onClick={() => router.push('/admin/posts/new')}>
          <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="p-0">
                <Skeleton className="h-48 w-full rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter className="p-4">
                 <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-0 relative">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  width={400} 
                  height={200} 
                  className="w-full h-48 object-cover" 
                  data-ai-hint={post.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <CardTitle className="text-lg font-semibold leading-snug mb-2">{post.title}</CardTitle>
                <div className="text-xs text-muted-foreground space-y-1.5">
                   <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendar} className="h-3 w-3" />
                    <span>{new Date(post.date).toLocaleDateString()} by {post.author}</span>
                   </div>
                   <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faEye} className="h-3 w-3" />
                    <span>{formatViews(post.views)} views</span>
                   </div>
                   <div className="flex items-start gap-2 pt-1">
                    <FontAwesomeIcon icon={faTags} className="h-3 w-3 mt-0.5" />
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>)}
                    </div>
                   </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-secondary/30 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push(`/admin/posts/edit/${post.slug}`)}>
                  <FontAwesomeIcon icon={faEdit} className="mr-2 h-3.5 w-3.5" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="flex-1">
                      <FontAwesomeIcon icon={faTrash} className="mr-2 h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(post.slug)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
