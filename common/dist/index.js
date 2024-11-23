"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlukPostInputs = exports.updatePostInputs = exports.createPostInputs = exports.signinInputs = exports.signupInputs = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInputs = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional(),
});
exports.signinInputs = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.createPostInputs = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.updatePostInputs = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
    id: zod_1.default.string().uuid()
});
exports.getBlukPostInputs = zod_1.default.object({
    id: zod_1.default.string().uuid()
});
