import { Router } from 'express';
import * as utilityController from '../controllers/utilityController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// POST Endpoints
router
  .route('/')
  .post(authMiddleware.authorize, utilityController.createUtility);

// GET Endpoints
router.route('/').get(authMiddleware.authorize, utilityController.getUtilities);
router
  .route('/byType/:typeId')
  .get(authMiddleware.authorize, utilityController.getUtilitiesByType);
router
  .route('/byRoom/:roomId')
  .get(authMiddleware.authorize, utilityController.getUtilitiesByRoom);
router
  .route('/:id')
  .get(authMiddleware.authorize, utilityController.getUtility);

// PUT Endpoints
router
  .route('/:id')
  .put(authMiddleware.authorize, utilityController.updateUtility);

// DELETE Endpoints
router
  .route('/:id')
  .delete(authMiddleware.authorize, utilityController.deleteUtility);

export default router;