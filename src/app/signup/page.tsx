
import { SignupForm } from "@/components/signup-form";
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
                <div className="text-center mb-6">
                    <h1 className="font-headline text-2xl font-semibold tracking-tight">Create an Account</h1>
                    <p className="text-sm text-muted-foreground mt-1.5">Join us to start growing your business today.</p>
                </div>
                <SignupForm />
                <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        Login
                    </Link>
                </div>
             </div>
        </div>
    )
}
