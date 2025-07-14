
"use client";

import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="container py-12 md:py-20 flex items-center justify-center">
             <div className="mx-auto w-full max-w-md">
                <div className="text-center">
                    <h1 className="font-headline text-2xl font-semibold tracking-tight">Welcome Back!</h1>
                    <p className="text-sm text-muted-foreground mt-1.5">Enter your credentials to access your account.</p>
                </div>
                <Alert className="mt-6 mb-4 border-accent text-accent [&>svg]:text-accent">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Demo Credentials</AlertTitle>
                    <AlertDescription className="text-sm">
                        <p><strong>Admin:</strong> admin@example.com / password123</p>
                        <p><strong>User:</strong> user@example.com / password123</p>
                    </AlertDescription>
                </Alert>
                <div className="mt-6">
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
