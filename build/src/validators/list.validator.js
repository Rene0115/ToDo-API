"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
;
class ListValidator {
    constructor() {
        this.createListSchema = joi_1.default.object({
            title: joi_1.default.string().required(),
            content: joi_1.default.string().required()
        });
        this.updateListSchema = joi_1.default.object({
            id: joi_1.default.string().required(),
            content: joi_1.default.string(),
            title: joi_1.default.string()
        });
        this.deleteListSchema = joi_1.default.object({
            id: joi_1.default.string().required()
        });
    }
}
exports.default = new ListValidator();
