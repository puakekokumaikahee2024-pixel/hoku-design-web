import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  void locale;
  return {
    title: "Terms of Service | HOKU Design",
    description: "Terms of Service for HOKU Ad Manager by HOKU Design.",
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href={`/${locale}`}
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-ocean hover:underline dark:text-turquoise"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12 border-b border-slate-200 pb-8 dark:border-night-700">
            <p className="font-display text-xs font-semibold tracking-[0.25em] text-ocean uppercase dark:text-turquoise">
              Legal
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Terms of Service
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Last updated: November 23, 2026
            </p>
          </div>

          {/* Body */}
          <div className="prose-legal">

            <Section title="1. Introduction">
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of HOKU Ad Manager
                (the &ldquo;Service&rdquo;), a business management tool operated by HOKU Design
                (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By accessing or using the Service,
                you agree to be bound by these Terms. If you do not agree, please do not use the Service.
              </p>
            </Section>

            <Section title="2. Definitions">
              <ul>
                <li><strong>&ldquo;Service&rdquo;</strong> refers to HOKU Ad Manager, accessible at its designated URL.</li>
                <li><strong>&ldquo;User&rdquo;</strong> means any individual who accesses or uses the Service.</li>
                <li><strong>&ldquo;Workspace&rdquo;</strong> means the organizational unit within the Service to which a User belongs.</li>
                <li><strong>&ldquo;Content&rdquo;</strong> means any data, text, images, videos, or other materials uploaded to or generated through the Service.</li>
                <li><strong>&ldquo;Third-Party Platforms&rdquo;</strong> means external social media services such as TikTok, Instagram, YouTube, X, and Facebook.</li>
              </ul>
            </Section>

            <Section title="3. Eligibility and Account Registration">
              <p>
                The Service is intended for use by authorized personnel of HOKU Design only. Access is granted
                on an invitation basis. You are responsible for maintaining the confidentiality of your login
                credentials and for all activities that occur under your account. You must notify us immediately
                of any unauthorized use of your account.
              </p>
            </Section>

            <Section title="4. Description of Services">
              <p>HOKU Ad Manager is a business management tool designed to support:</p>
              <ul>
                <li>Management of multiple social media accounts across platforms (TikTok, Instagram, YouTube, X, Facebook, and others)</li>
                <li>Scheduling and tracking of post plans</li>
                <li>Creation and management of post content and advertising materials</li>
                <li>AI-assisted caption generation using the Claude API (Anthropic)</li>
                <li>Aggregation of post history and advertising performance metrics</li>
              </ul>
              <p>
                The Service does not automatically publish posts to social media platforms. Post scheduling
                managed within the Service is for internal planning purposes only.
              </p>
            </Section>

            <Section title="5. User Responsibilities">
              <p>You agree to:</p>
              <ul>
                <li>Use the Service only for lawful purposes and in accordance with these Terms.</li>
                <li>Provide accurate and complete information when using the Service.</li>
                <li>Not share your account credentials with unauthorized parties.</li>
                <li>Not upload Content that infringes the intellectual property rights of any third party.</li>
                <li>Comply with the terms of service of any Third-Party Platforms associated with your use of the Service.</li>
              </ul>
            </Section>

            <Section title="6. Third-Party Services and Platforms">
              <p>
                The Service may integrate with Third-Party Platforms. Your use of those platforms is governed
                by their respective terms of service and privacy policies, which are independent of these Terms.
                We are not responsible for the availability, accuracy, or practices of any Third-Party Platform.
              </p>
              <p>
                Due to changes in platform specifications, API policies, or access restrictions imposed by
                Third-Party Platforms, some features of the Service may become unavailable or limited without
                prior notice. We do not guarantee continued compatibility with any Third-Party Platform.
              </p>
            </Section>

            <Section title="7. TikTok API and Social Media Integration">
              <p>
                <strong>Current status:</strong> As of the date of these Terms, the Service does not connect
                directly to TikTok&rsquo;s API or any other social media API. Social media account information
                entered in the Service is managed manually by authorized users for internal planning purposes only.
              </p>
              <p>
                <strong>Future integration:</strong> We plan to implement TikTok API integration (including
                Login Kit and related features) in the future. When such integration is implemented, these
                Terms and our Privacy Policy will be updated accordingly to reflect the data collected, how it
                is used, and your rights with respect to that data. Users will be notified of material changes
                before they take effect.
              </p>
            </Section>

            <Section title="8. Intellectual Property">
              <p>
                All rights, title, and interest in and to the Service, including its design, features, and
                underlying technology, are owned by HOKU Design. You retain ownership of Content you upload
                to the Service. By uploading Content, you grant HOKU Design a limited license to store and
                display that Content solely for the purpose of providing the Service to you.
              </p>
              <p>
                AI-generated captions produced through the Service are generated based on your inputs. You are
                responsible for reviewing and ensuring the accuracy of any generated content before use.
              </p>
            </Section>

            <Section title="9. Prohibited Activities">
              <p>You may not:</p>
              <ul>
                <li>Use the Service for any unlawful purpose or in violation of any applicable laws or regulations.</li>
                <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure.</li>
                <li>Interfere with or disrupt the integrity or performance of the Service.</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service.</li>
                <li>Use the Service to upload or distribute malicious software or harmful content.</li>
                <li>Misrepresent your identity or affiliation with HOKU Design.</li>
              </ul>
            </Section>

            <Section title="10. Service Availability and Changes">
              <p>
                We strive to keep the Service available at all times; however, we do not guarantee uninterrupted
                availability. The Service may be modified, suspended, or discontinued at any time, with or
                without notice, including as a result of changes to Third-Party Platform APIs or policies.
                We will not be liable to you for any modification, suspension, or discontinuation of the Service.
              </p>
            </Section>

            <Section title="11. Disclaimer of Warranties">
              <p>
                THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND,
                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
                FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE
                ERROR-FREE, SECURE, OR CONTINUOUSLY AVAILABLE.
              </p>
            </Section>

            <Section title="12. Limitation of Liability">
              <p>
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, HOKU DESIGN SHALL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED
                TO YOUR USE OF, OR INABILITY TO USE, THE SERVICE. OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS
                ARISING UNDER THESE TERMS SHALL NOT EXCEED THE AMOUNTS PAID BY YOU, IF ANY, FOR ACCESS TO
                THE SERVICE IN THE THREE MONTHS PRECEDING THE CLAIM.
              </p>
            </Section>

            <Section title="13. Termination">
              <p>
                We reserve the right to suspend or terminate your access to the Service at any time, with or
                without cause or notice. Upon termination, your right to use the Service will immediately cease.
                Provisions of these Terms that by their nature should survive termination shall survive,
                including but not limited to intellectual property provisions and disclaimers.
              </p>
            </Section>

            <Section title="14. Changes to These Terms">
              <p>
                We may update these Terms from time to time. When we make material changes, we will update
                the &ldquo;Last updated&rdquo; date at the top of this page. Your continued use of the Service after
                any such changes constitutes your acceptance of the new Terms. We encourage you to review
                these Terms periodically.
              </p>
            </Section>

            <Section title="15. Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Japan, without
                regard to its conflict of law principles.
              </p>
            </Section>

            <Section title="16. Contact Information">
              <p>If you have any questions about these Terms, please contact us through our contact form:</p>
              <p>
                <strong>HOKU Design</strong><br />
                Representative: Miho Adachi<br />
                Location: Tokyo, Japan<br />
                Contact:{" "}
                <Link
                  href={`/${locale}/contact`}
                  className="text-ocean hover:underline dark:text-turquoise"
                >
                  Contact Form
                </Link>
              </p>
            </Section>

          </div>

          {/* Back link bottom */}
          <div className="mt-16 border-t border-slate-200 pt-8 dark:border-night-700">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ocean hover:underline dark:text-turquoise"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />

      <style>{`
        .prose-legal h2 {
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--color-slate-900, #0f172a);
        }
        .dark .prose-legal h2 {
          color: white;
        }
        .prose-legal p {
          margin-bottom: 1rem;
          line-height: 1.75;
          color: #475569;
        }
        .dark .prose-legal p {
          color: #94a3b8;
        }
        .prose-legal ul {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
          list-style-type: disc;
          line-height: 1.75;
          color: #475569;
        }
        .dark .prose-legal ul {
          color: #94a3b8;
        }
        .prose-legal li {
          margin-bottom: 0.375rem;
        }
        .prose-legal strong {
          color: #0f172a;
          font-weight: 600;
        }
        .dark .prose-legal strong {
          color: white;
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {children}
      </div>
    </section>
  );
}
