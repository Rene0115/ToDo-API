import Joi from 'joi';

export const validateUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required()
});
export const validateForgotPassword = Joi.object().keys({
  email: Joi.string()
    .email()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
  newPassword: Joi.string().required()
});

export default { validateUserSchema, validateForgotPassword };
