/* eslint-disable no-unused-vars */
import pino from 'pino';
import express from 'express';
const logger = pino();

const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  return res.status(500).send({
    success: false, 
    message: err.message 
  });
};

export default errorHandler;
