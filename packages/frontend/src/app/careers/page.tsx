'use client';

export default function Careers() {
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
            Join Our Team
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
            Help us build the future of outdoor experiences and connect people
            with nature.
          </p>
        </div>

        {/* Why Work With Us */}
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
            Why Work With Us?
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
                🌲 Mission-Driven
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                }}
              >
                Work on something meaningful that connects people with nature
                and supports sustainable tourism.
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
                🚀 Growth Opportunities
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                }}
              >
                Join a fast-growing startup with opportunities to learn, grow,
                and take on new challenges.
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
                🏕️ Work-Life Balance
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                }}
              >
                Flexible work arrangements and plenty of opportunities to enjoy
                the outdoors.
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
                💰 Competitive Benefits
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                }}
              >
                Competitive salary, equity, health insurance, and outdoor gear
                allowance.
              </p>
            </div>
          </div>
        </div>

        {/* Open Positions */}
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
            Open Positions
          </h2>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {[
              {
                title: 'Full-Stack Developer',
                department: 'Engineering',
                location: 'Remote',
                type: 'Full-time',
                description:
                  'Join our engineering team to build scalable web applications using React, Node.js, and modern cloud technologies.',
              },
              {
                title: 'Product Manager',
                department: 'Product',
                location: 'Remote',
                type: 'Full-time',
                description:
                  'Lead product strategy and development for our core platform, working closely with engineering and design teams.',
              },
              {
                title: 'Marketing Specialist',
                department: 'Marketing',
                location: 'Hybrid',
                type: 'Full-time',
                description:
                  'Drive growth through digital marketing campaigns, content creation, and partnership development.',
              },
              {
                title: 'Customer Success Manager',
                department: 'Customer Success',
                location: 'Remote',
                type: 'Full-time',
                description:
                  'Ensure host partners have exceptional experiences and help them maximize their success on our platform.',
              },
            ].map((job, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '8px',
                      }}
                    >
                      {job.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        gap: '16px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          backgroundColor: '#f3f4f6',
                          padding: '4px 12px',
                          borderRadius: '20px',
                        }}
                      >
                        {job.department}
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          backgroundColor: '#f3f4f6',
                          padding: '4px 12px',
                          borderRadius: '20px',
                        }}
                      >
                        {job.location}
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          backgroundColor: '#f3f4f6',
                          padding: '4px 12px',
                          borderRadius: '20px',
                        }}
                      >
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
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
                    Apply Now
                  </button>
                </div>
                <p
                  style={{
                    fontSize: '16px',
                    color: '#4b5563',
                    lineHeight: '1.6',
                  }}
                >
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
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
            Don&apos;t See Your Role?
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#d1fae5',
              marginBottom: '24px',
              lineHeight: '1.6',
            }}
          >
            We&apos;re always looking for talented individuals to join our team.
            Send us your resume and let us know how you&apos;d like to
            contribute!
          </p>
          <button
            style={{
              padding: '16px 32px',
              backgroundColor: '#ffffff',
              color: '#10b981',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
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
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
}
