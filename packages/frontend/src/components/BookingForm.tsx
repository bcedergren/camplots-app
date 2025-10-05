'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import apiClient from '@/lib/api';
import { RootState } from '@/store';

interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  paymentMethod: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface BookingFormProps {
  hostId: string;
  hostName: string;
  pricePerNight?: number;
  onBookingSuccess?: () => void;
  onCancel?: () => void;
}

const BookingForm = ({
  hostId,
  hostName,
  pricePerNight = 100,
  onBookingSuccess,
  onCancel,
}: BookingFormProps) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  // Check availability function
  const checkAvailability = async () => {
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates first');
      return;
    }

    try {
      const response = await apiClient.get(
        `/hosts/${hostId}/availability?checkIn=${checkIn}&checkOut=${checkOut}`
      );
      setIsAvailable(response.data.available);
      setAvailabilityChecked(true);
      setError(null);
    } catch (err: unknown) {
      console.error('Error checking availability:', err);
      setError('Failed to check availability. Please try again.');
      setAvailabilityChecked(false);
    }
  };

  // Calculate total nights and cost
  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const nights = Math.max(
      0,
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );

    return nights * pricePerNight;
  };

  const totalAmount = calculateTotal();

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    setError(null);

    // Check authentication before proceeding
    if (!isAuthenticated || !user) {
      setError(
        'You must be logged in to make a booking. Please log in and try again.'
      );
      setLoading(false);
      return;
    }

    try {
      const userId = user.userId;

      const bookingData = {
        userId,
        hostId,
        dates: {
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          guests: data.guests,
        },
        totalAmount,
        paymentMethod: data.paymentMethod,
        paymentDetails:
          data.paymentMethod === 'paypal'
            ? { method: 'paypal' }
            : {
                method: data.paymentMethod,
                cardholderName: data.cardholderName,
                cardNumber: data.cardNumber.slice(-4), // Only store last 4 digits
                expiryDate: data.expiryDate,
              },
      };

      await apiClient.post('/bookings', bookingData);

      alert(
        'Booking request submitted successfully! You will receive a confirmation email shortly.'
      );
      onBookingSuccess?.();
    } catch (err: unknown) {
      console.error('Error creating booking:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to create booking. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const minCheckOut = checkIn || today;

  // If not authenticated, show login message
  if (!isAuthenticated) {
    return (
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center',
          padding: '40px 20px',
        }}
      >
        <h2
          style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}
        >
          Login Required
        </h2>
        <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
          You must be logged in to make a booking reservation.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
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
          <a href="/login" style={{ textDecoration: 'none' }}>
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
              }}
            >
              Go to Login
            </button>
          </a>
        </div>
      </div>
    );
  }

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
        Book {hostName}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <div>
          <label
            style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}
          >
            Check-in Date *
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
            Check-out Date *
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

        {checkIn && checkOut && (
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
              Check Availability
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
                  ? '✓ Dates are available!'
                  : '✗ Dates are not available. Please select different dates.'}
              </div>
            )}
          </div>
        )}

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

        <div>
          <label
            style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}
          >
            Payment Method *
          </label>
          <select
            {...register('paymentMethod', {
              required: 'Payment method is required',
            })}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          >
            <option value="">Select payment method</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
          {errors.paymentMethod && (
            <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        {(watch('paymentMethod') === 'credit_card' ||
          watch('paymentMethod') === 'debit_card') && (
          <>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                }}
              >
                Cardholder Name *
              </label>
              <input
                type="text"
                {...register('cardholderName', {
                  required: 'Cardholder name is required',
                })}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                }}
              />
              {errors.cardholderName && (
                <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
                  {errors.cardholderName.message}
                </p>
              )}
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                }}
              >
                Card Number *
              </label>
              <input
                type="text"
                {...register('cardNumber', {
                  required: 'Card number is required',
                  pattern: {
                    value: /^\d{16}$/,
                    message: 'Card number must be 16 digits',
                  },
                })}
                placeholder="1234567890123456"
                maxLength={16}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                }}
              />
              {errors.cardNumber && (
                <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
                  {errors.cardNumber.message}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: '500',
                  }}
                >
                  Expiry Date *
                </label>
                <input
                  type="text"
                  {...register('expiryDate', {
                    required: 'Expiry date is required',
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                      message: 'Expiry date must be in MM/YY format',
                    },
                  })}
                  placeholder="MM/YY"
                  maxLength={5}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                  }}
                />
                {errors.expiryDate && (
                  <p
                    style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}
                  >
                    {errors.expiryDate.message}
                  </p>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: '500',
                  }}
                >
                  CVV *
                </label>
                <input
                  type="text"
                  {...register('cvv', {
                    required: 'CVV is required',
                    pattern: {
                      value: /^\d{3,4}$/,
                      message: 'CVV must be 3 or 4 digits',
                    },
                  })}
                  placeholder="123"
                  maxLength={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                  }}
                />
                {errors.cvv && (
                  <p
                    style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}
                  >
                    {errors.cvv.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {watch('paymentMethod') === 'paypal' && (
          <div
            style={{
              backgroundColor: '#f7fafc',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
            }}
          >
            <p style={{ marginBottom: '12px', color: '#4a5568' }}>
              You will be redirected to PayPal to complete your payment after
              booking confirmation.
            </p>
            <div
              style={{
                width: '120px',
                height: '32px',
                backgroundColor: '#0070ba',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}
              >
                PayPal
              </span>
            </div>
          </div>
        )}

        {totalAmount > 0 && (
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
              Booking Summary
            </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '4px',
              }}
            >
              <span>
                ${pricePerNight} ×{' '}
                {Math.ceil(
                  (new Date(checkOut || '').getTime() -
                    new Date(checkIn || '').getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{' '}
                nights
              </span>
              <span>${totalAmount}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              <span>Total</span>
              <span>${totalAmount}</span>
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
            {loading ? 'Processing...' : 'Request Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
