
import { SignupForm } from "@/components/signup-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Create an Account',
    description: 'Sign up for a Gorilla Tech Solutions account to get started with our services.',
};

export default function SignupPage() {
    return (
        <div className="container py-12 md:py-20 flex items-center justify-center">
             <div className="mx-auto w-full max-w-md">
                <Card className="shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
                        <CardDescription>Join us to start growing your business today.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SignupForm />
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
             </div>
        </div>
    )
}
