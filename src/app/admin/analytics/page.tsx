
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>This is a placeholder for the analytics page.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Detailed analytics and reports will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
