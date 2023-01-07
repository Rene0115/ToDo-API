/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import listRouter from './list.routes.js';
import userRouter from './user.routes.js';

const router = express.Router();

router.use('/lists', listRouter);
router.use('/users', userRouter);

export default router;
