/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import pino from 'pino';
import middleware from './middlewares/middlewares';

const app = express();
const logger = pino();

middleware(app);

type sport = number | string | undefined;;

let port: sport = process.env.PORT;

app.listen(process.env.PORT, () => {

  if (port == undefined || port === '') {
    port = 8000;
  }

  logger.info(`Server is running on port ${port}`);
});

export default logger;
