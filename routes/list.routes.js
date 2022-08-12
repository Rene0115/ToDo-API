/* eslint-disable import/extensions */
import express from 'express';
import listController from '../controllers/list.controller.js';

const listRouter = express.Router();
listRouter.post('/', listController.createList);

export default listRouter;
