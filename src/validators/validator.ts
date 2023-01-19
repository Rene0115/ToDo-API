import Joi from "joi";
import express from "express";
import logger from "../app";

const validator = (schema: Joi.ObjectSchema, reqbody = 'body') => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const validated = await schema.validateAsync(req.body);
  try {
    if (reqbody === 'body') {
      req.body = validated;
    } else {
      req.query = validated;
    }
    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      body: logger.error(error)
    });
  }
};

export default validator;
