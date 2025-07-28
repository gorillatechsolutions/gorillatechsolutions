
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your application's settings.</p>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle>Global Settings</CardTitle>
                    <CardDescription>
                        This section has been deprecated. All settings have been moved to their respective pages under the "Pages" section in the admin sidebar for easier management. Please use the navigation on the left to find the page you wish to edit.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/admin/pages">Go to Page Management</Link>
                    </Button>
                </CardContent>
             </Card>
        </div>
    );
}
