import type { Metadata } from 'next';
import { LegalShell } from '../legal/LegalShell';
import { LegalArticle } from '../legal/LegalArticle';
import { LegalLangBootScript } from '../legal/LegalLangBootScript';
import { privacyContent } from '../legal/privacy-content';

export const metadata: Metadata = {
  title: 'Πολιτική Απορρήτου | Privacy Policy | Spotly',
  description:
    'Spotly Privacy Policy (GDPR). In-app support questions are processed by Google Gemini. User content is moderated under a zero-tolerance policy.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPolicy() {
  return (
    <>
      <LegalLangBootScript />
      <LegalShell backEl={privacyContent.el.back} backEn={privacyContent.en.back}>
        <LegalArticle lang="el" doc={privacyContent.el} />
        <LegalArticle lang="en" doc={privacyContent.en} />
      </LegalShell>
    </>
  );
}
