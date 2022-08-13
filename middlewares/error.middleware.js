/* eslint-disable no-unused-vars */
import pino from 'pino';

const logger = pino();

const errorHandler = (err, req, res, next) => {
//   if (process.env.NODE_ENV !== 'production') {
  logger.error(err);
  //   }
  return res.status(500).send({ success: false, message: err.message });
};

export default errorHandler;
