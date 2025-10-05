'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BookingModificationForm from '@/components/BookingModificationForm';
import apiClient from '@/lib/api';

interface Booking {
  bookingId: string;
  dates: {
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  status: string;
  totalAmount?: number;
  host: {
    name: string;
  };
}

const EditBookingPage = () => {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // In a real app, you'd have an endpoint to get a single booking
        // For now, we'll simulate this by getting user bookings and finding the one
        const response = await apiClient.get('/bookings/user');
        const userBookings = response.data.bookings || response.data;
        const foundBooking = userBookings.find(
          (b: Booking) => b.bookingId === bookingId
        );

        if (foundBooking) {
          setBooking(foundBooking);
        } else {
          setError('Booking not found');
        }
      } catch (err: unknown) {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <div style={{ fontSize: '18px', color: '#4a5568' }}>
          Loading booking details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          padding: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: '#fed7d7',
            color: '#c53030',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #feb2b2',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          {error}
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <div style={{ fontSize: '18px', color: '#4a5568' }}>
          Booking not found
        </div>
      </div>
    );
  }

  // Check if booking can be modified (not cancelled, not in the past, etc.)
  const canModify = booking.status === 'confirmed';
  const checkInDate = new Date(booking.dates.checkIn);
  const today = new Date();
  const isInPast = checkInDate < today;

  if (!canModify || isInPast) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          padding: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: '#fef5e7',
            color: '#d69e2e',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #fbd38d',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          {!canModify && (
            <p>
              This booking cannot be modified because it is {booking.status}.
            </p>
          )}
          {isInPast && (
            <p>
              This booking cannot be modified because the check-in date has
              passed.
            </p>
          )}
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <BookingModificationForm
        booking={booking}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditBookingPage;
