import type { Metadata } from 'next';
import { LegalShell } from '../legal/LegalShell';
import { LegalArticle } from '../legal/LegalArticle';
import { LegalLangBootScript } from '../legal/LegalLangBootScript';
import { termsContent } from '../legal/terms-content';

export const metadata: Metadata = {
  title: 'Όροι Χρήσης | Terms of Use | Spotly',
  description:
    'Spotly Terms of Use: zero tolerance for objectionable content and abusive users. Reports are reviewed within 24 hours. Όροι Χρήσης Spotly — πολιτική μηδενικής ανοχής.',
  alternates: { canonical: '/terms' },
};

export default function TermsOfService() {
  return (
    <>
      <LegalLangBootScript />
      <LegalShell backEl={termsContent.el.back} backEn={termsContent.en.back}>
        <LegalArticle lang="el" doc={termsContent.el} />
        <LegalArticle lang="en" doc={termsContent.en} />
      </LegalShell>
    </>
  );
}
