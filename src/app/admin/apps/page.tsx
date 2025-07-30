
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/app-context';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faStar, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '@/components/ui/checkbox';
import { Providers } from '@/components/providers';

function AdminAppsListPageContent() {
  const router = useRouter();
  const { toast } = useToast();
  const { apps, deleteApp, loading } = useApp();
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  const handleDelete = (slugs: string[]) => {
    slugs.forEach(slug => deleteApp(slug));
    toast({
      title: 'Apps Deleted',
      description: `${slugs.length} application(s) have been successfully deleted.`,
    });
    setSelectedApps([]);
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedApps(apps.map(app => app.slug));
    } else {
      setSelectedApps([]);
    }
  };

  const handleSelectApp = (slug: string, checked: boolean) => {
    if (checked) {
      setSelectedApps(prev => [...prev, slug]);
    } else {
      setSelectedApps(prev => prev.filter(id => id !== slug));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Apps</h1>
          <p className="text-muted-foreground">View, create, edit, and delete your applications.</p>
        </div>
        <div className="flex items-center gap-2">
           {selectedApps.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="xs">
                    <FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" />
                    Delete Selected ({selectedApps.length})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete {selectedApps.length} applications. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(selectedApps)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          )}
          <Button onClick={() => router.push('/admin/apps/new')}>
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
            Create App
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
          <CardDescription>A list of all applications managed by your agency.</CardDescription>
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
                        checked={selectedApps.length > 0 && selectedApps.length === apps.length ? true : (selectedApps.length > 0 ? 'indeterminate' : false)}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all apps"
                     />
                  </TableHead>
                  <TableHead>App</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Badge</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apps.map((app) => (
                  <TableRow key={app.slug} data-state={selectedApps.includes(app.slug) ? 'selected' : undefined}>
                    <TableCell>
                        <Checkbox
                            checked={selectedApps.includes(app.slug)}
                            onCheckedChange={(checked) => handleSelectApp(app.slug, !!checked)}
                            aria-label={`Select app ${app.title}`}
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Image 
                          src={app.icon} 
                          alt={app.title} 
                          width={40} 
                          height={40} 
                          className="w-10 h-10 object-cover rounded-md border" 
                          data-ai-hint={app.dataAiHint}
                        />
                        <span>{app.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{app.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-amber-500" />
                        {app.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faDownload} className="h-4 w-4 text-muted-foreground" />
                        {app.downloads}
                      </div>
                      </TableCell>
                    <TableCell>
                      {app.badge && <Badge variant="secondary">{app.badge}</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="xs" onClick={() => router.push(`/admin/apps/edit/${app.slug}`)}>
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

export default function AdminAppsListPage() {
  return (
    <Providers>
      <AdminAppsListPageContent />
    </Providers>
  )
}
