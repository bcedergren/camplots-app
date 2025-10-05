import { Request, Response } from 'express';
import prisma from '../db';
import { authMiddleware } from '../middlewares/authMiddleware';

// Email service simulation
const sendBookingConfirmationEmail = async (
  booking: any,
  host: any,
  payment: any
) => {
  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const emailContent = {
    to: booking.user.email,
    subject: `Booking Confirmation - ${host.name}`,
    html: `
      <h1>Booking Confirmed!</h1>
      <p>Dear ${booking.user.name},</p>
      <p>Your booking at ${host.name} has been confirmed.</p>
      <h3>Booking Details:</h3>
      <ul>
        <li><strong>Booking ID:</strong> ${booking.bookingId}</li>
        <li><strong>Check-in:</strong> ${new Date(
          booking.dates.checkIn
        ).toLocaleDateString()}</li>
        <li><strong>Check-out:</strong> ${new Date(
          booking.dates.checkOut
        ).toLocaleDateString()}</li>
        <li><strong>Guests:</strong> ${booking.dates.guests}</li>
        <li><strong>Total Amount:</strong> $${payment.amount}</li>
      </ul>
      <p>Location: ${host.location.address}, ${host.location.city}, ${
      host.location.state
    }</p>
      <p>Thank you for choosing Camp Lots!</p>
      <p>If you have any questions, please contact us.</p>
    `,
  };

  console.log('📧 Email sent (simulated):', emailContent);
  return emailContent;
};

const sendBookingModificationEmail = async (
  updatedBooking: any,
  originalBooking: any
) => {
  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const emailContent = {
    to: updatedBooking.user.email,
    subject: `Booking Modified - ${updatedBooking.host.name}`,
    html: `
      <h1>Booking Modified</h1>
      <p>Dear ${updatedBooking.user.name},</p>
      <p>Your booking at ${updatedBooking.host.name} has been modified.</p>
      <h3>Updated Booking Details:</h3>
      <ul>
        <li><strong>Booking ID:</strong> ${updatedBooking.bookingId}</li>
        <li><strong>Check-in:</strong> ${new Date(
          updatedBooking.dates.checkIn
        ).toLocaleDateString()}</li>
        <li><strong>Check-out:</strong> ${new Date(
          updatedBooking.dates.checkOut
        ).toLocaleDateString()}</li>
        <li><strong>Guests:</strong> ${updatedBooking.dates.guests}</li>
      </ul>
      <p>Location: ${updatedBooking.host.location.address}, ${
      updatedBooking.host.location.city
    }, ${updatedBooking.host.location.state}</p>
      <p>If you have any questions, please contact us.</p>
    `,
  };

  console.log('📧 Modification email sent (simulated):', emailContent);
  return emailContent;
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        host: true,
        payment: true,
      },
    });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { bookingId },
      include: {
        user: true,
        host: true,
        payment: true,
      },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    // In a real app, you'd get userId from JWT token
    // For now, we'll accept it as a query param
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: userId as string },
      include: {
        host: true,
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, hostId, dates, totalAmount } = req.body;

    // Validate required fields
    if (!userId || !hostId || !dates || !totalAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if host exists
    const host = await prisma.host.findUnique({
      where: { hostId },
    });

    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        hostId,
        dates,
        status: 'Pending',
      },
      include: {
        user: true,
        host: true,
      },
    });

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId: booking.bookingId,
        amount: totalAmount,
        status: 'Pending',
      },
    });

    // Send confirmation email (simulated)
    try {
      await sendBookingConfirmationEmail(booking, host, payment);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the booking if email fails
    }

    res.status(201).json({
      booking,
      payment,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await prisma.booking.update({
      where: { bookingId },
      data: { status },
      include: {
        user: true,
        host: true,
        payment: true,
      },
    });

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;

    // Update booking status to cancelled
    const booking = await prisma.booking.update({
      where: { bookingId },
      data: { status: 'Cancelled' },
      include: {
        user: true,
        host: true,
        payment: true,
      },
    });

    // Update payment status if it exists
    if (booking.payment) {
      await prisma.payment.update({
        where: { paymentId: booking.payment.paymentId },
        data: { status: 'Refunded' },
      });
    }

    res.json({
      booking,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const checkHostAvailability = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;
    const { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
      return res
        .status(400)
        .json({ message: 'Check-in and check-out dates are required' });
    }

    // Check if host exists
    const host = await prisma.host.findUnique({
      where: { hostId },
    });

    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }

    // Check for conflicting bookings
    const conflictingBookings = await prisma.booking.findMany({
      where: {
        hostId,
        status: { in: ['Pending', 'Confirmed'] },
        OR: [
          {
            AND: [
              { dates: { path: ['checkIn'], lte: checkOut as string } },
              { dates: { path: ['checkOut'], gte: checkIn as string } },
            ],
          },
        ],
      },
    });

    const available = conflictingBookings.length === 0;

    res.json({
      available,
      hostId,
      checkIn,
      checkOut,
      conflictingBookings: available ? 0 : conflictingBookings.length,
    });
  } catch (error) {
    console.error('Error checking host availability:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { dates, guests, totalAmount } = req.body;

    // Check if booking exists and is in a modifiable state
    const existingBooking = await prisma.booking.findUnique({
      where: { bookingId },
      include: { host: true, payment: true },
    });

    if (!existingBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (!['Pending', 'Confirmed'].includes(existingBooking.status)) {
      return res
        .status(400)
        .json({ message: 'Booking cannot be modified in its current status' });
    }

    // Check availability for new dates if dates are being changed
    if (dates) {
      const conflictingBookings = await prisma.booking.findMany({
        where: {
          hostId: existingBooking.hostId,
          bookingId: { not: bookingId }, // Exclude current booking
          status: { in: ['Pending', 'Confirmed'] },
          OR: [
            {
              AND: [
                { dates: { path: ['checkIn'], lte: dates.checkOut } },
                { dates: { path: ['checkOut'], gte: dates.checkIn } },
              ],
            },
          ],
        },
      });

      if (conflictingBookings.length > 0) {
        return res.status(400).json({ message: 'New dates are not available' });
      }
    }

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { bookingId },
      data: {
        dates: dates || existingBooking.dates,
        // Note: In a real app, you might want to track booking modifications
      },
      include: {
        user: true,
        host: true,
        payment: true,
      },
    });

    // Update payment amount if total changed
    if (totalAmount && totalAmount !== existingBooking.payment?.amount) {
      await prisma.payment.update({
        where: { paymentId: existingBooking.payment?.paymentId },
        data: { amount: totalAmount },
      });
    }

    // Send modification confirmation email
    try {
      await sendBookingModificationEmail(updatedBooking, existingBooking);
    } catch (emailError) {
      console.error('Error sending modification email:', emailError);
    }

    res.json({
      booking: updatedBooking,
      message: 'Booking updated successfully',
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getHostBookings = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;
    const { startDate, endDate } = req.query;

    let whereClause: any = { hostId };

    if (startDate && endDate) {
      whereClause.OR = [
        {
          AND: [
            { dates: { path: ['checkIn'], lte: endDate as string } },
            { dates: { path: ['checkOut'], gte: startDate as string } },
          ],
        },
      ];
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        user: true,
        payment: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching host bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
