import express from 'express';
import pino from 'pino';
import middleware from './middlewares/middlewares';
import 'express-async-errors';
import cron from 'node-cron';
import userService from './services/user.service';

const app: express.Application = express();
const logger = pino();

middleware(app);

type iport = number | string | undefined;;

let port: iport = process.env.PORT;

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

export default logger;
