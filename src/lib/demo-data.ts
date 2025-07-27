
import type { CaseStudy } from '@/types/case-study';

const createContent = (text: string): string => {
    return text.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
};

export const demoCaseStudies: CaseStudy[] = [
    {
        slug: 'tripled-organic-traffic-ecommerce',
        title: 'How We Tripled Organic Traffic for a Major eCommerce Brand',
        excerpt: 'Discover the SEO strategies that led to a 300% increase in organic traffic and a 150% boost in online sales for a leading eCommerce retailer.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'ecommerce analytics chart',
        tags: ['SEO', 'eCommerce', 'Growth'],
        author: 'Jane Doe',
        date: '2024-05-15T10:00:00Z',
        views: 2458,
        metaTitle: 'How We Tripled Organic Traffic for a Major eCommerce Brand',
        metaDescription: 'Discover the SEO strategies that led to a 300% increase in organic traffic and a 150% boost in online sales for a leading eCommerce retailer.',
        metaKeywords: 'SEO, eCommerce, Growth',
        content: createContent(`We started with a deep dive into their existing SEO setup. A thorough technical audit revealed significant issues with site speed, mobile usability, and indexation that were holding them back. We addressed these foundational problems first, ensuring a solid base for our content and link-building efforts.

Our keyword research identified hundreds of high-intent transactional keywords they weren't ranking for. We developed a content strategy around these terms, creating in-depth product guides, comparison articles, and blog posts that addressed user needs at every stage of the funnel.

The final piece was a targeted digital PR campaign that earned high-authority backlinks from respected industry publications, significantly boosting their domain authority and search rankings across the board. The results speak for themselves: a threefold increase in organic traffic and a massive uplift in revenue.`)
    },
    {
        slug: 'slashing-b2b-saas-cpa',
        title: 'Slashing B2B SaaS Cost-Per-Acquisition by 60% with PPC',
        excerpt: 'A deep dive into the PPC optimization techniques that dramatically reduced CPA while increasing qualified lead volume for a B2B SaaS company.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'saas dashboard chart',
        tags: ['PPC', 'SaaS', 'Lead Generation'],
        author: 'John Smith',
        date: '2024-04-22T14:30:00Z',
        views: 1892,
        metaTitle: 'Slashing B2B SaaS Cost-Per-Acquisition by 60% with PPC',
        metaDescription: 'A deep dive into the PPC optimization techniques that dramatically reduced CPA while increasing qualified lead volume for a B2B SaaS company.',
        metaKeywords: 'PPC, SaaS, Lead Generation',
        content: createContent(`The client's primary challenge was a high Cost-Per-Acquisition (CPA) on their Google Ads campaigns, which was limiting their ability to scale. Our first step was to restructure their account, moving from broad match keywords to a more controlled setup using SKAGs (Single Keyword Ad Groups).

We implemented a multi-layered bidding strategy, combining automated bidding with manual adjustments based on performance data like device, time of day, and audience segment. We also overhauled their ad copy and landing pages, running continuous A/B tests to improve quality scores and conversion rates.

The result was a 60% reduction in CPA within three months. More importantly, the quality of leads improved, as measured by the sales team's conversion rate from lead to demo. This allowed the client to reinvest the savings into scaling their campaigns and accelerating their growth.`)
    },
    {
        slug: 'building-community-with-social-media',
        title: 'Building a Thriving Community for a Lifestyle Brand',
        excerpt: 'Learn how we used authentic engagement and user-generated content to build a highly active and loyal social media community.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'social media community',
        tags: ['Social Media', 'Branding', 'Community'],
        author: 'Alice Johnson',
        date: '2024-03-10T09:00:00Z',
        views: 3102,
        metaTitle: 'Building a Thriving Community for a Lifestyle Brand',
        metaDescription: 'Learn how we used authentic engagement and user-generated content to build a highly active and loyal social media community.',
        metaKeywords: 'Social Media, Branding, Community',
        content: createContent(`The brand had a presence on social media but lacked real engagement. Our strategy shifted the focus from broadcasting marketing messages to fostering genuine conversations. We created content pillars that resonated with their audience's values and interests, not just their products.

A key initiative was launching a User-Generated Content (UGC) campaign with a branded hashtag. We celebrated and amplified the best customer content, making them feel like an integral part of the brand story. This not only provided a steady stream of authentic content but also built immense trust and loyalty.

We coupled this with proactive community management, responding to every comment and message, and initiating discussions. Within a year, their engagement rate on Instagram increased by 500%, and their follower count grew organically by 150%, creating a powerful asset for the brand.`)
    },
    {
        slug: 'healthcare-content-strategy',
        title: 'Dominating Search with a Data-Driven Healthcare Content Strategy',
        excerpt: 'How we created a pillar-and-cluster content model that established a healthcare provider as a leading authority in their field.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'healthcare professionals discussing',
        tags: ['Content Marketing', 'SEO', 'Healthcare'],
        author: 'Dr. Emily Carter',
        date: '2024-02-18T11:00:00Z',
        views: 1654,
        metaTitle: 'Dominating Search with a Data-Driven Healthcare Content Strategy',
        metaDescription: 'How we created a pillar-and-cluster content model that established a healthcare provider as a leading authority in their field.',
        metaKeywords: 'Content Marketing, SEO, Healthcare',
        content: createContent(`In the competitive healthcare space, trust is paramount. Our goal was to build topical authority through a comprehensive content strategy. We developed a "pillar page" on their core specialty, a comprehensive resource covering every aspect of the topic.

This pillar page was supported by dozens of "cluster" articles, each diving deep into a specific sub-topic. These articles internally linked back to the pillar page, signaling to Google the provider's expertise on the subject. All content was medically reviewed and cited authoritative sources, adhering to E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) principles.

This strategy resulted in first-page rankings for highly competitive medical terms, a 400% increase in organic traffic to their blog, and a significant rise in patient inquiries directly attributed to their content.`)
    },
    {
        slug: 'non-profit-email-marketing',
        title: 'Boosting Donations by 80% for a Non-Profit with Email Automation',
        excerpt: 'See how we leveraged email segmentation and automated nurturing sequences to re-engage donors and increase online contributions by 80%.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'donation charity email',
        tags: ['Email Marketing', 'Non-Profit', 'Automation'],
        author: 'Michael Chen',
        date: '2024-01-25T16:45:00Z',
        views: 987,
        metaTitle: 'Boosting Donations by 80% for a Non-Profit with Email Automation',
        metaDescription: 'See how we leveraged email segmentation and automated nurturing sequences to re-engage donors and increase online contributions by 80%.',
        metaKeywords: 'Email Marketing, Non-Profit, Automation',
        content: createContent(`A non-profit organization had a large list of past donors but struggled with repeat contributions. We implemented a new email marketing strategy centered on automation and personalization. We started by segmenting their audience based on donation history, engagement level, and interests.

We then built several automated email sequences. A welcome series for new subscribers educated them on the organization's impact. A re-engagement campaign for lapsed donors highlighted recent successes and made a compelling case for renewed support. We also created personalized thank-you sequences that made donors feel truly valued.

The results were transformative. The automated campaigns led to an 80% increase in online donations over six months, with a 50% increase in the rate of repeat donations, providing a sustainable new revenue stream for their important work.`)
    },
    {
        slug: 'real-estate-video-marketing',
        title: 'How Video Marketing Generated 200+ High-Quality Real Estate Leads',
        excerpt: 'This case study explores the video content strategy that helped a real estate agency generate over 200 qualified buyer and seller leads in one quarter.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'real estate video',
        tags: ['Video Marketing', 'Real Estate', 'Lead Generation'],
        author: 'Samantha Blue',
        date: '2023-12-11T13:00:00Z',
        views: 4123,
        metaTitle: 'How Video Marketing Generated 200+ High-Quality Real Estate Leads',
        metaDescription: 'This case study explores the video content strategy that helped a real estate agency generate over 200 qualified buyer and seller leads in one quarter.',
        metaKeywords: 'Video Marketing, Real Estate, Lead Generation',
        content: createContent('Facing a saturated market, a real estate agency needed to stand out. We developed a video-first strategy focusing on property tours, neighborhood guides, and agent profiles. High-quality, professionally shot videos were distributed across YouTube, Instagram Reels, and their website. Each video was optimized for search and included clear calls-to-action, driving viewers to dedicated landing pages. This approach not only showcased their properties effectively but also built the personal brands of their agents, establishing them as local experts. The campaign resulted in a massive increase in engagement and generated over 200 high-intent leads, proving the power of video in a visual industry.')
    },
    {
        slug: 'cro-for-subscription-box',
        title: 'Increasing Subscription Box Sign-ups by 45% Through CRO',
        excerpt: 'A detailed breakdown of the Conversion Rate Optimization (CRO) process that boosted sign-ups for a monthly subscription box service by 45%.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'website conversion optimization',
        tags: ['CRO', 'eCommerce', 'UX/UI'],
        author: 'Chris Green',
        date: '2023-11-05T18:00:00Z',
        views: 1345,
        metaTitle: 'Increasing Subscription Box Sign-ups by 45% Through CRO',
        metaDescription: 'A detailed breakdown of the Conversion Rate Optimization (CRO) process that boosted sign-ups for a monthly subscription box service by 45%.',
        metaKeywords: 'CRO, eCommerce, UX/UI',
        content: createContent('A subscription box company had steady traffic but a low conversion rate. Using heatmaps, user session recordings, and surveys, we identified key friction points in their sign-up funnel. The pricing page was confusing, and the checkout process had too many steps. We designed and A/B tested a simplified, transparent pricing table and a streamlined, single-page checkout. We also added social proof elements like customer testimonials and trust badges. The winning variations were implemented, leading to a 45% uplift in the visitor-to-subscriber conversion rate and a significant increase in monthly recurring revenue.')
    },
    {
        slug: 'influencer-marketing-launch',
        title: 'Launching a Fashion Brand with a Targeted Influencer Campaign',
        excerpt: 'How a strategic influencer marketing campaign generated massive buzz and drove initial sales for a new direct-to-consumer fashion brand.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'fashion influencer social',
        tags: ['Influencer Marketing', 'Fashion', 'Branding'],
        author: 'Olivia White',
        date: '2023-10-19T12:20:00Z',
        views: 3890,
        metaTitle: 'Launching a Fashion Brand with a Targeted Influencer Campaign',
        metaDescription: 'How a strategic influencer marketing campaign generated massive buzz and drove initial sales for a new direct-to-consumer fashion brand.',
        metaKeywords: 'Influencer Marketing, Fashion, Branding',
        content: createContent('For a new fashion brand launch, we bypassed traditional advertising in favor of a micro-influencer-focused campaign. We identified 50 influencers whose personal style and audience demographics perfectly aligned with the brand. Instead of one-off sponsored posts, we built long-term partnerships, providing them with products and creative freedom. The authentic content they created resonated with their followers, driving high engagement and traffic. The campaign culminated in a synchronized "launch day" push, resulting in a sold-out initial collection and a foundational base of loyal customers.')
    },
    {
        slug: 'local-seo-for-law-firm',
        title: 'Dominating Local Search: SEO for a Multi-Location Law Firm',
        excerpt: 'The strategies we used to achieve top-3 map pack rankings for a law firm across five competitive metropolitan areas.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'law firm office',
        tags: ['Local SEO', 'Legal', 'SEO'],
        author: 'David Black',
        date: '2023-09-28T09:30:00Z',
        views: 1101,
        metaTitle: 'Dominating Local Search: SEO for a Multi-Location Law Firm',
        metaDescription: 'The strategies we used to achieve top-3 map pack rankings for a law firm across five competitive metropolitan areas.',
        metaKeywords: 'Local SEO, Legal, SEO',
        content: createContent('A law firm with multiple offices struggled to gain visibility in local search results. Our approach involved a complete overhaul of their local SEO foundation. We optimized their Google Business Profiles for each location, ensuring consistency and completeness. We built location-specific service pages on their website, targeting geographically-modified keywords. A citation-building campaign cleaned up inconsistent NAP (Name, Address, Phone number) information and built new, authoritative local citations. This comprehensive strategy resulted in consistent top-3 rankings in the Google Map Pack for their primary practice areas in all five target cities, leading to a 120% increase in qualified calls from their website.')
    },
    {
        slug: 'app-store-optimization',
        title: 'ASO Strategy Boosts App Downloads by 250%',
        excerpt: 'How we used App Store Optimization (ASO) to increase organic downloads for a mobile fitness app by 250% in six months.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'mobile app store',
        tags: ['ASO', 'Mobile', 'Growth'],
        author: 'Megan Yellow',
        date: '2023-08-14T15:00:00Z',
        views: 2940,
        metaTitle: 'ASO Strategy Boosts App Downloads by 250%',
        metaDescription: 'How we used App Store Optimization (ASO) to increase organic downloads for a mobile fitness app by 250% in six months.',
        metaKeywords: 'ASO, Mobile, Growth',
        content: createContent('A fitness app was getting lost in the crowded App Store and Google Play. Our ASO strategy began with extensive keyword research to understand what users were searching for. We optimized the app title, subtitle, and keyword fields with high-volume, relevant terms. We then focused on creative assets, A/B testing different app icons, screenshots, and preview videos to improve the tap-through rate from search results. This data-led approach to both keyword and creative optimization led to higher rankings and better conversion, resulting in a 250% increase in organic downloads and a lower reliance on paid user acquisition.')
    },
    {
        slug: 'manufacturing-b2b-content',
        title: 'Content Marketing for a Niche B2B Manufacturing Company',
        excerpt: 'How a long-form content strategy positioned a niche manufacturing company as an industry leader and generated high-value B2B leads.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'manufacturing factory industrial',
        tags: ['Content Marketing', 'B2B', 'Manufacturing'],
        author: 'Gary Oldman',
        date: '2023-07-20T10:10:00Z',
        views: 843,
        metaTitle: 'Content Marketing for a Niche B2B Manufacturing Company',
        metaDescription: 'How a long-form content strategy positioned a niche manufacturing company as an industry leader and generated high-value B2B leads.',
        metaKeywords: 'Content Marketing, B2B, Manufacturing',
        content: createContent('A B2B manufacturing company needed to reach a highly technical audience of engineers and procurement managers. We developed a content strategy focused on creating in-depth, problem-solving content. This included detailed white papers, technical guides, and case studies that addressed their customers\' specific challenges. We gated the most valuable content behind simple forms to capture leads. The content was promoted through targeted LinkedIn campaigns and industry forums. This approach established the company as a go-to resource, building trust and generating a steady stream of highly qualified leads from major players in their industry.')
    },
    {
        slug: 'restaurant-social-media-makeover',
        title: 'A Recipe for Success: Social Media for a New Restaurant',
        excerpt: 'How a "mouth-watering" visual strategy on Instagram and Facebook drove reservations and filled tables for a new restaurant opening.',
        image: 'https://placehold.co/1200x600.png',
        ogImage: 'https://placehold.co/1200x630.png',
        dataAiHint: 'restaurant food photography',
        tags: ['Social Media', 'Restaurant', 'Local Business'],
        author: 'Isabelle French',
        date: '2023-06-30T19:00:00Z',
        views: 3591,
        metaTitle: 'A Recipe for Success: Social Media for a New Restaurant',
        metaDescription: 'How a "mouth-watering" visual strategy on Instagram and Facebook drove reservations and filled tables for a new restaurant opening.',
        metaKeywords: 'Social Media, Restaurant, Local Business',
        content: createContent('For a new restaurant, creating pre-launch buzz was crucial. Our strategy centered on high-quality, professional food photography and videography. We created a visually stunning Instagram feed that made their dishes irresistible. We ran a contest to win a "First Taste" dinner before the official opening, which generated thousands of followers and email sign-ups. Leading up to the launch, we used targeted Facebook and Instagram ads to reach local foodies. The result was a fully booked opening week and a strong, engaged local following from day one, setting the stage for sustained success.')
    }
];
