import Jwt from 'jsonwebtoken';
import logger from '../app';
import express from 'express';

const authentication = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
//@ts-ignore
  Jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      logger.error(err);
      return res.status(403).send({
        success: false,
        message: 'forbidden'
      });
    }
  //@ts-ignore  
    req.user = user;
    next();
  });
};

export default authentication;
