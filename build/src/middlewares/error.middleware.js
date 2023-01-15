"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const pino_1 = __importDefault(require("pino"));
const logger = (0, pino_1.default)();
const errorHandler = (err, req, res, next) => {
    logger.error(err);
    return res.status(500).send({
        success: false,
        message: err.message
    });
};
exports.default = errorHandler;
