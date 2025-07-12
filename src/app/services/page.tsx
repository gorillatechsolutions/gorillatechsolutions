import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Search, MousePointerClick, Share2, FileText, Mail, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: <Search className="h-8 w-8 text-accent" />,
    title: 'Search Engine Optimization (SEO)',
    description: 'Boost your organic visibility and climb the search rankings. We use proven strategies to drive qualified traffic to your website.'
  },
  {
    icon: <MousePointerClick className="h-8 w-8 text-accent" />,
    title: 'Pay-Per-Click (PPC) Advertising',
    description: 'Get immediate results with targeted ad campaigns on Google, Bing, and social platforms. Maximize your ROI with our expert management.'
  },
  {
    icon: <Share2 className="h-8 w-8 text-accent" />,
    title: 'Social Media Marketing',
    description: 'Engage your audience and build a loyal community. We create and manage social media campaigns that resonate with your customers.'
  },
  {
    icon: <FileText className="h-8 w-8 text-accent" />,
    title: 'Content Creation',
    description: 'From compelling blog posts to captivating videos, we produce high-quality content that tells your story and drives engagement.'
  },
  {
    icon: <Mail className="h-8 w-8 text-accent" />,
    title: 'Email Marketing',
    description: 'Nurture leads and retain customers with personalized email campaigns. We design, write, and manage emails that convert.'
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-accent" />,
    title: 'Analytics & Reporting',
    description: 'Understand what\'s working and what\'s not. We provide clear, actionable reports to guide your marketing decisions.'
  }
];

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-20">
      <header className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Services</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We offer a comprehensive suite of digital marketing services tailored to your business needs.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col text-center items-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="items-center">
              {service.icon}
              <CardTitle className="font-headline mt-4">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
