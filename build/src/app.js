"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pino_1 = __importDefault(require("pino"));
const middlewares_1 = __importDefault(require("./middlewares/middlewares"));
require("express-async-errors");
const app = (0, express_1.default)();
const logger = (0, pino_1.default)();
(0, middlewares_1.default)(app);
;
let port = process.env.PORT;
// const cronJob = async () => {
//    try { cron.schedule('* * * * *', async () => {
//       const users = await userService.getAllUsers();
//     for (let i=0; i< users.length; i++) {
//       if ()
//     }
//     })
//   } catch (err){
//     console.log(err);
//   }
// }
app.listen(process.env.PORT, () => {
    if (port == undefined || port === '') {
        port = 8000;
    }
    logger.info(`Server is running on port ${port}`);
});
exports.default = logger;
