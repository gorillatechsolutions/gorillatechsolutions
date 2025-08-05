
'use client';

import { AuthProvider } from '@/contexts/auth-context';
import { CaseStudyProvider } from '@/contexts/case-study-context';
import { AppProvider } from '@/contexts/app-context';
import { ServiceProvider } from '@/contexts/service-context';
import { ContactSettingsProvider } from '@/contexts/contact-settings-context';
import { AboutPageProvider } from '@/contexts/about-page-context';
import { LegalPageProvider } from '@/contexts/legal-page-context';
import { HomePageProvider } from '@/contexts/home-page-context';
import { ReviewProvider } from '@/contexts/review-context';
import { ServicesPageProvider } from '@/contexts/services-page-context';
import { CaseStudiesPageProvider } from '@/contexts/case-studies-page-context';
import { AppsPageProvider } from '@/contexts/apps-page-context';
import { ApplicationPageProvider } from '@/contexts/application-page-context';
import { InvestmentPageProvider } from '@/contexts/investment-page-context';
import { MessageProvider } from '@/contexts/message-context';
import { PricingPlanProvider } from '@/contexts/pricing-plan-context';
import { SiteSettingsProvider } from '@/contexts/site-settings-context';
import { ChatProvider } from '@/contexts/chat-context';

export function PublicProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MessageProvider>
        <ChatProvider>
          <SiteSettingsProvider>
            <CaseStudyProvider>
              <AppProvider>
                <ServiceProvider>
                  <ContactSettingsProvider>
                    <AboutPageProvider>
                      <LegalPageProvider>
                        <HomePageProvider>
                          <ReviewProvider>
                            <ServicesPageProvider>
                              <CaseStudiesPageProvider>
                                <AppsPageProvider>
                                  <ApplicationPageProvider>
                                    <InvestmentPageProvider>
                                      <PricingPlanProvider>
                                        {children}
                                      </PricingPlanProvider>
                                    </InvestmentPageProvider>
                                  </ApplicationPageProvider>
                                </AppsPageProvider>
                              </CaseStudiesPageProvider>
                            </ServicesPageProvider>
                          </ReviewProvider>
                        </HomePageProvider>
                      </LegalPageProvider>
                    </AboutPageProvider>
                  </ContactSettingsProvider>
                </ServiceProvider>
              </AppProvider>
            </CaseStudyProvider>
          </SiteSettingsProvider>
        </ChatProvider>
      </MessageProvider>
    </AuthProvider>
  );
}
