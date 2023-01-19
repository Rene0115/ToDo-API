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
const lodash_1 = __importDefault(require("lodash"));
const list_services_1 = __importDefault(require("../services/list.services"));
class ListController {
    createList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                title: req.body.title,
                content: req.body.content,
                //@ts-ignore
                userId: req.user._id
            };
            const list = yield list_services_1.default.create(data);
            if (lodash_1.default.isEmpty(list)) {
                return res.status(404).send({
                    success: false,
                    message: 'Title, content and are required'
                });
            }
            return res.status(200).send({
                success: true,
                message: 'List created successfully',
                data: list
            });
        });
    }
    updateList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield list_services_1.default.getListById(req.body.id);
            if (lodash_1.default.isEmpty(list)) {
                return res.status(404).send({
                    success: false,
                    message: 'List does not exist, please create a list '
                });
            }
            const data = {
                title: req.body.title,
                content: req.body.content
            };
            yield list_services_1.default.update(req.body.id, data);
            return res.status(200).send({
                success: true,
                message: 'List updated successfully'
            });
        });
    }
    deleteList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield list_services_1.default.delete(req.params.id);
            if (lodash_1.default.isEmpty(posts)) {
                return res.status(404).send({
                    success: false,
                    message: 'List does not exist'
                });
            }
            return res.status(200).send({
                success: true,
                message: 'List deleted successfully'
            });
        });
    }
    getAllLists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allLists = yield list_services_1.default.getLists();
            if (lodash_1.default.isEmpty(allLists)) {
                return res.status(200).send({
                    success: true,
                    count: allLists.length,
                    message: 'No Lists have been created'
                });
            }
            return res.status(200).send({
                success: true,
                message: 'Lists were found',
                data: allLists
            });
        });
    }
    getListById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allLists = yield list_services_1.default.getListById(req.params.userId);
            if (lodash_1.default.isEmpty(allLists)) {
                return res.status(200).send({
                    success: true,
                    message: 'no lists found'
                });
            }
            return res.status(200).send({
                success: true,
                data: allLists
            });
        });
    }
    paginated(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) && ((_b = req.query) === null || _b === void 0 ? void 0 : _b.size))) {
                const lists = yield list_services_1.default.getLists();
                if (!lists) {
                    return res.status(400).send({
                        success: false,
                        message: 'no lists exist in the database'
                    });
                }
            }
            const page = (_c = req.query) === null || _c === void 0 ? void 0 : _c.page;
            const size = (_d = req.query) === null || _d === void 0 ? void 0 : _d.size;
            const data = { page, size };
            const lists = yield list_services_1.default.getListByPage(data);
            if (!lists) {
                return res.status(400).send({
                    success: false,
                    message: 'no lists exist in the database'
                });
            }
            return res.status(200).send({
                success: true,
                data: lists
            });
        });
    }
}
exports.default = new ListController();
