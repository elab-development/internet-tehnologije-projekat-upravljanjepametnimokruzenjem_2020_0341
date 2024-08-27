import { Router } from 'express';
import * as changeController from '../controllers/changeController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// POST Endpoints
router.route('/').post(authMiddleware.authorize, changeController.createChange);

// GET Endpoints
router.route('/').get(authMiddleware.authorize, changeController.getChanges);

// DELETE Endpoints
router
  .route('/:id')
  .delete(authMiddleware.authorize, changeController.deleteChange);

export default router;