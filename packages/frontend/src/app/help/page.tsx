'use client';

export default function HelpCenter() {
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
            Help Center
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: '#6b7280',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6',
              marginBottom: '32px',
            }}
          >
            Find answers to your questions and get the help you need for your
            CampLots experience.
          </p>

          {/* Search Bar */}
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <input
              type="text"
              placeholder="Search for help articles..."
              style={{
                width: '100%',
                padding: '16px 24px',
                fontSize: '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            />
            <button
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              🔍
            </button>
          </div>
        </div>

        {/* Quick Help Categories */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          {[
            {
              icon: '🏕️',
              title: 'Booking & Reservations',
              description: 'Help with making, changing, or canceling bookings',
              articles: 12,
            },
            {
              icon: '💳',
              title: 'Payments & Refunds',
              description: 'Payment methods, billing, and refund information',
              articles: 8,
            },
            {
              icon: '🏠',
              title: 'For Hosts',
              description:
                'Managing your listing, calendar, and guest communication',
              articles: 15,
            },
            {
              icon: '👤',
              title: 'Account & Profile',
              description:
                'Managing your CampLots account and personal information',
              articles: 6,
            },
            {
              icon: '🛡️',
              title: 'Safety & Security',
              description:
                'Staying safe and secure during your camping experience',
              articles: 10,
            },
            {
              icon: '📱',
              title: 'Using the Platform',
              description: 'How to navigate and use CampLots features',
              articles: 9,
            },
          ].map((category, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow =
                  '0 10px 16px -4px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}
              >
                {category.icon}
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '12px',
                  textAlign: 'center',
                }}
              >
                {category.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.5',
                  textAlign: 'center',
                  marginBottom: '16px',
                }}
              >
                {category.description}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: '#10b981',
                  textAlign: 'center',
                  fontWeight: '500',
                }}
              >
                {category.articles} articles
              </p>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
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
              textAlign: 'center',
            }}
          >
            Popular Help Articles
          </h2>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {[
              {
                title: 'How do I make a reservation?',
                category: 'Booking',
                readTime: '3 min read',
              },
              {
                title: 'What is the cancellation policy?',
                category: 'Booking',
                readTime: '2 min read',
              },
              {
                title: 'How do I contact my host?',
                category: 'Communication',
                readTime: '1 min read',
              },
              {
                title: 'Payment methods and billing',
                category: 'Payments',
                readTime: '4 min read',
              },
              {
                title: 'How to list my property',
                category: 'For Hosts',
                readTime: '6 min read',
              },
              {
                title: 'Safety tips for first-time campers',
                category: 'Safety',
                readTime: '5 min read',
              },
            ].map((article, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                  e.currentTarget.style.borderColor = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#111827',
                      marginBottom: '4px',
                    }}
                  >
                    {article.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#10b981',
                        fontWeight: '500',
                        backgroundColor: '#d1fae5',
                        padding: '2px 8px',
                        borderRadius: '12px',
                      }}
                    >
                      {article.category}
                    </span>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                      {article.readTime}
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '20px',
                    color: '#10b981',
                  }}
                >
                  →
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div
          style={{
            backgroundColor: '#10b981',
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
            Still Need Help?
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#d1fae5',
              marginBottom: '32px',
              lineHeight: '1.6',
            }}
          >
            Our support team is here to help. Contact us and we&apos;ll get back
            to you as soon as possible.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              style={{
                padding: '16px 32px',
                backgroundColor: '#ffffff',
                color: '#10b981',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              💬 Live Chat
            </button>
            <button
              style={{
                padding: '16px 32px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '2px solid #ffffff',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              📧 Email Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
