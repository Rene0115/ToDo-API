"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const listSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        required: true,
        type: String
    },
    userId: {
        type: String
    }
}, { timestamps: true, versionKey: false });
listSchema.plugin(mongoose_paginate_v2_1.default);
const listModel = mongoose_1.default.model('List', listSchema);
exports.listModel = listModel;
