
import { CaseStudyDetailPageClient } from '@/components/case-study-detail-page-client';

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return <CaseStudyDetailPageClient slug={slug} />;
}
