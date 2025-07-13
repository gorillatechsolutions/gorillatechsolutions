
import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
                <Card className="shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-2xl">Forgot Your Password?</CardTitle>
                        <CardDescription>No worries. Enter your email and we'll send you a reset link.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ForgotPasswordForm />
                        <div className="mt-4 text-center text-sm">
                            <Link href="/login" className="text-primary hover:underline flex items-center justify-center">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
