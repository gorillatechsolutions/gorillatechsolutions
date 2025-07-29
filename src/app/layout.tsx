
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
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
import { SiteSettingsManager } from '@/components/layout/site-settings-manager';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    template: '%s | Gorilla Tech Solutions',
    default: 'Gorilla Tech Solutions | Data-Driven Digital Marketing Agency',
  },
  description: 'Gorilla Tech Solutions is a leading digital marketing agency specializing in SEO, PPC, and content strategies to drive measurable growth for your business.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <AuthProvider>
          <MessageProvider>
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
                                            <SiteSettingsManager />
                                            <div className="relative flex min-h-dvh flex-col">
                                                <Header />
                                                <main className="flex-1">{children}</main>
                                                <Footer />
                                            </div>
                                            <Toaster />
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
          </MessageProvider>
        </AuthProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </html>
  );
}
