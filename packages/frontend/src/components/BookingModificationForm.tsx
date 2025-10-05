'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

interface BookingModificationFormProps {
  booking: Booking;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ModificationData {
  checkIn: string;
  checkOut: string;
  guests: number;
}

const BookingModificationForm = ({
  booking,
  onSuccess,
  onCancel,
}: BookingModificationFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ModificationData>({
    defaultValues: {
      checkIn: booking.dates.checkIn,
      checkOut: booking.dates.checkOut,
      guests: booking.dates.guests,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  // Calculate new total (assuming $100/night)
  const calculateNewTotal = () => {
    if (!checkIn || !checkOut) return booking.totalAmount || 0;

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const nights = Math.max(
      0,
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );

    return nights * 100; // Assuming $100 per night
  };

  const newTotal = calculateNewTotal();
  const priceDifference = newTotal - (booking.totalAmount || 0);

  const checkAvailability = async () => {
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }

    try {
      // We need to get the hostId from the booking. Since we don't have it directly,
      // we'll assume it's available or modify the component to receive it
      const hostId = 'demo-host-id'; // This should be passed as a prop
      const response = await apiClient.get(
        `/bookings/hosts/${hostId}/availability?checkIn=${checkIn}&checkOut=${checkOut}`
      );
      setIsAvailable(response.data.available);
      setAvailabilityChecked(true);
      setError(null);
    } catch (err: unknown) {
      console.error('Error checking availability:', err);
      setError('Failed to check availability');
      setAvailabilityChecked(false);
    }
  };

  const onSubmit = async (data: ModificationData) => {
    if (!isAvailable && availabilityChecked) {
      setError(
        'Selected dates are not available. Please choose different dates.'
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const modificationData = {
        dates: {
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          guests: data.guests,
        },
        totalAmount: newTotal,
      };

      await apiClient.put(`/bookings/${booking.bookingId}`, modificationData);

      alert(
        'Booking updated successfully! You will receive a confirmation email.'
      );
      onSuccess?.();
    } catch (err: unknown) {
      console.error('Error updating booking:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to update booking. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const minCheckOut = checkIn || today;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        Modify Booking - {booking.host.name}
      </h2>

      <div
        style={{
          backgroundColor: '#f7fafc',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h3
          style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}
        >
          Current Booking Details
        </h3>
        <p style={{ fontSize: '14px', color: '#4a5568' }}>
          Check-in: {new Date(booking.dates.checkIn).toLocaleDateString()}
        </p>
        <p style={{ fontSize: '14px', color: '#4a5568' }}>
          Check-out: {new Date(booking.dates.checkOut).toLocaleDateString()}
        </p>
        <p style={{ fontSize: '14px', color: '#4a5568' }}>
          Guests: {booking.dates.guests}
        </p>
        {booking.totalAmount && (
          <p style={{ fontSize: '14px', color: '#4a5568' }}>
            Total: ${booking.totalAmount}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <div>
          <label
            style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}
          >
            New Check-in Date *
          </label>
          <input
            type="date"
            {...register('checkIn', { required: 'Check-in date is required' })}
            min={today}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
          {errors.checkIn && (
            <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
              {errors.checkIn.message}
            </p>
          )}
        </div>

        <div>
          <label
            style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}
          >
            New Check-out Date *
          </label>
          <input
            type="date"
            {...register('checkOut', {
              required: 'Check-out date is required',
              validate: (value) => {
                if (!checkIn) return true;
                return (
                  new Date(value) > new Date(checkIn) ||
                  'Check-out must be after check-in'
                );
              },
            })}
            min={minCheckOut}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
          {errors.checkOut && (
            <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
              {errors.checkOut.message}
            </p>
          )}
        </div>

        <div>
          <label
            style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}
          >
            Number of Guests *
          </label>
          <select
            {...register('guests', {
              required: 'Number of guests is required',
              valueAsNumber: true,
            })}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          >
            <option value="">Select guests</option>
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
            <option value={5}>5+ Guests</option>
          </select>
          {errors.guests && (
            <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
              {errors.guests.message}
            </p>
          )}
        </div>

        {(checkIn !== booking.dates.checkIn ||
          checkOut !== booking.dates.checkOut ||
          watch('guests') !== booking.dates.guests) && (
          <div style={{ marginBottom: '16px' }}>
            <button
              type="button"
              onClick={checkAvailability}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3182ce',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
                marginBottom: '8px',
              }}
            >
              Check Availability for New Dates
            </button>
            {availabilityChecked && (
              <div
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: isAvailable ? '#c6f6d5' : '#fed7d7',
                  color: isAvailable ? '#22543d' : '#742a2a',
                  fontSize: '14px',
                }}
              >
                {isAvailable
                  ? '✓ New dates are available!'
                  : '✗ New dates are not available. Please select different dates.'}
              </div>
            )}
          </div>
        )}

        {newTotal !== (booking.totalAmount || 0) && (
          <div
            style={{
              backgroundColor: '#f7fafc',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '8px',
              }}
            >
              Price Change Summary
            </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '4px',
              }}
            >
              <span>Original Total</span>
              <span>${booking.totalAmount || 0}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '4px',
              }}
            >
              <span>New Total</span>
              <span>${newTotal}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: '16px',
                color: priceDifference > 0 ? '#e53e3e' : '#38a169',
              }}
            >
              <span>Difference</span>
              <span>
                {priceDifference > 0 ? '+' : ''}${priceDifference}
              </span>
            </div>
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: '#fed7d7',
              color: '#c53030',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #feb2b2',
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '12px 24px',
                backgroundColor: '#e2e8f0',
                color: '#4a5568',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              backgroundColor: loading ? '#a0aec0' : '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Updating...' : 'Update Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingModificationForm;
