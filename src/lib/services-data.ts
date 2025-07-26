
import type { Service } from '@/types/service';

export const initialServices: Service[] = [
    {
        icon: 'https://placehold.co/128x128.png',
        title: "Digital Marketing",
        slug: "digital-marketing",
        description: "Boost your visibility on search engines and drive organic traffic with our data-driven SEO strategies.",
        price: "450.00",
        originalPrice: "500.00",
        popular: true,
    },
    {
        icon: 'https://placehold.co/128x128.png',
        title: "PR Marketing",
        slug: "pr-marketing",
        description: "Enhance your brand's public image and build strong media relations with our strategic PR marketing services.",
        price: "650.00",
        originalPrice: "725.00",
        popular: true,
    },
    {
        icon: 'https://placehold.co/128x128.png',
        title: "Social Media Marketing",
        slug: "social-media-marketing",
        description: "Engage your audience and build a loyal community. We create and manage social media campaigns that resonate.",
        price: "320.00",
        originalPrice: "355.00",
        popular: false,
    },
    {
        icon: 'https://placehold.co/128x128.png',
        title: "Content Creation",
        slug: "content-creation",
        description: "From blog posts to video scripts, our creative team produces high-quality content that captivates your audience.",
        price: "280.00",
        originalPrice: "310.00",
        popular: false,
    },
    {
        icon: 'https://placehold.co/128x128.png',
        title: "Web Development",
        slug: "web-development",
        description: "We build fast, responsive, and user-friendly websites that provide an exceptional user experience.",
        price: "1200.00",
        originalPrice: "1350.00",
        popular: true,
    },
    {
        icon: 'https://placehold.co/128x128.png',
        title: "Email Marketing",
        slug: "email-marketing",
        description: "Nurture leads and drive conversions with automated email campaigns and personalized newsletters.",
        price: "250.00",
        originalPrice: "275.00",
        popular: false,
    }
];
