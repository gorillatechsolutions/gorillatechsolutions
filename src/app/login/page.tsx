
import { LoginForm } from "@/components/login-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Login to Your Account',
    description: 'Access your Gorilla Tech Solutions account to manage your projects and services.',
};

export default function LoginPage() {
    return (
        <div className="container py-12 md:py-20 flex items-center justify-center">
             <div className="mx-auto w-full max-w-md">
                <Card className="shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-2xl">Welcome Back!</CardTitle>
                        <CardDescription>Enter your credentials to access your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                        <div className="mt-4 text-center text-sm">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
             </div>
        </div>
    )
}
