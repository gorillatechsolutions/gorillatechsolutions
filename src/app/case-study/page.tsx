import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const caseStudies = [
  {
    client: 'EcoFriendly Goods',
    title: '300% Increase in Organic Traffic',
    description: 'By implementing a comprehensive SEO and content strategy, we tripled organic traffic and doubled online sales in just six months.',
    image: 'https://placehold.co/600x400.png',
    tags: ['SEO', 'Content Marketing'],
    dataAiHint: 'ecommerce analytics'
  },
  {
    client: 'Future Tech Inc.',
    title: 'Reduced Cost-Per-Acquisition by 40%',
    description: 'Our targeted PPC campaigns and landing page optimizations led to a significant drop in CPA while increasing lead quality.',
    image: 'https://placehold.co/600x400.png',
    tags: ['PPC', 'CRO'],
    dataAiHint: 'tech startup'
  },
  {
    client: 'Local Cafe',
    title: '5x Growth in Social Media Engagement',
    description: 'We built a vibrant online community through engaging content and strategic social media management, resulting in more foot traffic.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Social Media', 'Local SEO'],
    dataAiHint: 'cafe interior'
  },
];

export default function CaseStudyPage() {
  return (
    <div className="container py-12 md:py-20">
      <header className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Case Studies</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Don't just take our word for it. See the results we've delivered for our clients.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((study) => (
          <Card key={study.title} className="flex flex-col overflow-hidden group">
            <div className="overflow-hidden">
                <Image src={study.image} alt={study.title} width={600} height={400} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={study.dataAiHint} />
            </div>
            <CardHeader>
              <p className="text-sm text-accent font-semibold">{study.client}</p>
              <CardTitle className="font-headline">{study.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription>{study.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex-wrap gap-2">
              {study.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
