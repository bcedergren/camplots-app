'use client';

export default function Privacy() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '48px 24px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '16px',
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '8px',
            }}
          >
            Last updated: October 4, 2025
          </p>
          <p
            style={{
              fontSize: '16px',
              color: '#6b7280',
            }}
          >
            Effective date: October 4, 2025
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '48px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            lineHeight: '1.7',
          }}
        >
          <section style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              1. Information We Collect
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              We collect information you provide directly to us, information we
              obtain automatically when you use our services, and information
              from third-party sources.
            </p>

            <h3
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '12px',
              }}
            >
              Information You Provide
            </h3>
            <ul
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Account information (name, email, phone number)
              </li>
              <li style={{ marginBottom: '8px' }}>
                Profile information and photos
              </li>
              <li style={{ marginBottom: '8px' }}>
                Payment and billing information
              </li>
              <li style={{ marginBottom: '8px' }}>
                Communications with us and other users
              </li>
              <li style={{ marginBottom: '8px' }}>
                Listing information (for hosts)
              </li>
            </ul>

            <h3
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '12px',
              }}
            >
              Automatically Collected Information
            </h3>
            <ul
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Device information and identifiers
              </li>
              <li style={{ marginBottom: '8px' }}>
                Log information (IP address, browser type, pages visited)
              </li>
              <li style={{ marginBottom: '8px' }}>
                Location information (with your permission)
              </li>
              <li style={{ marginBottom: '8px' }}>
                Usage information and analytics
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              2. How We Use Your Information
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              We use the information we collect to:
            </p>
            <ul
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Provide, maintain, and improve our services
              </li>
              <li style={{ marginBottom: '8px' }}>
                Process transactions and send related information
              </li>
              <li style={{ marginBottom: '8px' }}>
                Send technical notices and support messages
              </li>
              <li style={{ marginBottom: '8px' }}>
                Communicate with you about products, services, and events
              </li>
              <li style={{ marginBottom: '8px' }}>
                Monitor and analyze trends and usage
              </li>
              <li style={{ marginBottom: '8px' }}>
                Personalize your experience and content
              </li>
              <li style={{ marginBottom: '8px' }}>
                Prevent fraud and ensure platform safety
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              3. Information Sharing
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              We may share your information in the following situations:
            </p>
            <ul
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <strong>With other users:</strong> Profile information, reviews,
                and messages as necessary for bookings
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>With service providers:</strong> Third parties who
                provide services on our behalf
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>For legal reasons:</strong> When required by law or to
                protect rights and safety
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Business transfers:</strong> In connection with mergers,
                acquisitions, or asset sales
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>With consent:</strong> When you explicitly agree to the
                sharing
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              4. Data Security
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              We take reasonable measures to protect your information from loss,
              theft, misuse, and unauthorized access. These measures include:
            </p>
            <ul
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Encryption of sensitive data in transit and at rest
              </li>
              <li style={{ marginBottom: '8px' }}>
                Regular security assessments and updates
              </li>
              <li style={{ marginBottom: '8px' }}>
                Access controls and employee training
              </li>
              <li style={{ marginBottom: '8px' }}>
                Monitoring for suspicious activity
              </li>
            </ul>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              However, no method of transmission over the internet is 100%
              secure. We cannot guarantee absolute security of your information.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              5. Your Rights and Choices
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              You have the following rights regarding your personal information:
            </p>
            <ul
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <strong>Access:</strong> Request a copy of your personal
                information
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Correction:</strong> Update or correct inaccurate
                information
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Deletion:</strong> Request deletion of your personal
                information
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Portability:</strong> Receive your information in a
                portable format
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Opt-out:</strong> Unsubscribe from marketing
                communications
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              6. Cookies and Tracking
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              We use cookies and similar technologies to:
            </p>
            <ul
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Remember your preferences and settings
              </li>
              <li style={{ marginBottom: '8px' }}>
                Analyze site usage and improve performance
              </li>
              <li style={{ marginBottom: '8px' }}>
                Provide personalized content and advertising
              </li>
              <li style={{ marginBottom: '8px' }}>
                Enable social media features
              </li>
            </ul>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              You can control cookies through your browser settings, but
              disabling them may affect site functionality.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              7. International Data Transfers
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              Your information may be transferred to and processed in countries
              other than your own. We ensure appropriate safeguards are in place
              to protect your information in accordance with this privacy policy
              and applicable laws.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              8. Data Retention
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              We retain your information for as long as necessary to provide our
              services, comply with legal obligations, resolve disputes, and
              enforce our agreements. When we no longer need your information,
              we will securely delete or anonymize it.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              9. Children&apos;s Privacy
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              Our services are not intended for children under 13. We do not
              knowingly collect personal information from children under 13. If
              we become aware that we have collected such information, we will
              take steps to delete it promptly.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              10. Changes to This Policy
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              We may update this privacy policy from time to time. We will
              notify you of any material changes by posting the new policy on
              this page and updating the effective date. Your continued use of
              our services after such changes constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              11. Contact Us
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '16px',
              }}
            >
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div
              style={{
                backgroundColor: '#f3f4f6',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#4b5563',
              }}
            >
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Email:</strong> privacy@camplots.com
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Phone:</strong> 1-800-CAMPLOTS
              </p>
              <p style={{ margin: 0 }}>
                <strong>Address:</strong> 123 Outdoor Way, Adventure City, AC
                12345
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
