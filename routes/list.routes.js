/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import listController from '../controllers/list.controller.js';
import validator from '../validators/validator.js';
import authentication from '../middlewares/auth.middleware.js';
import listValidator from '../validators/list.validator.js';

const listRouter = express.Router();
listRouter.post('/create', [validator(listValidator.createListSchema), authentication], listController.createList);
listRouter.put('/update', [validator(listValidator.updateListSchema), authentication], listController.updateList);
listRouter.get('/:userId', authentication, listController.getListById);
listRouter.delete('/delete', [validator(listValidator.deleteListSchema), authentication], listController.deleteList);
listRouter.get('/allLists', listController.getAllLists);
export default listRouter;
