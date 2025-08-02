
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";
import { PublicProviders } from "@/components/providers";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

function ForgotPasswordPageContent() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, you would handle the password reset logic here,
    // e.g., send an email to the user with a reset link.
    // For this prototype, we'll just show a confirmation toast.
    toast({
      title: "Password Reset Email Sent",
      description: `If an account with the email ${values.email} exists, a password reset link has been sent.`,
    });
    form.reset();
  }

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex items-center justify-center bg-secondary/30 py-12">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:block">
                <Image 
                    src="https://placehold.co/600x600.png"
                    alt="Forgot password illustration"
                    width={600}
                    height={600}
                    className="rounded-lg"
                    data-ai-hint="password security"
                />
            </div>
            <Card className="max-w-md mx-auto w-full border-border/80">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl">Forgot Your Password?</CardTitle>
                    <CardDescription>No problem. Enter your email below and we'll send you a reset link.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                            Send Reset Link
                        </Button>
                    </form>
                    </Form>
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Remember your password?{" "}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Login here
                        </Link>
                    </p>
                </CardContent>
            </Card>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
    return (
        <PublicProviders>
            <ForgotPasswordPageContent />
        </PublicProviders>
    )
}
