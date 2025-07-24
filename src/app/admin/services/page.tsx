
'use client';

import { useState } from 'react';
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
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '@/components/ui/checkbox';

export default function AdminServicesListPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { services, deleteService, loading } = useService();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleDelete = (slugs: string[]) => {
    slugs.forEach(slug => deleteService(slug));
    toast({
      title: 'Services Deleted',
      description: `${slugs.length} service(s) have been successfully deleted.`,
    });
    setSelectedServices([]);
  };
  
  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedServices(services.map(s => s.slug));
    } else {
      setSelectedServices([]);
    }
  };

  const handleSelectService = (slug: string, checked: boolean) => {
    if (checked) {
      setSelectedServices(prev => [...prev, slug]);
    } else {
      setSelectedServices(prev => prev.filter(id => id !== slug));
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Services</h1>
          <p className="text-muted-foreground">View, create, edit, and delete your service offerings.</p>
        </div>
        <div className="flex items-center gap-2">
            {selectedServices.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="xs">
                    <FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" />
                    Delete Selected ({selectedServices.length})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete {selectedServices.length} services. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(selectedServices)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button onClick={() => router.push('/admin/services/new')}>
              <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
              Create Service
            </Button>
        </div>
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
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedServices.length > 0 && selectedServices.length === services.length ? true : (selectedServices.length > 0 ? 'indeterminate' : false)}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all services"
                      />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Popular</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {services.map((service) => (
                    <TableRow key={service.slug} data-state={selectedServices.includes(service.slug) ? 'selected' : undefined}>
                    <TableCell>
                      <Checkbox
                          checked={selectedServices.includes(service.slug)}
                          onCheckedChange={(checked) => handleSelectService(service.slug, !!checked)}
                          aria-label={`Select service ${service.title}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>${service.price}</TableCell>
                    <TableCell>
                        {service.popular && <Badge>Popular</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="xs" onClick={() => router.push(`/admin/services/edit/${service.slug}`)}>
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
