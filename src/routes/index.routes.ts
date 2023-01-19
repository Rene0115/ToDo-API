import express from 'express';
import listRouter from './list.routes';
import userRouter from './user.routes';

const router = express.Router();

router.use('/lists', listRouter);
router.use('/users', userRouter);

export default router;
