
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import type { CaseStudy } from '@/types/case-study';
import { demoCaseStudies } from '@/lib/demo-data';

export default function AdminPostsListPage() {
  const [posts, setPosts] = useState<CaseStudy[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Initialize posts from demo data if local storage is empty
    const storedPosts = localStorage.getItem('caseStudies');
    if (!storedPosts) {
      localStorage.setItem('caseStudies', JSON.stringify(demoCaseStudies));
      setPosts(demoCaseStudies);
    } else {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);
  
  const refetchPosts = () => {
    const storedPosts = localStorage.getItem('caseStudies');
    if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
    }
  };

  const handleDelete = (slug: string) => {
    const updatedPosts = posts.filter(post => post.slug !== slug);
    localStorage.setItem('caseStudies', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    toast({
      title: 'Post Deleted',
      description: 'The case study has been successfully deleted.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Case Studies</h1>
          <p className="text-muted-foreground">Manage all your case study articles.</p>
        </div>
        <Button onClick={() => router.push('/admin/posts/new')}>Create New Post</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>A list of all case studies in your database.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.slug}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => router.push(`/admin/posts/edit/${post.slug}`)}>
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
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
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
