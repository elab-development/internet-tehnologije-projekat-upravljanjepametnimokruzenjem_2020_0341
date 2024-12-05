import { Router } from 'express';
import * as roomController from '../controllers/roomController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// POST Endpoints
router.route('/').post(authMiddleware.authorize, roomController.createRoom);

// GET Endpoints
router.route('/').get(authMiddleware.authorize, roomController.getRooms);
router.route('/:id').get(authMiddleware.authorize, roomController.getRoom);

// PUT Endpoints
router.route('/:id').put(authMiddleware.authorize, roomController.updateRoom);

// DELETE Endpoints
router
  .route('/:id')
  .delete(authMiddleware.authorize, roomController.deleteRoom);

export default router;