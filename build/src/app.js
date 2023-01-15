"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
const express_1 = __importDefault(require("express"));
const pino_1 = __importDefault(require("pino"));
const middlewares_1 = __importDefault(require("./middlewares/middlewares"));
const app = (0, express_1.default)();
const logger = (0, pino_1.default)();
(0, middlewares_1.default)(app);
;
let port = process.env.PORT;
app.listen(process.env.PORT, () => {
    if (port == undefined || port === '') {
        port = 8000;
    }
    logger.info(`Server is running on port ${port}`);
});
exports.default = logger;
