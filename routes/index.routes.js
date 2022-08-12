/* eslint-disable import/extensions */
import express from 'express';
import listRouter from './list.routes.js';

const router = express.Router();

router.use('/lists', listRouter);

export default router;
