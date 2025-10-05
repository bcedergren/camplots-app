import express from 'express';
import {
  getPayments,
  getPaymentById,
  updatePaymentStatus,
  processPayment,
  getPaymentHistory,
  refundPayment,
  getPaymentAnalytics,
} from '../controllers/paymentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// GET /api/v1/payments - Get all payments (admin)
router.get('/', authMiddleware, getPayments);

// GET /api/v1/payments/:paymentId - Get payment by ID
router.get('/:paymentId', authMiddleware, getPaymentById);

// PUT /api/v1/payments/:paymentId/status - Update payment status
router.put('/:paymentId/status', authMiddleware, updatePaymentStatus);

// POST /api/v1/payments/:paymentId/process - Process payment
router.post('/:paymentId/process', authMiddleware, processPayment);

// GET /api/v1/payments/history - Get user's payment history
router.get('/history', authMiddleware, getPaymentHistory);

// POST /api/v1/payments/:paymentId/refund - Refund payment
router.post('/:paymentId/refund', authMiddleware, refundPayment);

// GET /api/v1/payments/analytics - Get payment analytics (admin)
router.get('/analytics', authMiddleware, getPaymentAnalytics);

export default router;
