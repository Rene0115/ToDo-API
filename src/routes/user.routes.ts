import express from 'express';
import userController from '../controllers/user.controller';
import { validateUserSchema, validateForgotPassword } from '../validators/user.validator';
import validator from '../validators/validator';

const userRouter = express.Router();

userRouter.post('/signup', [validator(validateUserSchema)], userController.create);
userRouter.post('/login', [validator(validateUserSchema)], userController.loginUser);
userRouter.get('/', userController.getUsers);
userRouter.post('/forgotpassword', [validator(validateForgotPassword)], userController.forgotPassword);
export default userRouter;
