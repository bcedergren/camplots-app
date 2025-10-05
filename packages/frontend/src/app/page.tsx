'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Professional Navigation */}
      <nav
        style={{
          padding: isMobile ? '12px 20px' : '12px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#d1d5db',
          position: 'relative',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Image
            src="/logo.png"
            alt="CampLots Logo"
            width={isMobile ? 150 : 300}
            height={isMobile ? 50 : 100}
            style={{ objectFit: 'contain', cursor: 'pointer' }}
          />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link
              href="/search"
              style={{
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              Explore
            </Link>
            <Link
              href="/register"
              style={{
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              Sign up
            </Link>
            <Link href="/login">
              <button
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#111827',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Log in
              </button>
            </Link>
          </div>
        )}

        {/* Hamburger Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: '30px',
              height: '30px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              zIndex: 1001,
            }}
            aria-label="Toggle menu"
          >
            <div
              style={{
                width: '30px',
                height: '3px',
                backgroundColor: '#111827',
                borderRadius: '10px',
                transition: 'all 0.3s',
                transform: isMenuOpen
                  ? 'rotate(45deg) translateY(12px)'
                  : 'none',
              }}
            />
            <div
              style={{
                width: '30px',
                height: '3px',
                backgroundColor: '#111827',
                borderRadius: '10px',
                transition: 'all 0.3s',
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <div
              style={{
                width: '30px',
                height: '3px',
                backgroundColor: '#111827',
                borderRadius: '10px',
                transition: 'all 0.3s',
                transform: isMenuOpen
                  ? 'rotate(-45deg) translateY(-12px)'
                  : 'none',
              }}
            />
          </button>
        )}

        {/* Mobile Menu Dropdown */}
        {isMobile && isMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              zIndex: 1000,
            }}
          >
            <Link
              href="/search"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block',
                padding: '16px',
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                borderBottom: '1px solid #e5e7eb',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            >
              Explore
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block',
                padding: '16px',
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                borderBottom: '1px solid #e5e7eb',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            >
              Sign up
            </Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  marginTop: '12px',
                  backgroundColor: '#111827',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Log in
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '40px 20px' : '80px 48px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'center',
            marginBottom: isMobile ? '60px' : '120px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: isMobile ? '36px' : '56px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '24px',
                lineHeight: '1.1',
                letterSpacing: '-0.03em',
              }}
            >
              Find your perfect
              <br />
              <span style={{ color: '#10b981' }}>outdoor escape</span>
            </h1>
            <p
              style={{
                fontSize: isMobile ? '16px' : '18px',
                color: '#6b7280',
                marginBottom: '40px',
                lineHeight: '1.7',
              }}
            >
              Book unique camping experiences from local hosts and discover
              hidden gems across the country. From lakeside retreats to mountain
              hideaways.
            </p>

            {/* Search Bar */}
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '12px',
                padding: '8px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow:
                  '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                marginBottom: '24px',
              }}
            >
              <input
                type="text"
                placeholder="Where do you want to camp?"
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: '#111827',
                  backgroundColor: 'transparent',
                }}
              />
              <Link href="/search">
                <button
                  style={{
                    padding: '16px 32px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                  }}
                >
                  Search
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: isMobile ? '24px' : '32px',
                color: '#6b7280',
                fontSize: '14px',
              }}
            >
              <div>
                <span style={{ fontWeight: '700', color: '#111827' }}>
                  500+
                </span>
                <br />
                Locations
              </div>
              <div>
                <span style={{ fontWeight: '700', color: '#111827' }}>
                  50K+
                </span>
                <br />
                Happy Campers
              </div>
              <div>
                <span style={{ fontWeight: '700', color: '#111827' }}>
                  4.9★
                </span>
                <br />
                Average Rating
              </div>
            </div>
          </div>

          {/* Hero Image */}
          {!isMobile && (
            <div
              style={{
                position: 'relative',
                height: '700px',
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: '#f3f4f6',
                boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Image
                src="/images/hero.png"
                alt="Camping adventure"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
              />
              {/* Optional overlay for better text contrast */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 50%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
            </div>
          )}
        </div>

        {/* Features Section */}
        <div style={{ marginBottom: isMobile ? '60px' : '120px' }}>
          <h2
            style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '700',
              color: '#111827',
              textAlign: 'center',
              marginBottom: isMobile ? '40px' : '64px',
            }}
          >
            Why choose CampLots?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '24px' : '40px',
            }}
          >
            {[
              {
                icon: '🌲',
                title: 'Unique Locations',
                description:
                  'Access private lands and hidden gems not found anywhere else',
              },
              {
                icon: '⚡',
                title: 'Instant Booking',
                description:
                  'Book in seconds with instant confirmation and no waiting',
              },
              {
                icon: '🔒',
                title: 'Secure & Safe',
                description:
                  'Protected payments and verified hosts for peace of mind',
              },
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: '40px 32px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.boxShadow =
                    '0 10px 25px -5px rgba(16, 185, 129, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '12px',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    color: '#6b7280',
                    lineHeight: '1.6',
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          style={{
            padding: isMobile ? '40px 24px' : '64px 48px',
            backgroundColor: '#111827',
            borderRadius: isMobile ? '16px' : '24px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? '28px' : '40px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '16px',
            }}
          >
            Ready to start your adventure?
          </h2>
          <p
            style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#9ca3af',
              marginBottom: '32px',
            }}
          >
            Join thousands of outdoor enthusiasts exploring nature
          </p>
          <Link href="/search">
            <button
              style={{
                padding: '16px 48px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#059669';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#10b981';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Explore Campsites
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
