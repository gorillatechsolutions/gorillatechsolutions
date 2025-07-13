
import { ForgotPasswordForm } from "@/components/forgot-password-form";
import type { Metadata } from 'next';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: 'Forgot Password',
    description: 'Reset your password to regain access to your Gorilla Tech Solutions account.',
};

export default function ForgotPasswordPage() {
    return (
        <div className="container py-12 md:py-20 flex items-center justify-center">
            <div className="mx-auto w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="font-headline text-2xl font-semibold tracking-tight">Forgot Your Password?</h1>
                    <p className="text-sm text-muted-foreground mt-1.5">No worries. Enter your email and we'll send you a reset link.</p>
                </div>
                <ForgotPasswordForm />
                <div className="mt-4 text-center text-sm">
                    <Link href="/login" className="text-primary hover:underline flex items-center justify-center">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
