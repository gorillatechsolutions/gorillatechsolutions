
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/app-context';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faStar, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function AdminAppsListPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { apps, deleteApp, loading } = useApp();

  const handleDelete = (slug: string) => {
    deleteApp(slug);
    toast({
      title: 'App Deleted',
      description: 'The application has been successfully deleted.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Apps</h1>
          <p className="text-muted-foreground">View, create, edit, and delete your applications.</p>
        </div>
        <Button onClick={() => router.push('/admin/apps/new')}>
          <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
          Create App
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                 <Skeleton className="h-16 w-16 rounded-lg" />
                 <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                 </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-10 w-full" />
              </CardContent>
              <CardFooter className="p-4">
                 <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {apps.map((app) => (
            <Card key={app.slug} className="flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                <Image 
                  src={app.icon} 
                  alt={app.title} 
                  width={64} 
                  height={64} 
                  className="w-16 h-16 object-cover rounded-lg border" 
                  data-ai-hint={app.dataAiHint}
                />
                <div className="flex-1">
                    <CardTitle className="text-lg font-semibold leading-snug">{app.title}</CardTitle>
                     <p className="text-sm text-muted-foreground">{app.category}</p>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1">
                 <div className="text-xs text-muted-foreground space-y-1.5">
                   <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-amber-500" />
                        <span>{app.rating} Stars</span>
                   </div>
                   <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faDownload} className="h-3 w-3" />
                        <span>{app.downloads} Downloads</span>
                   </div>
                   {app.badge && (
                       <div className="flex items-start gap-2 pt-1">
                            <div className="flex flex-wrap gap-1">
                                <Badge variant="secondary" className="text-xs font-normal">{app.badge}</Badge>
                            </div>
                       </div>
                   )}
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-secondary/30 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push(`/admin/apps/edit/${app.slug}`)}>
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
                        This action cannot be undone. This will permanently delete the application.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(app.slug)}>
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
