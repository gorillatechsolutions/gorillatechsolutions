
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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  username: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters.").optional().or(z.literal('')),
});

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, updateUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      phone: "",
      address: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone || "",
        address: user.address || "",
        password: "",
      });
    }
  }, [user, loading, router, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    updateUser(user.email, values);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
    form.reset({ ...form.getValues(), password: '' });
  }
  
  if (loading || !user) {
    return (
        <div className="container py-12">
            <div className="mx-auto max-w-4xl space-y-8">
                 <Skeleton className="h-10 w-1/3" />
                 <Skeleton className="h-96 w-full" />
            </div>
        </div>
    )
  }

  return (
    <div className="w-full bg-secondary/30 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
            <Card className="w-full border-border/80">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">My Profile</CardTitle>
                    <CardDescription>Manage your personal information and account settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={form.control} name="username" render={({ field }) => ( <FormItem> <FormLabel>Username</FormLabel> <FormControl><Input {...field} disabled /></FormControl> <FormMessage /> </FormItem> )}/>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input type="email" {...field} disabled /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone Number</FormLabel> <FormControl><Input placeholder="Your phone number" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        </div>
                         <FormField control={form.control} name="address" render={({ field }) => ( <FormItem> <FormLabel>Address</FormLabel> <FormControl><Textarea placeholder="123 Main St, Anytown, USA" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input type={showPassword ? "text" : "password"} placeholder="Leave blank to keep current password" {...field} />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit">Save Changes</Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
      </div>
    </div>
  );
}
