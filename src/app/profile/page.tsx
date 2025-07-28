
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
import { useAuth, UserRole } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const passwordFormSchema = z.object({
    currentPassword: z.string().optional().or(z.literal('')),
    newPassword: z.string().min(8, "Password must be at least 8 characters.").optional().or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
}).refine(data => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    return true;
}, {
    message: "Current password is required to set a new password.",
    path: ["currentPassword"],
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
});


const roleDisplay: Record<UserRole, string> = {
    admin: 'Administrator',
    user: 'Basic Plan',
    premium: 'Premium Plan',
    gold: 'Gold Plan',
    platinum: 'Platinum Plan'
}

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, updateUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      address: "",
    },
  });
  
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, loading, router, profileForm]);

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    if (!user) return;
    updateUser(user.email, values);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  }

  function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    if (!user || !values.newPassword) return;

    if (user.password !== values.currentPassword) {
        passwordForm.setError("currentPassword", { type: "manual", message: "Incorrect current password." });
        return;
    }

    updateUser(user.email, { password: values.newPassword });
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    });
    passwordForm.reset();
  }
  
  if (loading || !user) {
    return (
        <div className="container py-12">
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <Skeleton className="h-96 w-full lg:col-span-1" />
                 <Skeleton className="h-96 w-full lg:col-span-2" />
            </div>
        </div>
    )
  }

  return (
    <div className="w-full bg-secondary/30 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column */}
             <div className="lg:col-span-1 space-y-8">
                <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                            <AvatarImage src="https://placehold.co/100x100.png" alt={user.name} data-ai-hint="person avatar" />
                            <AvatarFallback className="text-3xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold font-headline">{user.name}</h2>
                        <p className="text-muted-foreground text-sm">{user.email}</p>
                         <Badge variant="outline" className="mt-4 capitalize bg-primary/10 text-primary border-primary/20">
                            {roleDisplay[user.role]}
                        </Badge>
                    </CardContent>
                </Card>
             </div>

            {/* Right Column */}
            <div className="lg:col-span-2">
                <Card className="w-full border-border/80">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Profile Settings</CardTitle>
                        <CardDescription>Manage your account details and preferences.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="profile">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="profile">Profile</TabsTrigger>
                                <TabsTrigger value="password">Password</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile" className="pt-6">
                                <Form {...profileForm}>
                                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormField control={profileForm.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                                            <FormField control={profileForm.control} name="username" render={({ field }) => ( <FormItem> <FormLabel>Username</FormLabel> <FormControl><Input {...field} disabled /></FormControl> <FormMessage /> </FormItem> )}/>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormField control={profileForm.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input type="email" {...field} disabled /></FormControl> <FormMessage /> </FormItem> )}/>
                                            <FormField control={profileForm.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone Number</FormLabel> <FormControl><Input placeholder="Your phone number" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                                        </div>
                                        <FormField control={profileForm.control} name="address" render={({ field }) => ( <FormItem> <FormLabel>Address</FormLabel> <FormControl><Textarea placeholder="123 Main St, Anytown, USA" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                                        <Button type="submit">Save Changes</Button>
                                    </form>
                                </Form>
                            </TabsContent>
                            <TabsContent value="password" className="pt-6">
                                <Form {...passwordForm}>
                                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6 max-w-md">
                                        <FormField
                                            control={passwordForm.control}
                                            name="currentPassword"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl><Input type="password" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={passwordForm.control}
                                            name="newPassword"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl><Input type="password" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={passwordForm.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm New Password</FormLabel>
                                                <FormControl><Input type="password" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Update Password</Button>
                                    </form>
                                </Form>
                            </TabsContent>
                             <TabsContent value="notifications" className="pt-6">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Email Notifications</Label>
                                            <p className="text-sm text-muted-foreground">Receive updates about your account and new features.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Promotional Offers</Label>
                                            <p className="text-sm text-muted-foreground">Get emails about promotions, new products, and special offers.</p>
                                        </div>
                                        <Switch />
                                    </div>
                                     <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Security Alerts</Label>
                                            <p className="text-sm text-muted-foreground">Be notified about important security activity on your account.</p>
                                        </div>
                                        <Switch defaultChecked disabled />
                                    </div>
                                </div>
                             </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
           </div>
      </div>
    </div>
  );
}
