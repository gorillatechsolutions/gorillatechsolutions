
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { usePricingPlan } from '@/contexts/pricing-plan-context';
import type { PlanTier, PricingPlan } from '@/types/pricing-plan';
import { Skeleton } from '@/components/ui/skeleton';

declare global {
    interface Window {
      Razorpay: any;
    }
}

export default function UpgradePage() {
    const { user, updateUser } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const { plans, loading } = usePricingPlan();

    const handleUpgrade = (plan: PricingPlan) => {
        if (!user) {
             toast({
                variant: 'destructive',
                title: 'Not Logged In',
                description: `You must be logged in to upgrade your plan.`,
            });
            router.push('/login?redirect=/upgrade');
            return;
        }

        if (!plan.razorpayPlanId) {
             toast({
                variant: 'destructive',
                title: 'Plan Not Available',
                description: `This plan is not configured for online purchase. Please contact support.`,
            });
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxxxxxx', // Use test key as fallback
            plan_id: plan.razorpayPlanId,
            name: "Gorilla Tech Solutions",
            description: `Upgrade to ${plan.name} Plan`,
            image: "https://placehold.co/100x100.png",
            handler: function (response: any) {
                // In a real app, you would verify this on the backend
                console.log('Razorpay response:', response);
                updateUser(user.email, { role: plan.tier });
                toast({
                    title: 'Upgrade Successful!',
                    description: `You have successfully upgraded to the ${plan.name} plan.`,
                });
                router.push('/profile');
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone || ''
            },
            notes: {
                address: user.address || 'No address provided'
            },
            theme: {
                color: "#243878"
            }
        };

        if (typeof window.Razorpay === 'undefined') {
            toast({
                variant: 'destructive',
                title: 'Payment Gateway Error',
                description: 'Could not connect to the payment gateway. Please try again later.',
            });
            return;
        }

        const rzp = new window.Razorpay(options);
        rzp.open();
    }
    
    if (loading) {
        return (
             <div className="w-full bg-secondary/30 py-12 md:py-20">
                <div className="container mx-auto px-4">
                     <div className="text-center max-w-3xl mx-auto mb-12">
                        <Skeleton className="h-12 w-2/3 mx-auto" />
                        <Skeleton className="h-6 w-full mx-auto mt-4" />
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <Skeleton className="h-96 w-full" />
                         <Skeleton className="h-96 w-full" />
                         <Skeleton className="h-96 w-full" />
                     </div>
                </div>
            </div>
        )
    }


  return (
    <div className="w-full bg-secondary/30 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Choose Your Plan</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Unlock more features and take your experience to the next level. Select the plan that best fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                'flex flex-col border-2 transition-transform duration-300 transform hover:-translate-y-2',
                plan.popular ? 'border-primary shadow-2xl' : 'border-border'
              )}
            >
              {plan.popular && (
                <div className="ribbon-wrapper">
                    <div className="ribbon">Most Popular</div>
                </div>
              )}
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="flex items-baseline gap-2 pt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6">
                <Button 
                  className={cn("w-full", !plan.popular && "bg-accent text-accent-foreground hover:bg-accent/90")}
                  variant={plan.popular ? 'default' : 'secondary'}
                  onClick={() => handleUpgrade(plan)}
                  disabled={user?.role === plan.tier}
                >
                  {user?.role === plan.tier ? 'Current Plan' : plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center text-muted-foreground text-sm">
            <p>All plans are billed monthly. You can cancel or change your plan at any time from your profile.</p>
        </div>
      </div>
    </div>
  );
}
