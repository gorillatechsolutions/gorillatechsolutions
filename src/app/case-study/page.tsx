
import type { Metadata } from 'next';
import { CaseStudyList } from '@/components/case-study-list';

export const metadata: Metadata = {
    title: 'Case Studies | Gorilla Tech Solutions',
    description: 'Explore insights, tips, and case studies on digital marketing, SEO, PPC, and more from the experts at Gorilla Tech Solutions.',
};

const allCaseStudies = [
  {
    slug: 'tripled-organic-traffic-ecommerce',
    title: 'How We Tripled Organic Traffic for a Sustainable eCommerce Brand',
    excerpt: 'Our comprehensive SEO and content strategy established EcoFriendly Goods as a thought leader, driving a 300% increase in organic traffic and doubling sales.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'ecommerce analytics',
    tags: ['SEO', 'Content Marketing', 'eCommerce'],
    author: 'Jane Doe',
    date: 'October 26, 2023'
  },
  {
    slug: 'slashing-b2b-saas-cpa',
    title: 'Slashing a B2B SaaS Company\'s CPA by 40%',
    excerpt: 'We rebuilt a B2B SaaS PPC campaign from the ground up, focusing on precise audience targeting to dramatically improve lead quality and lower acquisition costs.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'tech startup',
    tags: ['PPC', 'CRO', 'B2B SaaS'],
    author: 'John Smith',
    date: 'September 15, 2023'
  },
  {
    slug: 'building-community-with-social-media',
    title: 'Building a Community and Driving Foot Traffic with Social Media',
    excerpt: 'Through engaging content and targeted local ads, we transformed a local cafe\'s social media presence into a vibrant hub for coffee lovers, increasing daily foot traffic.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'cafe interior',
    tags: ['Social Media', 'Local SEO', 'Community'],
    author: 'Alice Johnson',
    date: 'August 02, 2023'
  },
    {
    slug: 'healthcare-content-strategy',
    title: 'Content Strategy for a Dental Clinic: 150% Increase in New Patient Bookings',
    excerpt: 'We developed a content strategy centered on patient education, resulting in a 150% increase in new patient bookings through organic search and social media.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'dental clinic',
    tags: ['Content Marketing', 'Healthcare', 'SEO'],
    author: 'Emily White',
    date: 'July 21, 2023'
  },
  {
    slug: 'financial-services-lead-gen',
    title: 'Generating High-Quality Leads for a Financial Advisor with LinkedIn Ads',
    excerpt: 'Our targeted LinkedIn advertising campaign generated a 5X return on ad spend and a steady stream of high-quality leads for a financial advisory firm.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'finance meeting',
    tags: ['PPC', 'Lead Generation', 'Financial Services'],
    author: 'Michael Brown',
    date: 'June 10, 2023'
  },
  {
    slug: 'real-estate-local-seo',
    title: 'Dominating Local Search: How a Real Estate Agency Ranked #1',
    excerpt: 'A hyper-focused local SEO strategy helped a boutique real estate agency achieve the #1 ranking for "best real estate agent" in their city, leading to record sales.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'modern house',
    tags: ['Local SEO', 'Real Estate', 'Branding'],
    author: 'Sarah Davis',
    date: 'May 05, 2023'
  },
  {
    slug: 'tech-startup-product-launch',
    title: 'Launching a New Tech Product with an Integrated Digital Campaign',
    excerpt: 'We executed an integrated digital campaign for a new app launch, securing 50,000 downloads in the first month through a mix of PR, influencer marketing, and ads.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'mobile app',
    tags: ['Product Launch', 'Tech', 'Integrated Marketing'],
    author: 'Chris Green',
    date: 'April 18, 2023'
  },
  {
    slug: 'non-profit-email-marketing',
    title: 'Boosting Donations by 200% Through Targeted Email Nurture Sequences',
    excerpt: 'We revamped a non-profit\'s email marketing strategy, implementing donor segmentation and automated nurture sequences that boosted online donations by 200%.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'community event',
    tags: ['Email Marketing', 'Non-Profit', 'Automation'],
    author: 'Jessica Miller',
    date: 'March 22, 2023'
  },
  {
    slug: 'hospitality-social-media-engagement',
    title: 'Increasing Hotel Bookings by 75% with a Visual Social Media Strategy',
    excerpt: 'A visually-driven Instagram and Pinterest strategy for a luxury hotel resulted in a 75% increase in direct bookings and a significant lift in brand engagement.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'luxury hotel',
    tags: ['Social Media', 'Hospitality', 'eCommerce'],
    author: 'David Wilson',
    date: 'February 14, 2023'
  },
  {
    slug: 'education-ppc-enrollment',
    title: 'Driving Student Enrollment for an Online Course with Google Ads',
    excerpt: 'Our optimized Google Ads funnel for an online coding bootcamp lowered the cost per acquisition by 30% and increased student enrollment by 50% semester-over-semester.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'online learning',
    tags: ['PPC', 'Education', 'Lead Generation'],
    author: 'Laura Taylor',
    date: 'January 30, 2023'
  }
];

export default function CaseStudyPage() {
  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Case Studies</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our success stories and see the real-world results we've delivered.
          </p>
        </div>
      </section>
      
      <CaseStudyList allCaseStudies={allCaseStudies} />
    </div>
  );
}
