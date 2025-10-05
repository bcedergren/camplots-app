'use client';

export default function Press() {
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
            Press & Media
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
            Latest news, press releases, and media resources for CampLots.
          </p>
        </div>

        {/* Press Kit */}
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
            Press Kit
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#4b5563',
              lineHeight: '1.7',
              marginBottom: '32px',
            }}
          >
            Download our press kit for high-resolution logos, company
            information, and media assets.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                title: 'Logo Package',
                description: 'High-resolution logos in various formats',
                format: 'ZIP (5.2 MB)',
              },
              {
                title: 'Brand Guidelines',
                description: 'Complete brand style guide and usage rules',
                format: 'PDF (2.1 MB)',
              },
              {
                title: 'Company Fact Sheet',
                description: 'Key facts, figures, and company information',
                format: 'PDF (1.3 MB)',
              },
              {
                title: 'Executive Photos',
                description: 'Professional headshots of leadership team',
                format: 'ZIP (8.7 MB)',
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '12px',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '16px',
                    lineHeight: '1.5',
                  }}
                >
                  {item.description}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    marginBottom: '16px',
                  }}
                >
                  {item.format}
                </p>
                <button
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                  }}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent News */}
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
              marginBottom: '32px',
            }}
          >
            Recent News
          </h2>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            {[
              {
                date: 'October 1, 2025',
                title: 'CampLots Launches in 15 New States',
                excerpt:
                  'Expanding our platform to serve more outdoor enthusiasts across the United States with unique camping experiences.',
                category: 'Company News',
              },
              {
                date: 'September 15, 2025',
                title: 'Partnership with National Park Foundation',
                excerpt:
                  'New collaboration aims to promote sustainable outdoor recreation and conservation education.',
                category: 'Partnership',
              },
              {
                date: 'August 28, 2025',
                title: 'CampLots Raises $5M in Series A Funding',
                excerpt:
                  'Investment will accelerate growth and enhance platform features for hosts and travelers.',
                category: 'Funding',
              },
              {
                date: 'July 10, 2025',
                title: 'Introducing Glamping Marketplace',
                excerpt:
                  'New category of luxury outdoor accommodations now available on the CampLots platform.',
                category: 'Product Launch',
              },
            ].map((news, index) => (
              <div
                key={index}
                style={{
                  borderBottom: index < 3 ? '1px solid #e5e7eb' : 'none',
                  paddingBottom: index < 3 ? '32px' : '0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '14px',
                        color: '#10b981',
                        fontWeight: '500',
                        backgroundColor: '#d1fae5',
                        padding: '4px 12px',
                        borderRadius: '20px',
                      }}
                    >
                      {news.category}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#6b7280',
                    }}
                  >
                    {news.date}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '12px',
                  }}
                >
                  {news.title}
                </h3>
                <p
                  style={{
                    fontSize: '16px',
                    color: '#4b5563',
                    lineHeight: '1.6',
                  }}
                >
                  {news.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Contact */}
        <div
          style={{
            backgroundColor: '#111827',
            borderRadius: '16px',
            padding: '48px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            Media Inquiries
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#9ca3af',
              marginBottom: '32px',
              lineHeight: '1.6',
            }}
          >
            For press inquiries, interviews, or additional information, please
            contact our media team.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '32px',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#10b981',
                  marginBottom: '8px',
                }}
              >
                Press Contact
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#d1d5db',
                  marginBottom: '4px',
                }}
              >
                Sarah Johnson
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  marginBottom: '4px',
                }}
              >
                Head of Communications
              </p>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                press@camplots.com
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#10b981',
                  marginBottom: '8px',
                }}
              >
                General Media
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#d1d5db',
                  marginBottom: '4px',
                }}
              >
                Media Team
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  marginBottom: '4px',
                }}
              >
                Response within 24 hours
              </p>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                media@camplots.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
