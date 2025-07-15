
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucUxwCkV2ab4UQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
            <div className="relative flex min-h-dvh flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
            <Toaster />
      </body>
    </html>
  );
}
