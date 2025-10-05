import express from 'express';
import {
  getHosts,
  getHostById,
  createHost,
  updateHost,
  deleteHost,
  searchHosts,
} from '../controllers/hostController';

const router = express.Router();

// GET /api/v1/hosts - Get all hosts
router.get('/', getHosts);

// GET /api/v1/hosts/search - Search hosts
router.get('/search', searchHosts);

// GET /api/v1/hosts/:hostId - Get host by ID
router.get('/:hostId', getHostById);

// POST /api/v1/hosts - Create a new host
router.post('/', createHost);

// PUT /api/v1/hosts/:hostId - Update host
router.put('/:hostId', updateHost);

// DELETE /api/v1/hosts/:hostId - Delete host
router.delete('/:hostId', deleteHost);

export default router;
