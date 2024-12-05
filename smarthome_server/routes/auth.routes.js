import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// POST Endpoints
router.route('/register').post(authController.regiter);
router.route('/mail').post(authController.sendMail);
router
  .route('/authenticate')
  .post(authMiddleware.verifyUser, (req, res) => res.end());
router.route('/login').post(authMiddleware.verifyUser, authController.login);

// GET Endpoints
router.route('/users').get(authMiddleware.authorize, authController.getUsers);
router.route('/users/:username').get(authController.getUser);
router
  .route('/generateOTP')
  .get(
    authMiddleware.verifyUser,
    authMiddleware.localVariables,
    authController.generateOTP
  );
router
  .route('/verifyOTP')
  .get(authMiddleware.verifyUser, authController.verifyOTP);
router.route('/createResetSession').get(authController.createResetSession);

// PUT Endpoints
router
  .route('/users')
  .put(authMiddleware.authorize, authController.updateUserInfo);
router
  .route('/users/:id')
  .put(authMiddleware.authorize, authController.updatUser);
router
  .route('/resetPassword')
  .put(authMiddleware.verifyUser, authController.resetPassword);

export default router;