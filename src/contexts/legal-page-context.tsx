
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { LegalPageContent } from '@/types/legal-page';

const defaultPrivacyPolicy = `<p>Gorilla Tech Solutions ("us", "we", or "our") operates the website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p><h2>Information Collection and Use</h2><p>We collect several different types of information for various purposes to provide and improve our Service to you.</p><h3>Types of Data Collected</h3><ul><li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, First name and last name, Phone number, Cookies and Usage Data.</li><li><strong>Usage Data:</strong> We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li></ul><h2>How We Use Your Information</h2><p>We use the collected data for various purposes:</p><ul><li>To provide and maintain the Service</li><li>To notify you about changes to our Service</li><li>To allow you to participate in interactive features of our Service when you choose to do so</li><li>To provide customer care and support</li><li>To provide analysis or valuable information so that we can improve the Service</li><li>To monitor the usage of the Service</li><li>To detect, prevent and address technical issues</li></ul><h2>Sharing Your Information</h2><p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p><h2>Data Security</h2><p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p><h2>Your Rights</h2><p>You have the right to access, update or delete the information we have on you. Whenever made possible, you can access, update or request deletion of your Personal Data directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.</p><h2>Changes to This Policy</h2><p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p><h2>Contact Us</h2><p>If you have any questions about this Privacy Policy, please contact us by visiting the contact page on our website.</p>`;

const defaultTermsAndConditions = `<p>Welcome to Gorilla Tech Solutions. These terms and conditions outline the rules and regulations for the use of our website. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Gorilla Tech Solutions's website if you do not agree to all of the terms and conditions stated on this page.</p><h2>1. Introduction</h2><p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Gorilla Tech Solutions accessible at this domain. These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here.</p><h2>2. Intellectual Property Rights</h2><p>Other than the content you own, under these Terms, Gorilla Tech Solutions and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.</p><h2>3. Restrictions</h2><p>You are specifically restricted from all of the following:</p><ul><li>publishing any Website material in any other media;</li><li>selling, sublicensing and/or otherwise commercializing any Website material;</li><li>publicly performing and/or showing any Website material;</li><li>using this Website in any way that is or may be damaging to this Website;</li><li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li><li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li></ul><h2>4. Your Content</h2><p>In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Gorilla Tech Solutions a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p><h2>5. No warranties</h2><p>This Website is provided “as is,” with all faults, and Gorilla Tech Solutions express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p><h2>6. Limitation of liability</h2><p>In no event shall Gorilla Tech Solutions, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Gorilla Tech Solutions, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p><h2>7. Governing Law & Jurisdiction</h2><p>These Terms will be governed by and interpreted in accordance with the laws of the State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in for the resolution of any disputes.</p>`;

const defaultDisclaimer = `<p>The information provided by Gorilla Tech Solutions on our website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p><h2>External Links Disclaimer</h2><p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p><h2>Professional Disclaimer</h2><p>The digital marketing information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of digital marketing advice. The use or reliance of any information contained on this site is solely at your own risk.</p>`;
const defaultRefundPolicy = `<p>Thank you for choosing Gorilla Tech Solutions. We strive to provide the best digital marketing services to our clients. If you are not entirely satisfied with our services, we're here to help.</p><h2>Refund Eligibility</h2><p>Due to the nature of our services, refunds are handled on a case-by-case basis. We are not able to offer refunds for work that has already been completed or for services where the results are subject to factors beyond our control (e.g., search engine algorithm changes).</p><h2>Contact Us</h2><p>If you have any questions about our Refund Policy, please contact us. We will review your request and get back to you within 7-10 business days. We are committed to ensuring client satisfaction and will work with you to find a fair resolution.</p>`;

const defaultLegalPageContent: LegalPageContent = {
    privacyPolicy: defaultPrivacyPolicy,
    termsAndConditions: defaultTermsAndConditions,
    disclaimer: defaultDisclaimer,
    refundPolicy: defaultRefundPolicy,
};

interface LegalPageContextType {
  content: LegalPageContent;
  loading: boolean;
  updateContent: (newContent: Partial<LegalPageContent>) => void;
}

const LegalPageContext = createContext<LegalPageContextType | undefined>(undefined);

const LEGAL_PAGE_STORAGE_KEY = 'legalPageContent';

export const LegalPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<LegalPageContent>(defaultLegalPageContent);
  const [loading, setLoading] = useState(true);

  const syncContent = useCallback(() => {
    try {
      const storedContent = localStorage.getItem(LEGAL_PAGE_STORAGE_KEY);
      if (storedContent) {
        const parsed = JSON.parse(storedContent);
        // Add new fields if they don't exist in stored data
        const withDefaults = { ...defaultLegalPageContent, ...parsed };
        setContent(withDefaults);
      } else {
        localStorage.setItem(LEGAL_PAGE_STORAGE_KEY, JSON.stringify(defaultLegalPageContent));
        setContent(defaultLegalPageContent);
      }
    } catch (e) {
      console.error("Failed to parse legal page content from localStorage", e);
      setContent(defaultLegalPageContent);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    syncContent();
  }, [syncContent]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LEGAL_PAGE_STORAGE_KEY) {
        syncContent();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncContent]);

  const updateContent = (newContent: Partial<LegalPageContent>) => {
    setContent(prevContent => {
      const updatedContent = { ...prevContent, ...newContent };
      localStorage.setItem(LEGAL_PAGE_STORAGE_KEY, JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  return (
    <LegalPageContext.Provider value={{ content, loading, updateContent }}>
      {children}
    </LegalPageContext.Provider>
  );
};

export const useLegalPage = (): LegalPageContextType => {
  const context = useContext(LegalPageContext);
  if (context === undefined) {
    throw new Error('useLegalPage must be used within a LegalPageProvider');
  }
  return context;
};
