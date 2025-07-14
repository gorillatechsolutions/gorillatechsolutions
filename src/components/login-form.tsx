
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
import { LogIn, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import type { User } from "@/context/auth-context";


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
        const baseUser = {
            name: values.email === 'admin@example.com' ? 'Admin User' : 'Mary Jacob',
            email: values.email,
        };

        const user: User = values.email === 'admin@example.com' 
            ? { ...baseUser, role: 'admin' }
            : { 
                ...baseUser,
                role: 'user',
                title: 'Real Estate Reporter',
                company: 'New York Post',
                location: 'New York',
                expertise: 'Real Estate',
                bio: "Covering all things real estate @nypost Send tips: dm's open",
                verified: true,
                asSeenIn: [
                    'New York Post', 'Yahoo Entertainment', 'Yahoo Life', 'MSN (US)', 'The Internet Archive', 
                    'Yahoo News', 'Yahoo News Malaysia', 'Yahoo Singapore', 'Aol', 'Yahoo', 'Yahoo Finance'
                ],
            };
            
        login(user);
        toast({
            title: "Login Successful!",
            description: "Welcome back! Redirecting you to your profile...",
        });
        router.push('/profile');
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
              <div className="relative">
                <FormControl>
                    <Input type={showPassword ? "text" : "password"} placeholder="********" {...field} />
                </FormControl>
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
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
