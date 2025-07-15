
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <Button>Add Product</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>This is a placeholder for the products management page.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Product list and management tools will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
