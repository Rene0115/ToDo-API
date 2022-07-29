import express from 'express';
import pino from 'pino';

const app = express();
const logger = pino();

const port = 5000;
app.listen(port, ()=>{
    logger.info(`Server is running on port ${port}`);
})