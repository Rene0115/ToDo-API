"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
/* eslint-disable no-underscore-dangle */
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        default: false
    }
}, { timestamps: true, versionKey: false });
userSchema.plugin(mongoose_paginate_v2_1.default);
userSchema.methods.toJSON = function f() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
};
const userModel = mongoose_1.default.model('User', userSchema);
exports.userModel = userModel;
