import Joi from 'joi';
import { IUser } from '../models/user.model';

interface ValidatePassword{
  email: string;
  newPassword: string;
}

export const validateUserSchema = Joi.object<IUser>().keys({
  email: Joi.string()
    .email()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
  username: Joi.string().required(),
  password: Joi.string().required()
});
export const validateForgotPassword = Joi.object<ValidatePassword>().keys({
  email: Joi.string()
    .email()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
  newPassword: Joi.string().required()
});

export default { validateUserSchema, validateForgotPassword };
