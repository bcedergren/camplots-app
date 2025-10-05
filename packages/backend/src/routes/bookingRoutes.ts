import express from 'express';
import {
  getBookings,
  getBookingById,
  getUserBookings,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  checkHostAvailability,
  updateBooking,
  getHostBookings,
} from '../controllers/bookingController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// GET /api/v1/bookings - Get all bookings (admin)
router.get('/', authMiddleware, getBookings);

// GET /api/v1/bookings/user/:userId - Get user's bookings
router.get('/user/:userId', authMiddleware, getUserBookings);

// GET /api/v1/bookings/:bookingId - Get booking by ID
router.get('/:bookingId', authMiddleware, getBookingById);

// POST /api/v1/bookings - Create a new booking
router.post('/', authMiddleware, createBooking);

// PUT /api/v1/bookings/:bookingId/status - Update booking status
router.put('/:bookingId/status', authMiddleware, updateBookingStatus);

// DELETE /api/v1/bookings/:bookingId - Cancel booking
router.delete('/:bookingId', authMiddleware, cancelBooking);

// GET /api/v1/bookings/hosts/:hostId/availability - Check host availability
router.get('/hosts/:hostId/availability', checkHostAvailability);

// PUT /api/v1/bookings/:bookingId - Update booking details
router.put('/:bookingId', authMiddleware, updateBooking);

// GET /api/v1/bookings/hosts/:hostId/bookings - Get host's bookings (for calendar view)
router.get('/hosts/:hostId/bookings', authMiddleware, getHostBookings);

export default router;
