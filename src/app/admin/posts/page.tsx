
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useCaseStudy } from '@/contexts/case-study-context';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faCalendar, faTags, faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

export default function AdminPostsListPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { caseStudies, deleteCaseStudy, loading } = useCaseStudy();
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const handleDelete = (slugs: string[]) => {
    slugs.forEach(slug => deleteCaseStudy(slug));
    toast({
      title: 'Posts Deleted',
      description: `${slugs.length} case study/studies have been successfully deleted.`,
    });
    setSelectedPosts([]);
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedPosts(caseStudies.map(p => p.slug));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (slug: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts(prev => [...prev, slug]);
    } else {
      setSelectedPosts(prev => prev.filter(id => id !== slug));
    }
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
        <div className="flex items-center gap-2">
            {selectedPosts.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <FontAwesomeIcon icon={faTrash} className="mr-2 h-4 w-4" />
                      Delete Selected ({selectedPosts.length})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete {selectedPosts.length} posts. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(selectedPosts)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            )}
            <Button onClick={() => router.push('/admin/posts/new')}>
              <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
              Create Post
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>A list of all your case studies.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
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
                        checked={selectedPosts.length > 0 && selectedPosts.length === caseStudies.length ? true : (selectedPosts.length > 0 ? 'indeterminate' : false)}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all posts"
                     />
                  </TableHead>
                  <TableHead>Post</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseStudies.map((post) => (
                  <TableRow key={post.slug} data-state={selectedPosts.includes(post.slug) ? 'selected' : undefined}>
                    <TableCell>
                        <Checkbox
                            checked={selectedPosts.includes(post.slug)}
                            onCheckedChange={(checked) => handleSelectPost(post.slug, !!checked)}
                            aria-label={`Select post ${post.title}`}
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Image 
                          src={post.image} 
                          alt={post.title} 
                          width={64} 
                          height={36} 
                          className="w-16 h-9 object-cover rounded-md border" 
                          data-ai-hint={post.dataAiHint}
                        />
                        <span className="truncate">{post.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FontAwesomeIcon icon={faUser} className="h-3 w-3" />
                        {post.author}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FontAwesomeIcon icon={faCalendar} className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FontAwesomeIcon icon={faEye} className="h-3 w-3" />
                        {formatViews(post.views)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="xs" onClick={() => router.push(`/admin/posts/edit/${post.slug}`)}>
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
