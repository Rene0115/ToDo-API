"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => res.status(500).send({ status: false, message: `${err}` });
exports.default = errorHandler;
