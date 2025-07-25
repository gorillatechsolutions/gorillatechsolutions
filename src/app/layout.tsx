
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
          <CaseStudyProvider>
            <AppProvider>
              <ServiceProvider>
                <ContactSettingsProvider>
                  <AboutPageProvider>
                    <LegalPageProvider>
                      <HomePageProvider>
                        <ReviewProvider>
                          <div className="relative flex min-h-dvh flex-col">
                              <Header />
                              <main className="flex-1">{children}</main>
                              <Footer />
                          </div>
                          <Toaster />
                        </ReviewProvider>
                      </HomePageProvider>
                    </LegalPageProvider>
                  </AboutPageProvider>
                </ContactSettingsProvider>
              </ServiceProvider>
            </AppProvider>
          </CaseStudyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
