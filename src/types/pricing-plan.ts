
export type PlanTier = 'user' | 'premium' | 'gold' | 'platinum';

export interface PricingPlan {
  name: string;
  tier: PlanTier;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}
