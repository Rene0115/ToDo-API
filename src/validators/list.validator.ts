import Joi from 'joi';
import { IList } from '../models/list.model';

interface UpdateListchema {
  id: string;
  content: string;
  title: string;
};

interface DeleteListSchema {
  id: string;
}
class ListValidator {
  createListSchema = Joi.object<IList>({
    title: Joi.string().required(),
    content: Joi.string().required()
  });

  updateListSchema = Joi.object<UpdateListchema>({
    id: Joi.string().required(),
    content: Joi.string(),
    title: Joi.string()
  });

  deleteListSchema = Joi.object<DeleteListSchema>({
     id: Joi.string().required()
   });
}
export default new ListValidator();
