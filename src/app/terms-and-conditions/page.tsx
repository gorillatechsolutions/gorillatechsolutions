
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and Conditions for Gorilla Tech Solutions.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="w-full text-foreground" style={{ backgroundColor: '#f2f3f5' }}>
      <section className="bg-secondary/30 pt-8 pb-0 md:pt-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Terms and Conditions</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-border/80">
            <CardContent className="p-8 md:p-10 prose prose-lg max-w-none mx-auto text-foreground prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80 bg-[#faf7f7]">
              <p>
                Welcome to Gorilla Tech Solutions. These terms and conditions outline the rules and regulations for the use of our website. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Gorilla Tech Solutions's website if you do not agree to all of the terms and conditions stated on this page.
              </p>

              <h2>1. Introduction</h2>
              <p>
                These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Gorilla Tech Solutions accessible at this domain. These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here.
              </p>
              
              <h2>2. Intellectual Property Rights</h2>
              <p>
                Other than the content you own, under these Terms, Gorilla Tech Solutions and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
              </p>

              <h2>3. Restrictions</h2>
              <p>You are specifically restricted from all of the following:</p>
              <ul>
                <li>publishing any Website material in any other media;</li>
                <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                <li>publicly performing and/or showing any Website material;</li>
                <li>using this Website in any way that is or may be damaging to this Website;</li>
                <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
                <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
              </ul>

              <h2>4. Your Content</h2>
              <p>
                In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Gorilla Tech Solutions a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
              </p>

              <h2>5. No warranties</h2>
              <p>
                This Website is provided “as is,” with all faults, and Gorilla Tech Solutions express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
              </p>

              <h2>6. Limitation of liability</h2>
              <p>
                In no event shall Gorilla Tech Solutions, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Gorilla Tech Solutions, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
              </p>

              <h2>7. Governing Law & Jurisdiction</h2>
              <p>
                These Terms will be governed by and interpreted in accordance with the laws of the State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in for the resolution of any disputes.
              </p>

              <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/contact">Contact Us</Link>
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
