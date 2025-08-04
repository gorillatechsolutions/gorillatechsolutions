
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faDatabase, faCode } from '@fortawesome/free-solid-svg-icons';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function OptimizationSettingsPage() {
    const { toast } = useToast();

    const handleClearCache = () => {
        // In a real app, this would trigger a server-side process
        console.log('Clearing application cache...');
        toast({
            title: 'Cache Cleared',
            description: 'The application cache has been successfully cleared.',
        });
    };
    
    const handleOptimizeJs = () => {
        // In a real app, this might trigger a build process or asset optimization
        console.log('Optimizing JS assets...');
        toast({
            title: 'Optimization Started',
            description: 'JavaScript asset optimization has been initiated.',
        });
    };

    const handleCleanDatabase = () => {
        // In a real app, this would trigger a database maintenance task
        console.log('Cleaning database temporary files...');
        toast({
            title: 'Database Cleaned',
            description: 'Temporary database files have been successfully removed.',
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">System Optimization</h1>
                <p className="text-muted-foreground">Perform maintenance tasks to keep your application running smoothly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faBroom} className="h-5 w-5 text-primary" />
                            Cache Management
                        </CardTitle>
                        <CardDescription>
                            Clear the application's internal data cache. This can resolve issues related to outdated content.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button>Clear Cache</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will clear all cached data for the application. Users may experience slower load times temporarily.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClearCache}>
                                    Continue
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faDatabase} className="h-5 w-5 text-primary" />
                            Database Maintenance
                        </CardTitle>
                        <CardDescription>
                            Remove temporary or orphaned data from the database. This helps to keep the database optimized and efficient.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button>Remove Temporary Files</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                   This will permanently remove temporary files from the database. This action cannot be undone.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleCleanDatabase}>
                                    Continue
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faCode} className="h-5 w-5 text-primary" />
                            Asset Optimization
                        </CardTitle>
                        <CardDescription>
                            Re-bundle and minify JavaScript and CSS assets. This can improve your site's loading performance.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button>Optimize Assets</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                   This action will start a process to re-optimize your site's assets. This may take a few moments.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleOptimizeJs}>
                                    Continue
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
