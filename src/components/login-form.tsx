
"use client";

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
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";


const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export function LoginForm() {
  const { toast } = useToast();
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Demo login logic
    if (
        (values.email === 'admin@example.com' && values.password === 'password123') ||
        (values.email === 'user@example.com' && values.password === 'password123')
    ) {
        const user = {
            name: values.email === 'admin@example.com' ? 'Admin User' : 'Normal User',
            email: values.email,
            role: values.email === 'admin@example.com' ? 'admin' : 'user',
        };
        login(user);
        toast({
            title: "Login Successful!",
            description: "Welcome back! Redirecting you to your dashboard...",
        });
        router.push('/dashboard');
        form.reset();
    } else {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
        });
    }
  }

  return (
    <Form {...form}>
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
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
                <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link href="/forgot-password" tabIndex={-1} className="text-sm text-primary hover:underline">
                        Forgot password?
                    </Link>
                </div>
              <FormControl>
                <Input type={showPassword ? "text" : "password"} placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Login <LogIn className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
