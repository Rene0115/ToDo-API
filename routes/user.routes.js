/* eslint-disable import/extensions */
import express from 'express';
import userController from '../controllers/user.controller.js';
import validateUserSchema from '../validators/user.validator.js';
import validator from '../validators/validator.js';

const userRouter = express.Router();

userRouter.get('/', userController.fetchUsers);
userRouter.post('/signup', [validator(validateUserSchema)], userController.createUser);
userRouter.post('/login', [validator(validateUserSchema)], userController.loginUser);
userRouter.get('/email', userController.getUserbyEmail);
userRouter.get('/:id', userController.getUserById);
export default userRouter;
