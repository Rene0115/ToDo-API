"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
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
const token2 = process.env.TOKEN_SECRET || '';
userSchema.methods.generateToken = function t() {
    const token = jsonwebtoken_1.default.sign({
        _id: this._id,
        email: this.email
    }, token2, { expiresIn: '30 mins' });
    return token;
};
const userModel = mongoose_1.default.model('User', userSchema);
exports.userModel = userModel;
