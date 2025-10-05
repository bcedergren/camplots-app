'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Don't show navigation on home page
  if (pathname === '/') return null;

  const navItems = [
    { href: '/search', label: 'Explore' },
    { href: '/hosts', label: 'Hosts' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <nav
      style={{
        background: '#d1d5db',
        padding: isMobile ? '12px 20px' : '12px 48px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color:
                    hoveredLink === item.href || pathname === item.href
                      ? '#111827'
                      : '#6b7280',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: pathname === item.href ? '600' : '500',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={() => setHoveredLink(item.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {item.label}
                {pathname === item.href && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-21px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#10b981',
                    }}
                  />
                )}
              </Link>
            ))}

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
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#111827';
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
      </div>

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
            animation: 'slideDown 0.3s ease-out',
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block',
                padding: '16px',
                color: pathname === item.href ? '#111827' : '#6b7280',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: pathname === item.href ? '600' : '500',
                borderBottom: '1px solid #e5e7eb',
                backgroundColor:
                  pathname === item.href ? '#f3f4f6' : 'transparent',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            >
              {item.label}
            </Link>
          ))}

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

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
