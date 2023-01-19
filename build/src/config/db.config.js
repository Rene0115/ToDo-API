"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("../app"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URI || '';
const database = () => {
    mongoose_1.default.connect(uri).then((value) => app_1.default.info('database connected')).catch((err) => app_1.default.info(err));
};
exports.default = database;
