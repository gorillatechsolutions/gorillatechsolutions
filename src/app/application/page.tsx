import { ApplicationForm } from "@/components/application-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ApplicationPage() {
    return (
        <div className="container py-12 md:py-20">
             <header className="text-center mb-12">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Start Your Project</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Let's create something amazing together. Fill out the form below to get started.
                </p>
            </header>
            <Card className="max-w-4xl mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Project Application</CardTitle>
                    <CardDescription>Provide us with some details about your project, and we'll get back to you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ApplicationForm />
                </CardContent>
            </Card>
        </div>
    )
}
