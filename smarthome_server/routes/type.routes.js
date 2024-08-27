import { Router } from 'express';
import * as typeController from '../controllers/typeController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// POST Endpoints
router.route('/').post(authMiddleware.authorize, typeController.createType);

// GET Endpoints
router.route('/').get(authMiddleware.authorize, typeController.getTypes);
router.route('/:id').get(authMiddleware.authorize, typeController.getType);

// PUT Endpoints
router.route('/:id').put(authMiddleware.authorize, typeController.updateType);

// DELETE Endpoints
router
  .route('/:id')
  .delete(authMiddleware.authorize, typeController.deleteType);

export default router;