"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const validator = (schema, reqbody = 'body') => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validated = yield schema.validateAsync(req.body);
    try {
        if (reqbody === 'body') {
            req.body = validated;
        }
        else {
            req.query = validated;
        }
        next();
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            body: app_1.default.error(error)
        });
    }
});
exports.default = validator;
