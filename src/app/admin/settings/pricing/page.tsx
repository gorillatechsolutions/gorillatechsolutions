
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { usePricingPlan } from '@/contexts/pricing-plan-context';
import type { PricingPlan } from '@/types/pricing-plan';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Switch } from '@/components/ui/switch';

const planSchema = z.object({
  name: z.string().min(1, 'Plan name is required.'),
  tier: z.enum(['user', 'premium', 'gold', 'platinum']),
  price: z.string().min(1, 'Price is required.'),
  description: z.string().min(1, 'Description is required.'),
  features: z.array(z.object({ value: z.string().min(1, 'Feature cannot be empty.') })),
  cta: z.string().min(1, 'CTA text is required.'),
  popular: z.boolean(),
});

const formSchema = z.object({
  plans: z.array(planSchema),
});

export default function PricingSettingsPage() {
    const { plans, updatePlans, loading } = usePricingPlan();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "plans",
    });

    useEffect(() => {
        if (!loading) {
            form.reset({
                plans: plans.map(p => ({ ...p, features: p.features.map(f => ({ value: f })) })),
            });
        }
    }, [plans, loading, form]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const updatedPlansData = values.plans.map(p => ({
            ...p,
            features: p.features.map(f => f.value),
        }));
        updatePlans(updatedPlansData);
        toast({
            title: 'Pricing Plans Saved!',
            description: 'Your changes to the pricing plans have been saved.',
        });
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Manage Pricing Plans</h1>
                <p className="text-muted-foreground">Update the details for your subscription plans.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-6">
                        {fields.map((field, index) => (
                            <Card key={field.id}>
                                <CardHeader>
                                    <CardTitle>Plan: {form.getValues(`plans.${index}.name`)}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <FormField control={form.control} name={`plans.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Plan Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name={`plans.${index}.price`} render={({ field }) => (<FormItem><FormLabel>Price (e.g., $29)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name={`plans.${index}.cta`} render={({ field }) => (<FormItem><FormLabel>Button Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                    <FormField control={form.control} name={`plans.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    
                                    <div className="space-y-2">
                                        <FormLabel>Features</FormLabel>
                                        {form.getValues(`plans.${index}.features`).map((_, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`plans.${index}.features.${featureIndex}.value`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-grow">
                                                            <FormControl><Input {...field} /></FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button type="button" variant="destructive" size="icon" onClick={() => {
                                                    const features = form.getValues(`plans.${index}.features`);
                                                    features.splice(featureIndex, 1);
                                                    form.setValue(`plans.${index}.features`, features);
                                                }}>
                                                    <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" size="sm" onClick={() => {
                                            const features = form.getValues(`plans.${index}.features`);
                                            form.setValue(`plans.${index}.features`, [...features, { value: '' }]);
                                        }}>
                                            Add Feature
                                        </Button>
                                    </div>
                                    
                                     <FormField
                                        control={form.control}
                                        name={`plans.${index}.popular`}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                <FormLabel className="text-base">
                                                    Mark as Popular
                                                </FormLabel>
                                                <FormDescription>
                                                    This plan will be highlighted on the pricing page.
                                                </FormDescription>
                                                </div>
                                                <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                        />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Button type="submit">Save Changes</Button>
                </form>
            </Form>
        </div>
    );
}
