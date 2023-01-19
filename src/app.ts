import express from 'express';
import pino from 'pino';
import middleware from './middlewares/middlewares';
import 'express-async-errors';

const app = express();
const logger = pino();

middleware(app);

type iport = number | string | undefined;;

let port: iport = process.env.PORT;

app.listen(process.env.PORT, () => {

  if (port == undefined || port === '') {
    port = 8000;
  }

  logger.info(`Server is running on port ${port}`);
});

export default logger;
