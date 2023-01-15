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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
const list_model_1 = require("../models/list.model");
class ListService {
    create(note) {
        return __awaiter(this, void 0, void 0, function* () {
            const creates = yield list_model_1.listModel.create(note);
            return creates;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = yield list_model_1.listModel.updateOne({ _id: id }, data, { runValidators: true });
            return updates;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletes = yield list_model_1.listModel.findByIdAndDelete(id);
            return deletes;
        });
    }
    getLists() {
        return __awaiter(this, void 0, void 0, function* () {
            const allLists = yield list_model_1.listModel.find();
            return allLists;
        });
    }
    getListById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const aList = yield list_model_1.listModel.findOne({ _id: id });
            return aList;
        });
    }
    getListByPage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const movie = yield list_model_1.listModel.paginate({}, { page: data.page, size: data.size });
            return movie;
        });
    }
}
exports.default = new ListService();
