'use client';

export default function About() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '48px 24px',
        }}
      >
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '24px',
            }}
          >
            About CampLots
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: '#6b7280',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            We&quote;re passionate about connecting people with unique camping
            experiences and helping them discover the beauty of nature.
          </p>
        </div>

        {/* Mission Section */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '48px',
            marginBottom: '48px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '24px',
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#4b5563',
              lineHeight: '1.7',
              marginBottom: '24px',
            }}
          >
            At CampLots, we believe that everyone deserves access to
            extraordinary outdoor experiences. Our platform connects travelers
            with unique camping opportunities, from traditional campgrounds to
            glamping sites and everything in between.
          </p>
          <p
            style={{
              fontSize: '18px',
              color: '#4b5563',
              lineHeight: '1.7',
            }}
          >
            We&quote;re committed to sustainable tourism, supporting local
            communities, and making outdoor adventures accessible to everyone.
          </p>
        </div>

        {/* Story Section */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '48px',
            marginBottom: '48px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '24px',
            }}
          >
            Our Story
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#4b5563',
              lineHeight: '1.7',
              marginBottom: '24px',
            }}
          >
            Founded in 2024, CampLots was born from a simple idea: what if
            finding the perfect camping spot was as easy as booking a hotel? Our
            founders, passionate outdoor enthusiasts themselves, recognized the
            need for a platform that could connect travelers with unique outdoor
            accommodations.
          </p>
          <p
            style={{
              fontSize: '18px',
              color: '#4b5563',
              lineHeight: '1.7',
            }}
          >
            Today, we&quote;re proud to serve thousands of adventurers and host
            partners across the country, facilitating memorable outdoor
            experiences while supporting local economies and conservation
            efforts.
          </p>
        </div>

        {/* Values Section */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '48px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '32px',
            }}
          >
            Our Values
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#10b981',
                  marginBottom: '12px',
                }}
              >
                🌿 Sustainability
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                }}
              >
                We promote responsible tourism and environmental stewardship in
                all our operations.
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#10b981',
                  marginBottom: '12px',
                }}
              >
                🤝 Community
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                }}
              >
                We support local communities and help small businesses thrive
                through outdoor tourism.
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#10b981',
                  marginBottom: '12px',
                }}
              >
                ⭐ Quality
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                }}
              >
                We maintain high standards for all listings and prioritize
                exceptional customer experiences.
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#10b981',
                  marginBottom: '12px',
                }}
              >
                🌍 Accessibility
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                }}
              >
                We believe outdoor adventures should be available to everyone,
                regardless of background or ability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
