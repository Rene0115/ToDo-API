"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const list_controller_1 = __importDefault(require("../controllers/list.controller"));
const validator_1 = __importDefault(require("../validators/validator"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const list_validator_1 = __importDefault(require("../validators/list.validator"));
const listRouter = express_1.default.Router();
listRouter.post('/create', [(0, validator_1.default)(list_validator_1.default.createListSchema), auth_middleware_1.default], list_controller_1.default.createList);
listRouter.put('/update', [(0, validator_1.default)(list_validator_1.default.updateListSchema), auth_middleware_1.default], list_controller_1.default.updateList);
listRouter.get('/pages', list_controller_1.default.paginated);
listRouter.get('/:userId', auth_middleware_1.default, list_controller_1.default.getListById);
listRouter.delete('/delete/:id', auth_middleware_1.default, list_controller_1.default.deleteList);
listRouter.get('/', auth_middleware_1.default, list_controller_1.default.getAllLists);
exports.default = listRouter;
