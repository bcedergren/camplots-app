'use client';

export default function Safety() {
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
            Safety Guidelines
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
            Your safety is our top priority. Learn about best practices for safe
            camping and outdoor adventures.
          </p>
        </div>

        {/* Safety Categories */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            marginBottom: '64px',
          }}
        >
          {[
            {
              icon: '🐻',
              title: 'Wildlife Safety',
              description:
                'Guidelines for safe wildlife encounters and food storage',
              color: '#dc2626',
            },
            {
              icon: '🔥',
              title: 'Fire Safety',
              description:
                'Campfire safety, fire prevention, and emergency procedures',
              color: '#ea580c',
            },
            {
              icon: '🌧️',
              title: 'Weather Preparedness',
              description:
                'Staying safe in various weather conditions and emergencies',
              color: '#2563eb',
            },
            {
              icon: '🥾',
              title: 'Hiking & Trail Safety',
              description:
                'Safe hiking practices and what to do if you get lost',
              color: '#059669',
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
                  fontSize: '48px',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}
              >
                {category.icon}
              </div>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: category.color,
                  marginBottom: '12px',
                  textAlign: 'center',
                }}
              >
                {category.title}
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  textAlign: 'center',
                }}
              >
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* General Safety Tips */}
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
            Essential Safety Tips
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
                  color: '#dc2626',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                📋 Before You Go
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {[
                  'Research your destination and check weather conditions',
                  'Share your itinerary with someone reliable',
                  'Check equipment and ensure everything is working',
                  'Pack a first aid kit and emergency supplies',
                  'Verify cell phone coverage in the area',
                ].map((tip, tipIndex) => (
                  <li
                    key={tipIndex}
                    style={{
                      fontSize: '14px',
                      color: '#4b5563',
                      marginBottom: '8px',
                      paddingLeft: '16px',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: '#10b981',
                        fontWeight: 'bold',
                      }}
                    >
                      •
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#ea580c',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                🏕️ At Camp
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {[
                  'Set up camp away from hazards like dead trees',
                  'Store food properly to avoid attracting wildlife',
                  'Keep your campsite clean and organized',
                  'Follow fire safety rules and regulations',
                  'Be aware of your surroundings at all times',
                ].map((tip, tipIndex) => (
                  <li
                    key={tipIndex}
                    style={{
                      fontSize: '14px',
                      color: '#4b5563',
                      marginBottom: '8px',
                      paddingLeft: '16px',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: '#10b981',
                        fontWeight: 'bold',
                      }}
                    >
                      •
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#2563eb',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                🚨 Emergencies
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {[
                  'Know how to signal for help (whistle, mirror, phone)',
                  'Have a communication plan and backup options',
                  'Learn basic first aid and CPR',
                  'Know the nearest hospital and evacuation routes',
                  'Carry emergency contact information',
                ].map((tip, tipIndex) => (
                  <li
                    key={tipIndex}
                    style={{
                      fontSize: '14px',
                      color: '#4b5563',
                      marginBottom: '8px',
                      paddingLeft: '16px',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: '#10b981',
                        fontWeight: 'bold',
                      }}
                    >
                      •
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div
          style={{
            backgroundColor: '#dc2626',
            borderRadius: '16px',
            padding: '48px',
            marginBottom: '48px',
          }}
        >
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '32px',
              textAlign: 'center',
            }}
          >
            Emergency Contacts
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {[
              {
                title: 'Emergency Services',
                number: '911',
                description: 'Police, Fire, Medical emergencies',
              },
              {
                title: 'Poison Control',
                number: '1-800-222-1222',
                description: 'Poisoning emergencies and information',
              },
              {
                title: 'National Park Service',
                number: '1-888-448-1474',
                description: 'Park emergencies and information',
              },
              {
                title: 'CampLots Support',
                number: '1-800-CAMPLOTS',
                description: '24/7 support for urgent issues',
              },
            ].map((contact, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '8px',
                  }}
                >
                  {contact.title}
                </h3>
                <p
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '8px',
                  }}
                >
                  {contact.number}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#fecaca',
                    lineHeight: '1.4',
                  }}
                >
                  {contact.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Resources */}
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
              textAlign: 'center',
            }}
          >
            Safety Resources
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                title: 'Downloadable Safety Checklist',
                description: 'Complete pre-trip safety checklist PDF',
                action: 'Download PDF',
              },
              {
                title: 'First Aid Guide',
                description: 'Basic wilderness first aid procedures',
                action: 'View Guide',
              },
              {
                title: 'Wildlife Encounter Training',
                description: 'Interactive training module',
                action: 'Start Training',
              },
              {
                title: 'Weather Safety Videos',
                description: 'Video series on weather preparedness',
                action: 'Watch Videos',
              },
            ].map((resource, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.backgroundColor = '#f0fdf4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '12px',
                  }}
                >
                  {resource.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '16px',
                    lineHeight: '1.5',
                  }}
                >
                  {resource.description}
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
                  {resource.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
