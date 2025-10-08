'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#111827',
        color: '#9ca3af',
        padding: '48px 48px 24px',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Main Footer Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          {/* Company Info */}
          <div>
            <Image
              src="/logo-footer.png"
              alt="CampLots Logo"
              width={150}
              height={50}
              style={{ objectFit: 'contain', marginBottom: '16px' }}
            />
            <p
              style={{ fontSize: '14px', lineHeight: '1.6', color: '#9ca3af' }}
            >
              Discover unique camping experiences and connect with nature across
              the country.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              Explore
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Search Campsites', href: '/search' },
                { label: 'Browse Hosts', href: '/hosts' },
                { label: 'Popular Locations', href: '/search' },
                { label: 'New Listings', href: '/search' },
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <Link
                    href={item.href}
                    style={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#10b981';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#9ca3af';
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              Company
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Press', href: '/press' },
                { label: 'Blog', href: '/blog' },
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <Link
                    href={item.href}
                    style={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#10b981';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#9ca3af';
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              Support
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Help Center', href: '/help' },
                { label: 'Safety', href: '/safety' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <Link
                    href={item.href}
                    style={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#10b981';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#9ca3af';
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid #374151',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            © {new Date().getFullYear()} CampLots. All rights reserved.
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { icon: '📘', label: 'Facebook', href: '#' },
              { icon: '📷', label: 'Instagram', href: '#' },
              { icon: '🐦', label: 'Twitter', href: '#' },
              { icon: '💼', label: 'LinkedIn', href: '#' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                style={{
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
