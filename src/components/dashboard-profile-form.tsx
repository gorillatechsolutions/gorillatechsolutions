
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
import { Save } from "lucide-react";
import type { User } from "@/context/auth-context";
import { useAuth } from "@/context/auth-context";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  zipcode: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
});

type DashboardProfileFormProps = {
    currentUser: User;
}

export function DashboardProfileForm({ currentUser }: DashboardProfileFormProps) {
  const { toast } = useToast();
  const { login } = useAuth(); // We'll use login to update the user context

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      whatsapp: currentUser.whatsapp || "",
      address: currentUser.address || "",
      zipcode: currentUser.zipcode || "",
      country: currentUser.country || "",
      state: currentUser.state || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would send this to your backend
    console.log(values);

    // Update user in context
    const updatedUser: User = {
        ...currentUser,
        ...values,
    };
    login(updatedUser);

    toast({
      title: "Profile Updated!",
      description: "Your profile details have been successfully saved.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
             <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="Your email address" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
        </div>

        <Separator />
        
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input placeholder="+1 (555) 123-4567" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl><Input placeholder="+1 (555) 123-4567" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
        </div>

        <Separator />
        
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Location</h3>
            <div className="grid md:grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl><Input placeholder="123 Main St, Anytown" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                 <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State / Province</FormLabel>
                      <FormControl><Input placeholder="California" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP / Postal Code</FormLabel>
                      <FormControl><Input placeholder="90210" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl><Input placeholder="United States" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
        </div>
        
        <Button type="submit" size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
