"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailGenerator = exports.transporter = void 0;
/* eslint-disable import/no-named-as-default */
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
const dotenv_1 = __importDefault(require("dotenv"));
// dotenv config to access env variables
dotenv_1.default.config();
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
});
exports.mailGenerator = new mailgen_1.default({
    theme: 'default',
    product: {
        name: 'To Do',
        link: 'github.com/Rene0115'
    }
});
exports.default = { transporter: exports.transporter, mailGenerator: exports.mailGenerator };
