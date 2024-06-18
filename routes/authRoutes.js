import express from 'express';
import { register, login } from '../controllers/authController.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig.js';
import {
  validateRegister,
  validateLogin,
} from '../validators/authValidators.js';

const router = express.Router();

router.post('/auth/register', validateRegister, register);
router.post('/auth/login', validateLogin, login);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
