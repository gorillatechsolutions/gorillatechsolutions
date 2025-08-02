
import { PublicProviders } from '@/components/providers';
import { CaseStudyDetailPageClient } from '@/components/case-study-detail-page-client';

function CaseStudyDetailPageContent({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return <CaseStudyDetailPageClient slug={slug} />;
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  return (
    <PublicProviders>
      <CaseStudyDetailPageContent params={params} />
    </PublicProviders>
  );
}
