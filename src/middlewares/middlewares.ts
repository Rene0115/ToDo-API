import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from '../routes/index.routes';
import database from '../config/db.config';
import errorHandler from './error.middleware';

const middleware = (app: any) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  app.use(router);
  database();
  app.use('*', (req: express.Request, res: express.Response) => {
    res.status(200).send('Server is Running Check API docs');
  });
  app.use(errorHandler);
};

export default middleware;
