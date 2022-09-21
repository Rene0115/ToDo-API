import Joi from 'joi';

class ListValidator {
  createListSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
  });

  updateListSchema = Joi.object({
    id: Joi.string().required(),
    content: Joi.string(),
    title: Joi.string()
  });

  // deleteListSchema = Joi.object({
  //   id: Joi.string().required()
  // });
}
export default new ListValidator();
