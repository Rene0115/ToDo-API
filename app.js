import express from 'express';
import pino from 'pino';
import middleware from './middlewares/middlewares';

const app = express();
const logger = pino();

middleware(app);

const port = 5000;
app.listen(port, ()=>{
    logger.info(`Server is running on port ${port}`);
});