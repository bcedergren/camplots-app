'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';

interface Payment {
  paymentId: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: string;
  createdAt: string;
  refundedAt?: string;
  refundReason?: string;
  booking?: {
    dates: {
      checkIn: string;
      checkOut: string;
    };
    host: {
      name: string;
    };
  };
}

interface PaymentAnalytics {
  totalRevenue: number;
  totalRefunds: number;
  pendingPayments: number;
  completedPayments: number;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    refunds: number;
  }>;
}

const PaymentHistoryDashboard = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [analytics, setAnalytics] = useState<PaymentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [refundReason, setRefundReason] = useState('');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refunding, setRefunding] = useState(false);

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      setLoading(true);
      const [historyResponse, analyticsResponse] = await Promise.all([
        apiClient.get('/payments/history'),
        apiClient.get('/payments/analytics'),
      ]);

      setPayments(historyResponse.data.payments || historyResponse.data);
      setAnalytics(analyticsResponse.data);
      setError(null);
    } catch (err: unknown) {
      console.error('Error fetching payment data:', err);
      setError('Failed to load payment data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async () => {
    if (!selectedPayment || !refundReason.trim()) {
      alert('Please provide a refund reason');
      return;
    }

    setRefunding(true);
    try {
      await apiClient.post(`/payments/${selectedPayment.paymentId}/refund`, {
        reason: refundReason,
      });

      alert(
        'Refund processed successfully! A confirmation email has been sent.'
      );
      setShowRefundModal(false);
      setSelectedPayment(null);
      setRefundReason('');
      fetchPaymentData(); // Refresh data
    } catch (err: unknown) {
      console.error('Error processing refund:', err);
      alert('Failed to process refund. Please try again.');
    } finally {
      setRefunding(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#48bb78';
      case 'pending':
        return '#ed8936';
      case 'failed':
        return '#f56565';
      case 'refunded':
        return '#9f7aea';
      default:
        return '#a0aec0';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
          Loading payment data...
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
          onClick={fetchPaymentData}
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
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        Payment History & Analytics
      </h1>

      {/* Analytics Summary */}
      {analytics && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              backgroundColor: '#f7fafc',
              padding: '20px',
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
              Total Revenue
            </h3>
            <p
              style={{ fontSize: '24px', fontWeight: 'bold', color: '#48bb78' }}
            >
              ${analytics.totalRevenue.toFixed(2)}
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#f7fafc',
              padding: '20px',
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
              Total Refunds
            </h3>
            <p
              style={{ fontSize: '24px', fontWeight: 'bold', color: '#f56565' }}
            >
              ${analytics.totalRefunds.toFixed(2)}
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#f7fafc',
              padding: '20px',
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
              Net Revenue
            </h3>
            <p
              style={{ fontSize: '24px', fontWeight: 'bold', color: '#3182ce' }}
            >
              ${(analytics.totalRevenue - analytics.totalRefunds).toFixed(2)}
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#f7fafc',
              padding: '20px',
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
              Pending Payments
            </h3>
            <p
              style={{ fontSize: '24px', fontWeight: 'bold', color: '#ed8936' }}
            >
              {analytics.pendingPayments}
            </p>
          </div>
        </div>
      )}

      {/* Monthly Revenue Chart (Simple) */}
      {analytics && analytics.monthlyRevenue.length > 0 && (
        <div
          style={{
            backgroundColor: '#f7fafc',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            marginBottom: '32px',
          }}
        >
          <h3
            style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '16px',
            }}
          >
            Monthly Revenue
          </h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {analytics.monthlyRevenue.map((month) => (
              <div
                key={month.month}
                style={{
                  backgroundColor: '#e2e8f0',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  minWidth: '120px',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                  {month.month}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#48bb78',
                  }}
                >
                  ${month.revenue.toFixed(0)}
                </div>
                {month.refunds > 0 && (
                  <div style={{ fontSize: '12px', color: '#f56565' }}>
                    -${month.refunds.toFixed(0)} refund
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment History Table */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#f7fafc',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>
            Payment History
          </h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  Booking
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  Method
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.paymentId}
                  style={{ borderBottom: '1px solid #f1f5f9' }}
                >
                  <td style={{ padding: '12px 16px' }}>
                    {formatDate(payment.createdAt)}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {payment.booking ? (
                      <div>
                        <div style={{ fontWeight: '500' }}>
                          {payment.booking.host.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#718096' }}>
                          {new Date(
                            payment.booking.dates.checkIn
                          ).toLocaleDateString()}{' '}
                          -{' '}
                          {new Date(
                            payment.booking.dates.checkOut
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <span style={{ color: '#a0aec0' }}>N/A</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: '500' }}>
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px 16px' }}>{payment.method}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        backgroundColor: getStatusColor(payment.status),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}
                    >
                      {payment.status}
                    </span>
                    {payment.refundedAt && (
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#718096',
                          marginTop: '4px',
                        }}
                      >
                        Refunded: {formatDate(payment.refundedAt)}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {payment.status === 'completed' && (
                      <button
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowRefundModal(true);
                        }}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#e53e3e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              color: '#a0aec0',
            }}
          >
            No payment history found
          </div>
        )}
      </div>

      {/* Refund Modal */}
      {showRefundModal && selectedPayment && (
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
              Process Refund
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontWeight: '500', marginBottom: '4px' }}>
                Payment: ${selectedPayment.amount.toFixed(2)}
              </p>
              <p style={{ fontSize: '14px', color: '#718096' }}>
                Booking: {selectedPayment.booking?.host.name || 'N/A'}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                }}
              >
                Refund Reason *
              </label>
              <textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                placeholder="Please provide a reason for the refund..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  minHeight: '80px',
                  resize: 'vertical',
                }}
              />
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
                  setShowRefundModal(false);
                  setSelectedPayment(null);
                  setRefundReason('');
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
                onClick={handleRefund}
                disabled={refunding || !refundReason.trim()}
                style={{
                  padding: '10px 20px',
                  backgroundColor: refunding ? '#a0aec0' : '#e53e3e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor:
                    refunding || !refundReason.trim()
                      ? 'not-allowed'
                      : 'pointer',
                }}
              >
                {refunding ? 'Processing...' : 'Process Refund'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryDashboard;
