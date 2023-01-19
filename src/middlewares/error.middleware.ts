import express from 'express';

const errorHandler = (err: Error, req: express.Request, res:express.Response, next: express.NextFunction) => res.status(500).send({ status: false, message: `${err}` });

export default errorHandler;

