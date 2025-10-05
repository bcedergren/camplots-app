'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '@/lib/api';

interface Booking {
  bookingId: string;
  userId: string;
  dates: {
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  status: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  payment?: {
    amount: number;
    status: string;
  };
}

interface CalendarDay {
  date: Date;
  isBooked: boolean;
  isPast: boolean;
  booking?: Booking;
}

const HostCalendarView = () => {
  const params = useParams();
  const hostId = params.hostId as string;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
  const [creatingBooking, setCreatingBooking] = useState(false);

  useEffect(() => {
    const fetchHostBookings = async () => {
      try {
        const response = await apiClient.get(
          `/bookings/hosts/${hostId}/bookings`
        );
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching host bookings:', err);
        setError('Failed to load calendar');
      } finally {
        setLoading(false);
      }
    };

    if (hostId) {
      fetchHostBookings();
    }
  }, [hostId]);

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday

    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay())); // End on Saturday

    const days: CalendarDay[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayBookings = bookings.filter((booking) => {
        const checkIn = new Date(booking.dates.checkIn);
        const checkOut = new Date(booking.dates.checkOut);
        const currentDay = new Date(currentDate);

        return (
          currentDay >= checkIn &&
          currentDay < checkOut &&
          (booking.status === 'Confirmed' || booking.status === 'Pending')
        );
      });

      days.push({
        date: new Date(currentDate),
        isBooked: dayBookings.length > 0,
        isPast: currentDate < new Date(new Date().setHours(0, 0, 0, 0)),
        booking: dayBookings[0], // Show first booking if multiple
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const handleDateClick = (day: CalendarDay) => {
    if (day.isPast || day.isBooked) return;

    setSelectedDate(day.date);
    setBookingForm({
      checkIn: day.date.toISOString().split('T')[0],
      checkOut: new Date(day.date.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0], // Next day
      guests: 1,
    });
    setShowBookingModal(true);
  };

  const handleCreateBooking = async () => {
    if (!bookingForm.checkIn || !bookingForm.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    setCreatingBooking(true);
    try {
      // In a real app, this would create a booking for the current user
      // For demo purposes, we'll simulate this
      const newBooking = {
        hostId,
        dates: {
          checkIn: bookingForm.checkIn,
          checkOut: bookingForm.checkOut,
          guests: bookingForm.guests,
        },
        // Other required fields would be filled by the backend
      };

      await apiClient.post('/bookings', newBooking);

      alert(
        'Booking created successfully! You will receive a confirmation email.'
      );
      setShowBookingModal(false);
      setSelectedDate(null);

      // Refresh bookings
      const response = await apiClient.get(
        `/bookings/hosts/${hostId}/bookings`
      );
      setBookings(response.data);
    } catch (err: unknown) {
      console.error('Error creating booking:', err);
      alert('Failed to create booking. Please try again.');
    } finally {
      setCreatingBooking(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '#38a169';
      case 'pending':
        return '#3182ce';
      case 'cancelled':
        return '#e53e3e';
      default:
        return '#718096';
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <p>Loading calendar...</p>
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
          minHeight: '400px',
        }}
      >
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}
        >
          Host Calendar
        </h1>
        <p style={{ fontSize: '18px', color: '#718096' }}>
          Manage your availability and bookings
        </p>
      </div>

      {/* Calendar Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <button
          onClick={() => navigateMonth('prev')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e2e8f0',
            color: '#4a5568',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          ← Previous
        </button>

        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>
          {currentMonth.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>

        <button
          onClick={() => navigateMonth('next')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e2e8f0',
            color: '#4a5568',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Next →
        </button>
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
          backgroundColor: '#e2e8f0',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            style={{
              backgroundColor: '#f7fafc',
              padding: '12px',
              textAlign: 'center',
              fontWeight: '600',
              color: '#4a5568',
            }}
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              minHeight: '100px',
              padding: '8px',
              position: 'relative',
              cursor: !day.isPast && !day.isBooked ? 'pointer' : 'default',
              border:
                !day.isPast && !day.isBooked ? '2px solid transparent' : 'none',
            }}
            onClick={() => handleDateClick(day)}
            onMouseEnter={(e) => {
              if (!day.isPast && !day.isBooked) {
                e.currentTarget.style.borderColor = '#3182ce';
                e.currentTarget.style.backgroundColor = '#f7fafc';
              }
            }}
            onMouseLeave={(e) => {
              if (!day.isPast && !day.isBooked) {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: day.isPast ? '#a0aec0' : '#2d3748',
                marginBottom: '4px',
              }}
            >
              {day.date.getDate()}
            </div>

            {day.isBooked && day.booking && (
              <div
                style={{
                  backgroundColor: getStatusColor(day.booking.status),
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  marginTop: '4px',
                  cursor: 'pointer',
                }}
                title={`${day.booking.user.name} - ${day.booking.status}`}
              >
                {day.booking.user.name.split(' ')[0]}
              </div>
            )}

            {!day.isPast && !day.isBooked && (
              <div
                style={{
                  fontSize: '10px',
                  color: '#68d391',
                  marginTop: '4px',
                  fontWeight: '500',
                }}
              >
                Available
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginTop: '24px',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#38a169',
              borderRadius: '4px',
            }}
          ></div>
          <span style={{ fontSize: '14px' }}>Confirmed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#3182ce',
              borderRadius: '4px',
            }}
          ></div>
          <span style={{ fontSize: '14px' }}>Pending</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#e53e3e',
              borderRadius: '4px',
            }}
          ></div>
          <span style={{ fontSize: '14px' }}>Cancelled</span>
        </div>
      </div>

      {/* Bookings Summary */}
      <div style={{ marginTop: '32px' }}>
        <h3
          style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}
        >
          Upcoming Bookings
        </h3>

        {bookings.filter((b) => new Date(b.dates.checkIn) >= new Date())
          .length === 0 ? (
          <p style={{ color: '#718096' }}>No upcoming bookings</p>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {bookings
              .filter(
                (booking) => new Date(booking.dates.checkIn) >= new Date()
              )
              .sort(
                (a, b) =>
                  new Date(a.dates.checkIn).getTime() -
                  new Date(b.dates.checkIn).getTime()
              )
              .slice(0, 5)
              .map((booking) => (
                <div
                  key={booking.bookingId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                >
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '4px' }}>
                      {booking.user.name}
                    </p>
                    <p style={{ fontSize: '14px', color: '#718096' }}>
                      {new Date(booking.dates.checkIn).toLocaleDateString()} -{' '}
                      {new Date(booking.dates.checkOut).toLocaleDateString()}
                    </p>
                    <p style={{ fontSize: '14px', color: '#718096' }}>
                      {booking.dates.guests} guests
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        backgroundColor: getStatusColor(booking.status),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}
                    >
                      {booking.status}
                    </span>
                    {booking.payment && (
                      <p style={{ fontSize: '14px', marginTop: '4px' }}>
                        ${booking.payment.amount}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Booking Creation Modal */}
      {showBookingModal && (
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
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              maxWidth: '400px',
              width: '90%',
            }}
          >
            <h3
              style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '16px',
              }}
            >
              Create New Booking
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                }}
              >
                Check-in Date
              </label>
              <input
                type="date"
                value={bookingForm.checkIn}
                onChange={(e) =>
                  setBookingForm((prev) => ({
                    ...prev,
                    checkIn: e.target.value,
                  }))
                }
                min={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                }}
              >
                Check-out Date
              </label>
              <input
                type="date"
                value={bookingForm.checkOut}
                onChange={(e) =>
                  setBookingForm((prev) => ({
                    ...prev,
                    checkOut: e.target.value,
                  }))
                }
                min={
                  bookingForm.checkIn || new Date().toISOString().split('T')[0]
                }
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                }}
              >
                Number of Guests
              </label>
              <select
                value={bookingForm.guests}
                onChange={(e) =>
                  setBookingForm((prev) => ({
                    ...prev,
                    guests: parseInt(e.target.value),
                  }))
                }
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                }}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={5}>5+ Guests</option>
              </select>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
              }}
            >
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setSelectedDate(null);
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#e2e8f0',
                  color: '#4a5568',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBooking}
                disabled={creatingBooking}
                style={{
                  padding: '10px 20px',
                  backgroundColor: creatingBooking ? '#a0aec0' : '#3182ce',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: creatingBooking ? 'not-allowed' : 'pointer',
                }}
              >
                {creatingBooking ? 'Creating...' : 'Create Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostCalendarView;
