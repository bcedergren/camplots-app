'use client';

export default function Blog() {
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
            CampLots Blog
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
            Stories, tips, and insights from the great outdoors. Discover
            camping guides, host spotlights, and adventure inspiration.
          </p>
        </div>

        {/* Featured Post */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '48px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              height: '300px',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '48px' }}>🏕️</span>
          </div>
          <div style={{ padding: '48px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
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
                Featured
              </span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                October 1, 2025
              </span>
            </div>
            <h2
              style={{
                fontSize: '36px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '16px',
                lineHeight: '1.2',
              }}
            >
              The Ultimate Guide to Fall Camping: Tips for Your Perfect Autumn
              Adventure
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#4b5563',
                lineHeight: '1.7',
                marginBottom: '24px',
              }}
            >
              As the leaves change and temperatures drop, fall camping offers
              some of the most spectacular outdoor experiences. From choosing
              the right gear to finding the best campgrounds for foliage
              viewing, this comprehensive guide covers everything you need to
              know for your autumn camping trip.
            </p>
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
              Read Full Article
            </button>
          </div>
        </div>

        {/* Categories */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '48px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            'All Posts',
            'Camping Tips',
            'Host Stories',
            'Destinations',
            'Gear Reviews',
            'Safety',
          ].map((category, index) => (
            <button
              key={index}
              style={{
                padding: '8px 20px',
                backgroundColor: index === 0 ? '#10b981' : '#ffffff',
                color: index === 0 ? '#ffffff' : '#6b7280',
                border: '1px solid #e5e7eb',
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (index !== 0) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#111827';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== 0) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {[
            {
              title: '10 Essential Items for First-Time Campers',
              excerpt:
                'New to camping? Here are the must-have items that will make your first outdoor adventure comfortable and memorable.',
              category: 'Camping Tips',
              date: 'September 28, 2025',
              readTime: '5 min read',
              icon: '🎒',
            },
            {
              title: 'Host Spotlight: Mountain View Ranch',
              excerpt:
                'Meet Sarah and Mike, the husband-wife duo who transformed their family ranch into a premier glamping destination.',
              category: 'Host Stories',
              date: 'September 25, 2025',
              readTime: '8 min read',
              icon: '⭐',
            },
            {
              title: 'Best Camping Destinations for Stargazing',
              excerpt:
                'Discover the most spectacular dark-sky locations across the country for unforgettable night sky viewing.',
              category: 'Destinations',
              date: 'September 22, 2025',
              readTime: '6 min read',
              icon: '🌟',
            },
            {
              title: 'Camping Safety: Wildlife Encounter Guidelines',
              excerpt:
                'Stay safe in the wilderness with our comprehensive guide to preventing and handling wildlife encounters.',
              category: 'Safety',
              date: 'September 20, 2025',
              readTime: '7 min read',
              icon: '🐻',
            },
            {
              title: 'Tested: The Best Camping Stoves of 2025',
              excerpt:
                'We tested 15 portable camping stoves to find the best options for every type of outdoor adventure.',
              category: 'Gear Reviews',
              date: 'September 18, 2025',
              readTime: '12 min read',
              icon: '🔥',
            },
            {
              title: 'Family Camping: Making Memories in Nature',
              excerpt:
                'Tips and tricks for successful family camping trips that kids will remember for years to come.',
              category: 'Camping Tips',
              date: 'September 15, 2025',
              readTime: '9 min read',
              icon: '👨‍👩‍👧‍👦',
            },
          ].map((post, index) => (
            <article
              key={index}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
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
                  height: '200px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '48px' }}>{post.icon}</span>
              </div>
              <div style={{ padding: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#10b981',
                      fontWeight: '500',
                      backgroundColor: '#d1fae5',
                      padding: '4px 8px',
                      borderRadius: '12px',
                    }}
                  >
                    {post.category}
                  </span>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {post.readTime}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '12px',
                    lineHeight: '1.3',
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.5',
                    marginBottom: '16px',
                  }}
                >
                  {post.excerpt}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {post.date}
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#10b981',
                      fontWeight: '500',
                    }}
                  >
                    Read more →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
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
            Never Miss an Adventure
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#d1fae5',
              marginBottom: '32px',
              lineHeight: '1.6',
            }}
          >
            Subscribe to our newsletter for the latest camping tips, destination
            guides, and outdoor inspiration delivered to your inbox.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              maxWidth: '400px',
              margin: '0 auto',
              flexWrap: 'wrap',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
              }}
            />
            <button
              style={{
                padding: '16px 24px',
                backgroundColor: '#ffffff',
                color: '#10b981',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
