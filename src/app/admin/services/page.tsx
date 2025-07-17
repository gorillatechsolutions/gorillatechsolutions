
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useService } from '@/contexts/service-context';
import { Skeleton } from '@/components/ui/skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faConciergeBell } from '@fortawesome/free-solid-svg-icons';

export default function AdminServicesListPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { services, deleteService, loading } = useService();

  const handleDelete = (slug: string) => {
    deleteService(slug);
    toast({
      title: 'Service Deleted',
      description: 'The service has been successfully deleted.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Services</h1>
          <p className="text-muted-foreground">View, create, edit, and delete your service offerings.</p>
        </div>
        <Button onClick={() => router.push('/admin/services/new')}>
          <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
          Create Service
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>All Services</CardTitle>
            <CardDescription>A list of all the services offered by your agency.</CardDescription>
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
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Popular</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {services.map((service) => (
                    <TableRow key={service.slug}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>${service.price}</TableCell>
                    <TableCell>
                        {service.popular && <Badge>Popular</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end gap-1">
                        <Button variant="outline" size="xs" onClick={() => router.push(`/admin/services/edit/${service.slug}`)}>
                            <FontAwesomeIcon icon={faEdit} className="mr-1 h-3 w-3" />
                            Edit
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="xs">
                                    <FontAwesomeIcon icon={faTrash} className="mr-1 h-3 w-3" />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the service.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(service.slug)}>
                                    Continue
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                      </div>
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
