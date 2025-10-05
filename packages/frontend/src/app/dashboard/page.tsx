'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import apiClient from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Booking {
  bookingId: string;
  userId: string;
  hostId: string;
  dates: {
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  status: string;
  totalAmount: number;
  createdAt: string;
  host?: {
    name: string;
    location: {
      city: string;
      state: string;
    };
    image?: string;
  };
}

const DashboardPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = 'demo-user-id';
        const response = await apiClient.get(`/bookings?userId=${userId}`);
        setBookings(response.data);
      } catch (err) {
        console.log('Using demo data for dashboard');
        setBookings([
          {
            bookingId: 'demo-booking-1',
            userId: 'demo-user-id',
            hostId: 'host-1',
            dates: {
              checkIn: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
              checkOut: new Date(
                Date.now() + 10 * 24 * 60 * 60 * 1000
              ).toISOString(),
              guests: 4,
            },
            status: 'confirmed',
            totalAmount: 285,
            createdAt: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            host: {
              name: 'Lakeside Paradise',
              location: {
                city: 'Lake Tahoe',
                state: 'CA',
              },
              image:
                'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
            },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <ProtectedRoute>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f9fafb',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏕️</div>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Loading your bookings...
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#f9fafb',
          padding: '48px 20px',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px',
              }}
            >
              My Bookings
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Manage and track your camping reservations
            </p>
          </div>

          {bookings.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
              }}
            >
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏕️</div>
              <p
                style={{
                  fontSize: '18px',
                  color: '#6b7280',
                  marginBottom: '8px',
                }}
              >
                No bookings yet
              </p>
              <p
                style={{
                  fontSize: '15px',
                  color: '#9ca3af',
                  marginBottom: '24px',
                }}
              >
                Start planning your next outdoor adventure
              </p>
              <Link href="/search">
                <button
                  style={{
                    padding: '14px 32px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Explore Campsites
                </button>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {bookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ display: 'flex', gap: '20px' }}>
                    {booking.host?.image && (
                      <div
                        style={{
                          width: '200px',
                          minWidth: '200px',
                          height: '200px',
                          position: 'relative',
                        }}
                      >
                        <Image
                          src={booking.host.image}
                          alt={booking.host.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div style={{ flex: 1, padding: '24px' }}>
                      <h3
                        style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          color: '#111827',
                        }}
                      >
                        {booking.host?.name || 'Unknown Host'}
                      </h3>
                      <p
                        style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          marginBottom: '16px',
                        }}
                      >
                        {booking.host?.location.city},{' '}
                        {booking.host?.location.state}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          style={{
                            backgroundColor:
                              booking.status === 'confirmed'
                                ? '#dcfce7'
                                : '#fef3c7',
                            color:
                              booking.status === 'confirmed'
                                ? '#166534'
                                : '#92400e',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'capitalize',
                          }}
                        >
                          {booking.status}
                        </span>
                        <span
                          style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#111827',
                          }}
                        >
                          ${booking.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
