
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type PlanTier = 'premium' | 'gold' | 'platinum';

const plans = [
  {
    name: 'Premium',
    tier: 'premium' as PlanTier,
    price: '$29',
    description: 'Perfect for professionals who need advanced features.',
    features: [
      'Advanced analytics',
      'Priority support',
      'Access to beta features',
      '5 team members',
      '100GB storage'
    ],
    cta: 'Choose Premium',
  },
  {
    name: 'Gold',
    tier: 'gold' as PlanTier,
    price: '$59',
    description: 'Ideal for growing businesses that require more power.',
    features: [
      'All Premium features',
      'Dedicated account manager',
      'API access',
      '20 team members',
      '500GB storage'
    ],
    cta: 'Choose Gold',
    popular: true,
  },
  {
    name: 'Platinum',
    tier: 'platinum' as PlanTier,
    price: '$99',
    description: 'The ultimate solution for large enterprises.',
    features: [
      'All Gold features',
      '24/7 dedicated support',
      'On-premise deployment option',
      'Unlimited team members',
      'Unlimited storage'
    ],
    cta: 'Choose Platinum',
  },
];

export default function UpgradePage() {
    const { user, updateUser } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const handleUpgrade = (tier: PlanTier) => {
        if (user) {
            updateUser(user.email, { role: tier });
            toast({
                title: 'Upgrade Successful!',
                description: `You have successfully upgraded to the ${tier} plan.`,
            });
            router.push('/profile');
        } else {
             toast({
                variant: 'destructive',
                title: 'Not Logged In',
                description: `You must be logged in to upgrade your plan.`,
            });
            router.push('/login');
        }
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
                  onClick={() => handleUpgrade(plan.tier)}
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
