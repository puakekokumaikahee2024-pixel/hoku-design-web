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
    title: "Privacy Policy | HOKU Design",
    description: "Privacy Policy for HOKU Ad Manager by HOKU Design.",
  };
}

export default async function PrivacyPage({ params }: Props) {
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
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Last updated: November 23, 2026
            </p>
          </div>

          {/* Body */}
          <div className="prose-legal">

            <Section title="1. Introduction">
              <p>
                HOKU Design (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates HOKU Ad Manager
                (the &ldquo;Service&rdquo;). This Privacy Policy explains what information we collect, how we
                use it, and how we protect it when you use the Service. By using the Service, you agree to
                the collection and use of information in accordance with this policy.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p>We collect the following categories of information:</p>
              <p><strong>Account information:</strong> Email address and password used to authenticate with
              the Service (managed via Supabase Auth).</p>
              <p><strong>Content you provide:</strong> Social media account names and configuration settings
              you enter manually, advertising materials (video and image files) you upload, post captions and
              scheduling information you create within the Service, and performance metrics you enter manually.</p>
              <p><strong>Usage data:</strong> Information about how you interact with the Service, such as
              pages accessed and actions performed, as recorded by Supabase.</p>
              <p>
                We do not collect your name, phone number, or home address as part of normal Service use.
                We do not collect payment information.
              </p>
            </Section>

            <Section title="3. Information Obtained Through TikTok">
              <p>
                <strong>Current status (as of November 2026):</strong> HOKU Ad Manager does not currently
                connect to TikTok&rsquo;s API. We do not obtain any information directly from TikTok. Social media
                account information displayed in the Service is entered manually by authorized users and is
                not retrieved from TikTok or any other platform.
              </p>
              <p>
                <strong>Planned future integration:</strong> We intend to implement TikTok API integration
                in the future. When this is implemented, we expect to obtain the following categories of
                information through TikTok&rsquo;s Login Kit and related APIs, subject to your authorization:
              </p>
              <ul>
                <li>Basic user profile information (such as display name and profile picture)</li>
                <li>Public video information associated with the connected TikTok account</li>
              </ul>
              <p>
                At that time, this Privacy Policy will be updated to describe how such information is
                collected, used, stored, and deleted, and you will be notified before the changes take effect.
                Any TikTok API integration will be implemented in accordance with TikTok&rsquo;s Platform Terms
                and Developer Policies.
              </p>
            </Section>

            <Section title="4. How We Use Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve the Service</li>
                <li>Authenticate users and manage access to the Service</li>
                <li>Store and retrieve advertising materials and post plans</li>
                <li>Generate AI-assisted captions via the Claude API (Anthropic) based on inputs you provide</li>
                <li>Display post history and performance metrics within the Service</li>
              </ul>
              <p>
                We do not use your information for advertising purposes, and we do not sell your information
                to third parties.
              </p>
            </Section>

            <Section title="5. Data Storage and Security">
              <p>
                Account data, post plans, captions, and performance metrics are stored in Supabase, a
                cloud database service. Uploaded advertising materials (videos and images) are stored in
                Supabase Storage.
              </p>
              <p>
                Authentication sessions are managed using cookies set by Supabase. We rely on Supabase&rsquo;s
                built-in security infrastructure to protect stored data. For details on Supabase&rsquo;s security
                practices, please refer to{" "}
                <a
                  href="https://supabase.com/security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean hover:underline dark:text-turquoise"
                >
                  supabase.com/security
                </a>.
              </p>
              <p>
                We have not implemented application-level encryption beyond what Supabase provides by default.
                We do not make specific representations about encryption of data at rest or in transit beyond
                Supabase&rsquo;s standard practices.
              </p>
            </Section>

            <Section title="6. Data Retention and Deletion">
              <p>
                We have not established a formal data retention schedule at this time. Data entered into the
                Service is retained until deleted by an authorized user or until the Service is discontinued.
              </p>
              <p>
                If you wish to have your account or data deleted, please contact us using the contact
                information in Section 14. We will process such requests in a reasonable time.
              </p>
            </Section>

            <Section title="7. Sharing of Information">
              <p>
                We do not sell, rent, or share your personal information with third parties for their own
                marketing or commercial purposes.
              </p>
              <p>We may share information only in the following limited circumstances:</p>
              <ul>
                <li><strong>Service providers:</strong> We use Supabase (database and storage) and Anthropic
                (AI caption generation) to provide the Service. These providers process data on our behalf
                subject to their own privacy and security policies.</li>
                <li><strong>Legal requirements:</strong> We may disclose information if required to do so by
                law or in response to a valid legal process.</li>
              </ul>
            </Section>

            <Section title="8. Third-Party Services">
              <p>The Service uses the following third-party services:</p>
              <ul>
                <li>
                  <strong>Supabase</strong> — Database, authentication, and file storage.
                  Privacy policy:{" "}
                  <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline dark:text-turquoise">
                    supabase.com/privacy
                  </a>
                </li>
                <li>
                  <strong>Anthropic (Claude API)</strong> — AI-assisted caption generation.
                  Your inputs (app name, topic, tone) are sent to Anthropic&rsquo;s API to generate captions.
                  Privacy policy:{" "}
                  <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline dark:text-turquoise">
                    anthropic.com/privacy
                  </a>
                </li>
                <li>
                  <strong>Vercel</strong> — Hosting and deployment of the Service.
                  Privacy policy:{" "}
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline dark:text-turquoise">
                    vercel.com/legal/privacy-policy
                  </a>
                </li>
              </ul>
              <p>
                We do not use Google Analytics or other third-party analytics services at this time.
              </p>
            </Section>

            <Section title="9. Cookies and Similar Technologies">
              <p>
                The Service uses cookies to manage authentication sessions. These cookies are set by Supabase
                and are necessary for the Service to function. We do not use cookies for advertising or
                tracking purposes.
              </p>
              <p>
                We do not use tracking pixels, web beacons, or similar technologies.
              </p>
            </Section>

            <Section title="10. User Rights">
              <p>
                Depending on your location, you may have certain rights with respect to your personal
                information, including the right to access, correct, or delete information we hold about you.
              </p>
              <p>
                To exercise any of these rights, please contact us using the contact information in Section 14.
                We will respond to your request in a reasonable timeframe.
              </p>
            </Section>

            <Section title="11. Children's Privacy">
              <p>
                The Service is not directed to children under the age of 13 (or such other age as may be
                applicable under local law). We do not knowingly collect personal information from children.
                If we become aware that we have collected personal information from a child without appropriate
                consent, we will take steps to delete that information.
              </p>
            </Section>

            <Section title="12. International Data Transfers">
              <p>
                The Service is operated in Japan. Data processed through Supabase and Anthropic may be
                transferred to and stored in servers located outside Japan. By using the Service, you
                acknowledge that your information may be transferred to and processed in countries other
                than your country of residence.
              </p>
            </Section>

            <Section title="13. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. When we make material changes, we will
                update the &ldquo;Last updated&rdquo; date at the top of this page. If we implement TikTok API
                integration or other significant changes to our data practices, we will notify authorized
                users before those changes take effect.
              </p>
              <p>
                We encourage you to review this policy periodically.
              </p>
            </Section>

            <Section title="14. Contact Information">
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your data rights,
                please contact us:
              </p>
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
