
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { PricingPlan } from '@/types/pricing-plan';

const defaultPlans: PricingPlan[] = [
  {
    name: 'Premium',
    tier: 'premium',
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
    popular: false,
    razorpayPlanId: 'plan_H5gA4f7iZ6k3fE',
  },
  {
    name: 'Gold',
    tier: 'gold',
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
    razorpayPlanId: 'plan_H5gCj2fX9l3f4G',
  },
  {
    name: 'Platinum',
    tier: 'platinum',
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
    popular: false,
    razorpayPlanId: 'plan_H5gE1aB3c4d5F6',
  },
];


interface PricingPlanContextType {
  plans: PricingPlan[];
  loading: boolean;
  updatePlans: (newPlans: PricingPlan[]) => void;
}

const PricingPlanContext = createContext<PricingPlanContextType | undefined>(undefined);

const PRICING_PLANS_STORAGE_KEY = 'pricingPlans';

export const PricingPlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans);
  const [loading, setLoading] = useState(true);

  const syncPlans = useCallback(() => {
    try {
      const storedPlans = localStorage.getItem(PRICING_PLANS_STORAGE_KEY);
      if (storedPlans) {
        const parsed = JSON.parse(storedPlans);
        if (Array.isArray(parsed) && parsed.length > 0) {
            const plansWithDefaults = parsed.map((plan, index) => ({
              ...defaultPlans[index],
              ...plan
            }));
            setPlans(plansWithDefaults);
        } else {
            setPlans(defaultPlans);
            localStorage.setItem(PRICING_PLANS_STORAGE_KEY, JSON.stringify(defaultPlans));
        }
      } else {
        localStorage.setItem(PRICING_PLANS_STORAGE_KEY, JSON.stringify(defaultPlans));
        setPlans(defaultPlans);
      }
    } catch (e) {
      console.error("Failed to parse pricing plans from localStorage", e);
      setPlans(defaultPlans);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncPlans();
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === PRICING_PLANS_STORAGE_KEY) {
        syncPlans();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncPlans]);

  const updatePlans = (newPlans: PricingPlan[]) => {
    setPlans(newPlans);
    localStorage.setItem(PRICING_PLANS_STORAGE_KEY, JSON.stringify(newPlans));
  };

  return (
    <PricingPlanContext.Provider value={{ plans, loading, updatePlans }}>
      {children}
    </PricingPlanContext.Provider>
  );
};

export const usePricingPlan = (): PricingPlanContextType => {
  const context = useContext(PricingPlanContext);
  if (context === undefined) {
    throw new Error('usePricingPlan must be used within a PricingPlanProvider');
  }
  return context;
};
