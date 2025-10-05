import { Request, Response } from 'express';
import prisma from '../db';
import { authMiddleware } from '../middlewares/authMiddleware';

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        booking: {
          include: {
            user: true,
            host: true,
          },
        },
      },
    });
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { paymentId },
      include: {
        booking: {
          include: {
            user: true,
            host: true,
          },
        },
      },
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      'Pending',
      'Processing',
      'Completed',
      'Failed',
      'Refunded',
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const payment = await prisma.payment.update({
      where: { paymentId },
      data: {
        status,
        processedAt: status === 'Completed' ? new Date() : undefined,
      },
      include: {
        booking: {
          include: {
            user: true,
            host: true,
          },
        },
      },
    });

    // If payment is completed, update booking status
    if (status === 'Completed' && payment.booking) {
      await prisma.booking.update({
        where: { bookingId: payment.booking.bookingId },
        data: { status: 'Confirmed' },
      });
    }

    res.json(payment);
  } catch (error) {
    console.error('Error updating payment:', error);
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const processPayment = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const { paymentMethod, amount } = req.body;

    // In a real application, you would integrate with a payment processor like Stripe
    // For now, we'll simulate payment processing

    const payment = await prisma.payment.findUnique({
      where: { paymentId },
      include: {
        booking: true,
      },
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.status !== 'Pending') {
      return res
        .status(400)
        .json({ message: 'Payment is not in pending status' });
    }

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update payment status (simulate success for demo)
    const updatedPayment = await prisma.payment.update({
      where: { paymentId },
      data: {
        status: 'Completed',
        processedAt: new Date(),
      },
      include: {
        booking: {
          include: {
            user: true,
            host: true,
          },
        },
      },
    });

    // Update booking status
    await prisma.booking.update({
      where: { bookingId: payment.bookingId },
      data: { status: 'Confirmed' },
    });

    res.json({
      payment: updatedPayment,
      message: 'Payment processed successfully',
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};

export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const payments = await prisma.payment.findMany({
      where: {
        booking: {
          userId: userId as string,
        },
      },
      include: {
        booking: {
          include: {
            host: true,
          },
        },
      },
      orderBy: { processedAt: 'desc' },
    });

    res.json(payments);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const refundPayment = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const { reason } = req.body;

    const payment = await prisma.payment.findUnique({
      where: { paymentId },
      include: {
        booking: true,
      },
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.status !== 'Completed') {
      return res
        .status(400)
        .json({ message: 'Only completed payments can be refunded' });
    }

    // Update payment status to refunded
    const refundedPayment = await prisma.payment.update({
      where: { paymentId },
      data: {
        status: 'Refunded',
      },
      include: {
        booking: {
          include: {
            user: true,
            host: true,
          },
        },
      },
    });

    // Update booking status
    await prisma.booking.update({
      where: { bookingId: payment.bookingId },
      data: { status: 'Cancelled' },
    });

    // Send refund confirmation email
    try {
      await sendRefundConfirmationEmail(refundedPayment);
    } catch (emailError) {
      console.error('Error sending refund email:', emailError);
    }

    res.json({
      payment: refundedPayment,
      message: 'Payment refunded successfully',
    });
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ message: 'Refund processing failed' });
  }
};

export const getPaymentAnalytics = async (req: Request, res: Response) => {
  try {
    const totalPayments = await prisma.payment.count();
    const completedPayments = await prisma.payment.count({
      where: { status: 'Completed' },
    });
    const pendingPayments = await prisma.payment.count({
      where: { status: 'Pending' },
    });
    const failedPayments = await prisma.payment.count({
      where: { status: 'Failed' },
    });
    const refundedPayments = await prisma.payment.count({
      where: { status: 'Refunded' },
    });

    const totalRevenue = await prisma.payment.aggregate({
      where: { status: 'Completed' },
      _sum: { amount: true },
    });

    res.json({
      summary: {
        totalPayments,
        completedPayments,
        pendingPayments,
        failedPayments,
        refundedPayments,
        totalRevenue: totalRevenue._sum.amount || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching payment analytics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Email service for refunds
const sendRefundConfirmationEmail = async (payment: any) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const emailContent = {
    to: payment.booking.user.email,
    subject: `Refund Processed - Booking ${payment.booking.bookingId}`,
    html: `
      <h1>Refund Processed</h1>
      <p>Dear ${payment.booking.user.name},</p>
      <p>Your refund has been processed successfully.</p>
      <h3>Refund Details:</h3>
      <ul>
        <li><strong>Payment ID:</strong> ${payment.paymentId}</li>
        <li><strong>Booking ID:</strong> ${payment.booking.bookingId}</li>
        <li><strong>Refunded Amount:</strong> $${payment.amount}</li>
        <li><strong>Reason:</strong> ${
          payment.refundReason || 'Customer request'
        }</li>
      </ul>
      <p>The refund will appear in your original payment method within 3-5 business days.</p>
      <p>If you have any questions, please contact us.</p>
    `,
  };

  console.log('📧 Refund email sent (simulated):', emailContent);
  return emailContent;
};
