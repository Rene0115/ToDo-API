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
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
const lodash_1 = __importDefault(require("lodash"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailer_config_1 = require("../config/mailer.config");
const user_service_1 = __importDefault(require("../services/user.service"));
const user_model_1 = require("../models/user.model");
const secret = process.env.TOKEN_SECRET || '';
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                email: req.body.email.toLowerCase(),
                password: bcrypt_1.default.hashSync(req.body.password, 10),
                username: req.body.lastname
            };
            const user = yield user_service_1.default.findByEmail(data.email);
            if (!lodash_1.default.isEmpty(user)) {
                return res.status(400).send({
                    success: false,
                    message: 'User already exists'
                });
            }
            if (!(data.email || data.username || data.password)) {
                res.status(404).send({
                    success: false,
                    message: 'must supply email, password, firstname and lastname'
                });
            }
            const newUser = yield user_service_1.default.create(data);
            //@ts-ignore
            const verificationToken = newUser.generateToken();
            const url = `${process.env.APP_URL}/users/verify/${verificationToken}`;
            const response = {
                body: {
                    name: `${data.username}`,
                    intro: 'Email Verification Link',
                    action: {
                        instructions: 'If you did not request for this mail, Please Ignore it. To Verify your Email password, click on the link below:',
                        button: {
                            text: 'Verify Email',
                            link: url
                        }
                    },
                    outro: 'Do not share this link with anyone.'
                }
            };
            const mail = mailer_config_1.mailGenerator.generate(response);
            const message = {
                from: 'TO-DO <enere0115@gmail.com>',
                to: req.body.email,
                subject: 'Verify Your Email',
                html: mail
            };
            yield mailer_config_1.transporter.sendMail(message);
            return res.status(201).send({
                message: `Sent a verification email to ${req.body.email}`,
                data: newUser
            });
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.default.findByEmail(req.body.email);
            if (lodash_1.default.isEmpty(user)) {
                return res.status(404).send({
                    success: false,
                    message: 'user does not exist, create a user before attempting to login'
                });
            }
            const verifyPassword = bcrypt_1.default.compareSync(req.body.password, user.password);
            if (!verifyPassword) {
                return res.status(404).send({
                    success: false,
                    message: 'email or password is invalid'
                });
            }
            const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, secret, { expiresIn: '20h', algorithm: 'HS512' });
            return res.status(200).send({
                success: true,
                body: {
                    message: 'user logged in successfully',
                    token,
                    data: user
                }
            });
        });
    }
    paginated(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) && ((_b = req.query) === null || _b === void 0 ? void 0 : _b.size))) {
                const users = yield user_service_1.default.getAllUsers();
                if (!users) {
                    return res.status(400).send({
                        success: false,
                        message: 'no users exist in the database'
                    });
                }
            }
            const page = (_c = req.query) === null || _c === void 0 ? void 0 : _c.page;
            const size = (_d = req.query) === null || _d === void 0 ? void 0 : _d.size;
            const data = { page, size };
            const users = yield user_service_1.default.getUserByPage(data);
            if (!users) {
                return res.status(400).send({
                    success: false,
                    message: 'no users exist in the database'
                });
            }
            return res.status(200).send({
                success: true,
                data: users
            });
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            // Check we have an id
            if (!token) {
                return res.status(422).send({
                    message: 'Missing Token'
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            // @ts-ignore
            const user = yield user_model_1.userModel.findOne({ _id: decoded._id });
            if (!user) {
                return res.status(404).send({
                    message: 'User does not  exist'
                });
            }
            user.verified = true;
            yield user.save();
            return res.status(200).send({
                message: 'Account Verified'
            });
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newPassword } = req.body;
            const user = yield user_service_1.default.findByEmail(req.body.email);
            if (lodash_1.default.isEmpty(user)) {
                return res.status(404).send({
                    success: false,
                    message: 'user does not exist'
                });
            }
            if (user) {
                const hash = bcrypt_1.default.hashSync(newPassword, 10);
                yield user.updateOne({ password: hash });
            }
            const response = {
                body: {
                    name: `${user.username}`,
                    intro: 'Password Reset Successfully.',
                    outre: 'If you did not initiate this reset please contact our customer support.'
                }
            };
            const mail = mailer_config_1.mailGenerator.generate(response);
            const message = {
                from: 'TO DO LIST <enere0115@gmail.com>',
                to: user.email,
                subject: 'Password reset success',
                html: mail
            };
            yield mailer_config_1.transporter.sendMail(message);
            return res.status(201).send({
                message: `Password changed successfully. Confirmation email sent to  ${user.email}`
            });
        });
    }
}
exports.default = new UserController();
