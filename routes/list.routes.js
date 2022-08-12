/* eslint-disable import/extensions */
import express from 'express';
import listController from '../controllers/list.controller.js';
import validator from '../validators/validator.js';
import authentication from '../middlewares/auth.middleware.js';
import listValidator from '../validators/list.validator.js';

const listRouter = express.Router();
listRouter.post('/', [validator(listValidator.createListSchema), authentication], listController.createList);
listRouter.put('/', [validator(listValidator.updateListSchema), authentication], listController.updateList);
export default listRouter;
