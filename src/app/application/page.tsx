
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApplicationPage } from '@/contexts/application-page-context';
import { Skeleton } from '@/components/ui/skeleton';
import { PublicProviders } from '@/components/providers';

const applicationFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  position: z.string().min(1, { message: 'Please select a position.' }),
  country: z.string().min(2, { message: "Country is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zipCode: z.string().min(3, { message: "ZIP Code is required." }),
  whatsapp: z.string().optional(),
  facebookUrl: z.string().url({ message: 'Please enter a valid Facebook URL.' }).optional().or(z.literal('')),
  youtubeUrl: z.string().url({ message: 'Please enter a valid YouTube URL.' }).optional().or(z.literal('')),
  portfolioUrl: z.string().url({ message: 'Please enter a valid portfolio URL.' }).optional().or(z.literal('')),
  coverLetter: z.string().min(20, { message: 'Cover letter must be at least 20 characters.' }),
});

function ApplicationPageContent() {
    const { toast } = useToast();
    const { content, loading } = useApplicationPage();

    const form = useForm<z.infer<typeof applicationFormSchema>>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            position: '',
            country: '',
            state: '',
            zipCode: '',
            whatsapp: '',
            facebookUrl: '',
            youtubeUrl: '',
            portfolioUrl: '',
            coverLetter: '',
        },
    });

    function onSubmit(values: z.infer<typeof applicationFormSchema>) {
        console.log(values);
        toast({
            title: 'Application Submitted!',
            description: "Thank you for your interest. We'll be in touch if you're a good fit.",
        });
        form.reset();
    }
    
    if (loading) {
        return (
            <div className="w-full bg-background text-foreground space-y-12">
                <section className="relative bg-secondary/30 pt-16 pb-10 md:pt-24 md:pb-16">
                    <div className="container mx-auto px-4 text-center">
                        <Skeleton className="h-12 w-2/3 mx-auto" />
                        <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div className="w-full bg-background text-foreground">
            <section className="bg-secondary/30 pt-16 pb-10 md:pt-24 md:pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">{content.heroTitle}</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        {content.heroSubtitle}
                    </p>
                </div>
            </section>
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <Card className="border-border/80">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl md:text-3xl">Submit Your Application</CardTitle>
                                <CardDescription>Interested in joining our team? Fill out the form below.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" placeholder="+1 234 567 890" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-6">
                                        <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>Country</FormLabel><FormControl><Input placeholder="United States" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="state" render={({ field }) => (<FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="California" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="zipCode" render={({ field }) => (<FormItem><FormLabel>Zip Code</FormLabel><FormControl><Input placeholder="90210" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                    <FormField control={form.control} name="whatsapp" render={({ field }) => (<FormItem><FormLabel>WhatsApp Number</FormLabel><FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField
                                        control={form.control}
                                        name="position"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Position of Interest</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger><SelectValue placeholder="Select a position" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    <SelectItem value="pr">PR</SelectItem>
                                                    <SelectItem value="influencer">Influencer</SelectItem>
                                                    <SelectItem value="work-from-home">Work From Home</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="facebookUrl" render={({ field }) => (<FormItem><FormLabel>Facebook Profile</FormLabel><FormControl><Input placeholder="https://facebook.com/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="youtubeUrl" render={({ field }) => (<FormItem><FormLabel>YouTube URL</FormLabel><FormControl><Input placeholder="https://youtube.com/channel/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                    <FormField control={form.control} name="portfolioUrl" render={({ field }) => (<FormItem><FormLabel>Portfolio URL</FormLabel><FormControl><Input placeholder="https://yourportfolio.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="coverLetter" render={({ field }) => (<FormItem><FormLabel>Cover Letter / Message</FormLabel><FormControl><Textarea className="min-h-[120px]" placeholder="Tell us why you'd be a great fit for our team..." {...field} /></FormControl><FormMessage /></FormItem>)} />

                                    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Submit Application</Button>
                                </form>
                                </Form>
                            </CardContent>
                        </Card>
                        <div className="space-y-8">
                            <div className="p-8 rounded-lg bg-secondary/30">
                                <h3 className="font-headline text-2xl text-primary mb-4">Why Join Us?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <i className="fa fa-check-circle text-green-500 mt-1" aria-hidden="true"></i>
                                        <p><strong className="font-semibold">Innovative Projects:</strong> Work on exciting projects for diverse clients across various industries.</p>
                                    </li>
                                     <li className="flex items-start gap-3">
                                        <i className="fa fa-check-circle text-green-500 mt-1" aria-hidden="true"></i>
                                        <p><strong className="font-semibold">Collaborative Culture:</strong> Be part of a supportive team that values creativity, open communication, and shared success.</p>
                                    </li>
                                     <li className="flex items-start gap-3">
                                        <i className="fa fa-check-circle text-green-500 mt-1" aria-hidden="true"></i>
                                        <p><strong className="font-semibold">Professional Growth:</strong> We invest in our team's development with continuous learning opportunities and clear career paths.</p>
                                    </li>
                                </ul>
                            </div>
                            <Image src="https://placehold.co/600x400.png" alt="Our team working together" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="team collaboration office" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


export default function ApplicationPage() {
    return (
        <PublicProviders>
            <ApplicationPageContent />
        </PublicProviders>
    )
}
