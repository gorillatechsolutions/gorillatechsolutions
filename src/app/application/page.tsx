
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

const applicationFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  position: z.string().min(1, { message: 'Please select a position.' }),
  linkedinUrl: z.string().url({ message: 'Please enter a valid LinkedIn URL.' }).optional().or(z.literal('')),
  portfolioUrl: z.string().url({ message: 'Please enter a valid portfolio URL.' }).optional().or(z.literal('')),
  coverLetter: z.string().min(20, { message: 'Cover letter must be at least 20 characters.' }),
});

export default function ApplicationPage() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof applicationFormSchema>>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            position: '',
            linkedinUrl: '',
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

    return (
        <div className="w-full bg-background text-foreground">
            <section className="bg-secondary/30 pt-16 pb-10 md:pt-24 md:pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">Work With Us</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Join our team of innovators and help us build the future of digital marketing. We're looking for passionate individuals to grow with us.
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
                                        <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone (Optional)</FormLabel><FormControl><Input type="tel" placeholder="+1 234 567 890" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="position"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Position of Interest</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger><SelectValue placeholder="Select a position" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    <SelectItem value="digital-marketer">Digital Marketer</SelectItem>
                                                    <SelectItem value="seo-specialist">SEO Specialist</SelectItem>
                                                    <SelectItem value="ppc-analyst">PPC Analyst</SelectItem>
                                                    <SelectItem value="web-developer">Web Developer</SelectItem>
                                                    <SelectItem value="general">General Application</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="linkedinUrl" render={({ field }) => (<FormItem><FormLabel>LinkedIn Profile</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="portfolioUrl" render={({ field }) => (<FormItem><FormLabel>Portfolio URL</FormLabel><FormControl><Input placeholder="https://yourportfolio.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
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
