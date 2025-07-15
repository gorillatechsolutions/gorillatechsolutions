
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
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === values.email && u.password === values.password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Login Successful!",
        description: "Welcome back!",
      });
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex items-center justify-center bg-secondary/30 py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:block">
                <Image 
                    src="https://placehold.co/600x600.png"
                    alt="Login illustration"
                    width={600}
                    height={600}
                    className="rounded-lg"
                    data-ai-hint="login security"
                />
            </div>
            <Card className="max-w-md mx-auto w-full border-border/80">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl">Welcome Back!</CardTitle>
                    <CardDescription>Sign in to your account to continue.</CardDescription>
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
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center">
                                    <FormLabel>Password</FormLabel>
                                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                            Login
                        </Button>
                    </form>
                    </Form>
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/signup" className="font-semibold text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
