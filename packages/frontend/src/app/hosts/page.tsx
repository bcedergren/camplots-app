'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import apiClient from '@/lib/api';

interface Booking {
  bookingId: string;
  userId: string;
  hostId: string;
  dates: Record<string, unknown>;
  status: string;
  createdAt: string;
}

interface Host {
  hostId: string;
  name: string;
  type: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
  };
  amenities: string[];
  createdAt: string;
  bookings: Booking[];
  image?: string;
}

const HostsPage = () => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await apiClient.get('/hosts');
        setHosts(response.data);
      } catch (err) {
        console.error('Error fetching hosts:', err);
        setError('Failed to load hosts');
      } finally {
        setLoading(false);
      }
    };

    fetchHosts();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f9fafb',
        }}
      >
        <p style={{ fontSize: '16px', color: '#6b7280' }}>Loading hosts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f9fafb',
        }}
      >
        <p style={{ color: '#ef4444', fontSize: '16px' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>
            Camping Hosts
          </h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/search">
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#38a169',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Search Hosts
              </button>
            </Link>
            <Link href="/hosts/create">
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#3182ce',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Add New Host
              </button>
            </Link>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {hosts.map((host, index) => {
            // Sample images for demonstration
            const sampleImages = [
              'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
              'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
              'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80',
              'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&q=80',
              'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800&q=80',
              'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=800&q=80',
            ];
            const hostImage =
              host.image || sampleImages[index % sampleImages.length];

            return (
              <div
                key={host.hostId}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'white',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 4px 6px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Host Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={hostImage}
                    alt={host.name}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {/* Card Content */}
                <div style={{ padding: '20px' }}>
                  <h2
                    style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#111827',
                    }}
                  >
                    {host.name}
                  </h2>
                  <p style={{ color: '#718096', marginBottom: '8px' }}>
                    {host.type}
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#4a5568',
                      marginBottom: '12px',
                    }}
                  >
                    {host.location.address}, {host.location.city},{' '}
                    {host.location.state} {host.location.zipCode}
                  </p>
                  <div style={{ marginBottom: '16px' }}>
                    <h3
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '4px',
                      }}
                    >
                      Amenities:
                    </h3>
                    <div
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}
                    >
                      {host.amenities.map((amenity: string, index: number) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: '#edf2f7',
                            color: '#4a5568',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                          }}
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link href={`/hosts/${host.hostId}`}>
                      <button
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#3182ce',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '14px',
                          cursor: 'pointer',
                        }}
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HostsPage;
