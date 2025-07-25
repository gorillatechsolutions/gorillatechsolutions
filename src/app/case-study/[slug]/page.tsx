
import { CaseStudyDetailPageClient } from '@/components/case-study-detail-page-client';

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  return <CaseStudyDetailPageClient slug={params.slug} />;
}
