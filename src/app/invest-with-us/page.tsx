
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
import { useInvestmentPage } from '@/contexts/investment-page-context';
import { Skeleton } from '@/components/ui/skeleton';
import { PublicProviders } from '@/components/providers';

const investmentFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().optional(),
  whatsapp: z.string().optional(),
  country: z.string().min(2, { message: "Country is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zipCode: z.string().min(3, { message: "ZIP Code is required." }),
  investmentInterest: z.string().min(10, { message: 'Please provide some details about your interest.' }),
});

function InvestWithUsPageContent() {
    const { toast } = useToast();
    const { content, loading } = useInvestmentPage();

    const form = useForm<z.infer<typeof investmentFormSchema>>({
        resolver: zodResolver(investmentFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            company: '',
            whatsapp: '',
            country: '',
            state: '',
            zipCode: '',
            investmentInterest: '',
        },
    });

    function onSubmit(values: z.infer<typeof investmentFormSchema>) {
        console.log(values);
        toast({
            title: 'Inquiry Submitted!',
            description: "Thank you for your interest in investing with us. Our team will review your inquiry and be in touch shortly.",
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
                        <div className="space-y-8">
                            <Image src="https://placehold.co/600x400.png" alt="Growth chart and business analytics" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="business growth chart" />
                             <div className="p-8 rounded-lg bg-secondary/30">
                                <h3 className="font-headline text-2xl text-primary mb-4">A Unique Investment Opportunity</h3>
                               <p className="text-muted-foreground mb-4">Gorilla Tech Solutions is on a rapid growth trajectory, fueled by our commitment to innovation, data-driven strategies, and exceptional client results. We are seeking strategic partners to help us scale our operations, expand into new markets, and continue developing proprietary technologies that redefine the digital marketing landscape.</p>
                               <p className="text-muted-foreground">Investing with us means investing in a proven business model with a portfolio of successful projects and a clear vision for the future.</p>
                            </div>
                        </div>
                        <Card className="border-border/80 sticky top-24">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl md:text-3xl">Investor Inquiry</CardTitle>
                                <CardDescription>Please provide your details, and our leadership team will contact you to discuss this opportunity further.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="company" render={({ field }) => (<FormItem><FormLabel>Company / Firm (Optional)</FormLabel><FormControl><Input placeholder="Your Company" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-6">
                                        <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>Country</FormLabel><FormControl><Input placeholder="United States" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="state" render={({ field }) => (<FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="California" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="zipCode" render={({ field }) => (<FormItem><FormLabel>Zip Code</FormLabel><FormControl><Input placeholder="90210" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                     <FormField control={form.control} name="whatsapp" render={({ field }) => (<FormItem><FormLabel>WhatsApp Number</FormLabel><FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="investmentInterest" render={({ field }) => (<FormItem><FormLabel>Message</FormLabel><FormControl><Textarea className="min-h-[120px]" placeholder="Briefly describe your interest or any questions you have..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Submit Inquiry</Button>
                                </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function InvestWithUsPage() {
    return (
        <PublicProviders>
            <InvestWithUsPageContent />
        </PublicProviders>
    )
}
