
import type { CaseStudy } from '@/types/case-study';

const createContent = (text: string): string => {
    return text.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
};

export const demoCaseStudies: CaseStudy[] = [];
