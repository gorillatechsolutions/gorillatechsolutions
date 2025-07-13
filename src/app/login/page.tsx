
import { LoginForm } from "@/components/login-form";
import type { Metadata } from 'next';
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export const metadata: Metadata = {
    title: 'Login to Your Account',
    description: 'Access your Gorilla Tech Solutions account to manage your projects and services.',
};

export default function LoginPage() {
    return (
        <div className="container py-12 md:py-20 flex items-center justify-center">
             <div className="mx-auto w-full max-w-md">
                <div className="text-center">
                    <h1 className="font-headline text-2xl font-semibold tracking-tight">Welcome Back!</h1>
                    <p className="text-sm text-muted-foreground mt-1.5">Enter your credentials to access your account.</p>
                </div>
                <div className="mt-6">
                    <Alert className="mb-6 border-accent text-accent">
                        <Terminal className="h-4 w-4 !text-accent" />
                        <AlertTitle>Demo Credentials</AlertTitle>
                        <AlertDescription>
                           <div className="text-xs">
                             <p className="mb-2"><b>Admin User:</b> <br/><code>admin@example.com</code> / <code>password123</code></p>
                             <p><b>Normal User:</b> <br/><code>user@example.com</code> / <code>password123</code></p>
                           </div>
                        </AlertDescription>
                    </Alert>
                    <LoginForm />
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-primary hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </div>
             </div>
        </div>
    )
}
