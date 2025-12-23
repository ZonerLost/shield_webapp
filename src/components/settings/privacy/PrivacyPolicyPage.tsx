"use client";

export const PrivacyPolicyPage = () => {
  return (
    <div className="py-8 px-6 lg:py-12 lg:px-8">
      <div className="max-w-md mx-auto lg:max-w-4xl">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-2xl lg:text-4xl font-semibold text-blue-primary font-dm-sans">
            Shield Systems Pty Ltd – Legal Documents
          </h1>
          <p className="text-lg lg:text-xl text-text-gray font-medium font-dm-sans mt-2">
            Privacy Policy, Terms of Use & Data Processing Addendum
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-light-gray rounded-xl border border-placeholder-gray/20 p-6 lg:p-8 space-y-10">
          {/* Privacy Policy Section */}
          <div>
            <h2 className="text-xl lg:text-2xl font-semibold text-blue-primary font-dm-sans mb-4">
              Privacy Policy
            </h2>
            <p className="text-sm lg:text-base text-text-gray font-dm-sans mb-6">
              Last updated: 24 November 2025
            </p>
            <p className="text-sm lg:text-base text-text-gray font-dm-sans mb-6 leading-relaxed">
              Shield Systems Pty Ltd (&quot;Shield Systems&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) develops and operates secure, AI-powered software used by Australian law-enforcement agencies to prepare incident narratives, Statements of Material Facts, and related operational documents. We are committed to protecting personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  1. Information we collect:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Law-enforcement data, user identifiers, metadata, and support information.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  2. How we use the information:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  To provide and improve the service, authenticate users, and comply with obligations.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  3. Storage and security:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Data is encrypted in transit (TLS 1.2+) and at rest (AES-256) within Microsoft Azure (Australia East).
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  4. Disclosure:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Only to authorised agency administrators, Azure, or regulators when required by law.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  5. Data retention:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Per agency policy; securely deleted on termination.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  6. Access and correction:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Available per APP 12–13; some records exempt under law-enforcement provisions.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  7. Contact:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  info@shieldsystems.com.au
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  8. Governing law:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Western Australia.
                </p>
              </div>
            </div>
          </div>

          {/* Terms of Use Section */}
          <div className="border-t border-placeholder-gray/20 pt-10">
            <h2 className="text-xl lg:text-2xl font-semibold text-blue-primary font-dm-sans mb-4">
              Terms of Use
            </h2>
            <p className="text-sm lg:text-base text-text-gray font-dm-sans mb-6">
              Effective date: 24 November 2025
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  1. Acceptance:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Only authorised law-enforcement personnel may use the service.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  2. Licence:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Non-exclusive, non-transferable access during the subscription term.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  3. Data handling:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Shield Systems acts as a data processor; the agency is the data controller.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  4. Responsibilities:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Users must maintain credential security and use the service lawfully.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  5. Availability:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  99.5% uptime target; no liability for force majeure events.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  6. Confidentiality:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Both parties must protect sensitive information.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  7. Limitation of liability:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Capped at fees paid in the prior 12 months.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  8. Termination:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  On breach or contract expiry; data returned or securely deleted.
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  9. Governing law:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Western Australia.
                </p>
              </div>
            </div>
          </div>

          {/* Data Processing Addendum Section */}
          <div className="border-t border-placeholder-gray/20 pt-10">
            <h2 className="text-xl lg:text-2xl font-semibold text-blue-primary font-dm-sans mb-4">
              Data Processing Addendum (DPA)
            </h2>
            <p className="text-sm lg:text-base text-text-gray font-dm-sans mb-6">
              Effective Date: 24 November 2025
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  Parties:
                </h3>
                <ul className="list-disc list-inside text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed space-y-1">
                  <li>Shield Systems Pty Ltd (&quot;Processor&quot;)</li>
                  <li>Contracting law-enforcement agency (&quot;Controller&quot;)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  Purpose:
                </h3>
                <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                  Defines data processing obligations under the Privacy Act 1988 (Cth).
                </p>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                  Key Points:
                </h3>
                <ul className="list-disc list-inside text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed space-y-1">
                  <li>Processor acts solely on Controller&apos;s instructions.</li>
                  <li>Sub-processor: Microsoft Azure (Australia East).</li>
                  <li>Security: TLS 1.2+, AES-256, RBAC, managed identities, audit logging.</li>
                  <li>Breach notification within 48 hours.</li>
                  <li>Data retention/deletion per Controller&apos;s instruction.</li>
                  <li>Liability governed by the main Service Agreement.</li>
                  <li>Governing law: Western Australia.</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-blue-primary font-dm-sans mb-2">
                Contact:
              </h3>
              <p className="text-sm lg:text-base text-text-gray font-dm-sans leading-relaxed">
                info@shieldsystems.com.au
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
