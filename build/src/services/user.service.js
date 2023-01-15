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
const user_model_1 = require("../models/user.model");
class UserService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield user_model_1.userModel.create(data);
            return newUser;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.userModel.find();
            return users;
        });
    }
    findByEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.userModel.findOne({ email: data });
            return user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.userModel.findOne({ _id: id });
            return user;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield user_model_1.userModel.findByIdAndDelete(id);
            return deleted;
        });
    }
    getUserByPage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const movie = yield user_model_1.userModel.paginate({}, { page: data.page, size: data.size });
            return movie;
        });
    }
}
exports.default = new UserService();
