'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import apiClient from '@/lib/api';
import BookingForm from '@/components/BookingForm';
import { RootState } from '@/store';

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

const HostDetailPage = () => {
  const params = useParams();
  const hostId = params.hostId as string;
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [host, setHost] = useState<Host | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const response = await apiClient.get(`/hosts/${hostId}`);
        setHost(response.data);
      } catch (err) {
        console.error('Error fetching host:', err);
        setError('Failed to load host details');
      } finally {
        setLoading(false);
      }
    };

    if (hostId) {
      fetchHost();
    }
  }, [hostId]);

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
        <p style={{ fontSize: '16px', color: '#6b7280' }}>
          Loading host details...
        </p>
      </div>
    );
  }

  if (error || !host) {
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
        <p style={{ color: '#ef4444', fontSize: '16px' }}>
          {error || 'Host not found'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ padding: '48px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <Link href="/hosts">
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#e2e8f0',
                color: '#4a5568',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
                marginBottom: '16px',
              }}
            >
              ← Back to Hosts
            </button>
          </Link>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '8px',
              color: '#111827',
            }}
          >
            {host.name}
          </h1>
          <p
            style={{ fontSize: '18px', color: '#718096', marginBottom: '16px' }}
          >
            {host.type}
          </p>
        </div>

        {/* Image and Map Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {/* Campground Image */}
          <div
            style={{
              position: 'relative',
              height: '400px',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#f3f4f6',
            }}
          >
            <Image
              src={
                host.image ||
                'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80'
              }
              alt={host.name}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Map */}
          <div
            style={{
              position: 'relative',
              height: '400px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
            }}
          >
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${host.location.coordinates.lat},${host.location.coordinates.lng}&zoom=12`}
            />
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#111827',
            }}
          >
            Location
          </h2>
          <div
            style={{
              backgroundColor: '#f7fafc',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <p style={{ marginBottom: '4px', color: '#111827' }}>
              {host.location.address}
            </p>
            <p style={{ marginBottom: '4px', color: '#111827' }}>
              {host.location.city}, {host.location.state}{' '}
              {host.location.zipCode}
            </p>
            <p style={{ fontSize: '14px', color: '#718096' }}>
              Coordinates: {host.location.coordinates.lat},{' '}
              {host.location.coordinates.lng}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#111827',
            }}
          >
            Amenities
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {host.amenities.map((amenity: string, index: number) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#edf2f7',
                  color: '#4a5568',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                }}
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          {isAuthenticated ? (
            <button
              onClick={() => setShowBookingForm(true)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3182ce',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                marginBottom: '16px',
              }}
            >
              Book Now
            </button>
          ) : (
            <div style={{ marginBottom: '16px' }}>
              <Link href="/login">
                <button
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#3182ce',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    marginBottom: '8px',
                  }}
                >
                  Login to Book
                </button>
              </Link>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Please log in to make a booking reservation
              </p>
            </div>
          )}
        </div>

        {showBookingForm && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
            onClick={() => setShowBookingForm(false)}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '32px',
                borderRadius: '8px',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <BookingForm
                hostId={host.hostId}
                hostName={host.name}
                onBookingSuccess={() => {
                  setShowBookingForm(false);
                  // Optionally refresh the page or update bookings
                }}
                onCancel={() => setShowBookingForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostDetailPage;
