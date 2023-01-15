"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForgotPassword = exports.validateUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string()
        .email()
        .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        .required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.validateForgotPassword = joi_1.default.object().keys({
    email: joi_1.default.string()
        .email()
        .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        .required(),
    newPassword: joi_1.default.string().required()
});
exports.default = { validateUserSchema: exports.validateUserSchema, validateForgotPassword: exports.validateForgotPassword };
