import { Router } from 'express';
const userRoutes = Router();
import { body, validationResult } from 'express-validator';
import * as userController from '../controllers/userController.js'

userRoutes.post (
    '/api/user/login/', [
        body('email').isEmail().withMessage('invalid email'),
        body('password').isLength({ min: 6 }).withMessage('invalid password')
    ],
    userController.login
);

userRoutes.post (
    '/api/user/register/', [
        body('email').isEmail().withMessage('invalid email'),
        body('password').isLength({ min: 6 }).withMessage('invalid password'),
        body('name').notEmpty().withMessage('invalid name')
    ],
    userController.register
);

userRoutes.post ('/api/user/resetpassword/',userController.login);
userRoutes.post ('/api/user/refreshtoken/', userController.login);
userRoutes.get  ('/api/user/getuser/',      userController.login);
userRoutes.patch('/api/user/updateuser/',   userController.login);

export default userRoutes;