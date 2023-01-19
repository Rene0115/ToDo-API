"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const list_routes_1 = __importDefault(require("./list.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const router = express_1.default.Router();
router.use('/lists', list_routes_1.default);
router.use('/users', user_routes_1.default);
exports.default = router;
