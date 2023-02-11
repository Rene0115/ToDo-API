"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_validator_1 = require("../validators/user.validator");
const validator_1 = __importDefault(require("../validators/validator"));
const userRouter = express_1.default.Router();
userRouter.post('/signup', [(0, validator_1.default)(user_validator_1.validateUserSchema)], user_controller_1.default.create);
userRouter.post('/login', [(0, validator_1.default)(user_validator_1.validateUserSchema)], user_controller_1.default.loginUser);
userRouter.get('/', user_controller_1.default.getUsers);
userRouter.post('/forgotpassword', [(0, validator_1.default)(user_validator_1.validateForgotPassword)], user_controller_1.default.forgotPassword);
exports.default = userRouter;
