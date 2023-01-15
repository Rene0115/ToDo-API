"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("../routes/index.routes"));
const db_config_1 = __importDefault(require("../config/db.config"));
const error_middleware_1 = __importDefault(require("./error.middleware"));
const middleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use((0, cors_1.default)());
    app.use(index_routes_1.default);
    (0, db_config_1.default)();
    app.use('*', (req, res) => {
        res.status(200).send('Server is Running Check API docs');
    });
    app.use(error_middleware_1.default);
};
exports.default = middleware;
