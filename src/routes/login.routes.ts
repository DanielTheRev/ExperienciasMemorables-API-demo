import { Router } from 'express';
import * as UserControllers from '../controllers/login.controller';
import { tokenValidation } from '../helpers/verifyToken';

export const LoginRouter = Router();

LoginRouter.post('/registerUser', tokenValidation, UserControllers.registerUser);
LoginRouter.post('/verify', UserControllers.VerifyUserToken);
LoginRouter.post('/logIn', UserControllers.LogIn);
