'use client';

import { useState } from 'react';
import Link from 'next/link';
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
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: '',
    amenities: '',
  });
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (searchParams.location)
        params.append('location', searchParams.location);
      if (searchParams.type) params.append('type', searchParams.type);
      if (searchParams.amenities)
        params.append('amenities', searchParams.amenities);

      const response = await apiClient.get(
        `/hosts/search?${params.toString()}`
      );
      setHosts(response.data);
      setSearched(true);
    } catch (error) {
      console.error('Error searching hosts:', error);
      setHosts([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '8px',
            }}
          >
            Discover Your Perfect Campsite
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Search from hundreds of unique outdoor locations
          </p>
        </div>

        <form onSubmit={handleSearch} style={{ marginBottom: '48px' }}>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              marginBottom: '24px',
            }}
          >
            <div style={{ flex: 1 }}>
              <input
                type="text"
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                placeholder="Location (e.g., Denver, Austin)"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  color: '#111827',
                  boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
                }}
              />
            </div>

            <div style={{ width: '200px' }}>
              <select
                name="type"
                value={searchParams.type}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  backgroundColor: 'white',
                  color: '#111827',
                  boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
                }}
              >
                <option value="">All Types</option>
                <option value="Campground">Campground</option>
                <option value="RV Park">RV Park</option>
                <option value="Cabin">Cabin</option>
                <option value="Glamping">Glamping</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px 32px',
                backgroundColor: loading ? '#9ca3af' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div>
            <input
              type="text"
              name="amenities"
              value={searchParams.amenities}
              onChange={handleInputChange}
              placeholder="Filter by amenities (e.g., WiFi, Showers, Pool)"
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '15px',
                outline: 'none',
                backgroundColor: 'white',
                color: '#111827',
                boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
              }}
            />
          </div>
        </form>

        {searched && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px',
              }}
            >
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#111827',
                }}
              >
                {hosts.length} {hosts.length === 1 ? 'campsite' : 'campsites'}{' '}
                found
              </h2>
            </div>

            {hosts.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                }}
              >
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                <p
                  style={{
                    fontSize: '18px',
                    color: '#6b7280',
                    marginBottom: '8px',
                  }}
                >
                  No campsites found
                </p>
                <p style={{ fontSize: '15px', color: '#9ca3af' }}>
                  Try adjusting your search filters
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '32px',
                }}
              >
                {hosts.map((host) => (
                  <div
                    key={host.hostId}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Image placeholder */}
                    <div
                      style={{
                        height: '200px',
                        backgroundColor: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          opacity: 0.1,
                        }}
                      />
                      <div style={{ fontSize: '64px', zIndex: 1 }}>🏕️</div>
                    </div>

                    <div style={{ padding: '24px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          marginBottom: '8px',
                        }}
                      >
                        <h3
                          style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#111827',
                          }}
                        >
                          {host.name}
                        </h3>
                        <span
                          style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            fontWeight: '500',
                          }}
                        >
                          ★ 4.9
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          marginBottom: '4px',
                        }}
                      >
                        {host.location.city}, {host.location.state}
                      </p>

                      <p
                        style={{
                          fontSize: '13px',
                          color: '#9ca3af',
                          marginBottom: '16px',
                        }}
                      >
                        {host.type}
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                          marginBottom: '20px',
                        }}
                      >
                        {host.amenities
                          .slice(0, 3)
                          .map((amenity: string, index: number) => (
                            <span
                              key={index}
                              style={{
                                backgroundColor: '#f3f4f6',
                                color: '#4b5563',
                                padding: '4px 12px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '500',
                              }}
                            >
                              {amenity}
                            </span>
                          ))}
                        {host.amenities.length > 3 && (
                          <span
                            style={{
                              fontSize: '13px',
                              color: '#9ca3af',
                              padding: '4px 0',
                            }}
                          >
                            +{host.amenities.length - 3}
                          </span>
                        )}
                      </div>

                      <Link href={`/hosts/${host.hostId}`}>
                        <button
                          style={{
                            width: '100%',
                            padding: '12px',
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
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
