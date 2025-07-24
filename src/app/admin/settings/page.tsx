
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>More settings will be available here in the future.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>This section is under development.</p>
                </CardContent>
            </Card>
        </div>
    );
}
